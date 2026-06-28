import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { v2 as cloudinary } from "cloudinary";
import { db } from "@/lib/db";
import { promises as fs } from "fs";
import { sendEmailNotification } from "@/lib/mailer";
import path from "path";

// Configure Cloudinary conditionally
if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// In-memory store for rate limiting: IP -> timestamp[]
const ipCache = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_LIMIT = 5; // Max 5 applications per hour

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip") || "127.0.0.1";
    const now = Date.now();
    
    if (ip !== "127.0.0.1") {
      const timestamps = ipCache.get(ip) || [];
      // Filter out timestamps older than 1 hour
      const recentTimestamps = timestamps.filter((time) => now - time < RATE_LIMIT_WINDOW);
      
      if (recentTimestamps.length >= MAX_LIMIT) {
        return NextResponse.json(
          { error: "Too many applications submitted from this IP. Please try again later." },
          { status: 429 }
        );
      }
      
      recentTimestamps.push(now);
      ipCache.set(ip, recentTimestamps);
    }

    const formData = await req.formData();

    // 2. Honeypot check (Bots fill this invisible field, humans don't)
    const honeypot = formData.get("company_website") as string;
    if (honeypot) {
      console.log(`[SPAM BLOCKED] Bot detected from IP: ${ip}. Silently discarding.`);
      // Return 200 OK to fool the bot into thinking it succeeded
      return NextResponse.json(
        { message: "Application submitted successfully." },
        { status: 200 }
      );
    }

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const role = formData.get("role") as string;
    const resumeFile = formData.get("resume") as File;

    const linkedin = formData.get("linkedin") as string;
    const github = formData.get("github") as string;
    const experience = formData.get("experience") as string;

    // Basic server-side validation
    if (!firstName || !lastName || !email || !role || !resumeFile) {
      return NextResponse.json(
        { error: "Required fields (First Name, Last Name, Email, Role, Resume File) are missing." },
        { status: 400 }
      );
    }

    let resumeUrl = "";

    // 1. Try Cloudinary if keys are available (e.g. in Production)
    if (
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ) {
      try {
        const bytes = await resumeFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const uploadResult = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              resource_type: "raw", // Required for PDFs and raw documents
              public_id: `resumes/${Date.now()}-${resumeFile.name.replace(/\.[^/.]+$/, "").replace(/\s+/g, "-")}`,
              format: "pdf",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(buffer);
        });
        
        resumeUrl = uploadResult.secure_url;
      } catch (err) {
        console.warn("Cloudinary upload failed, trying fallback:", err);
      }
    }

    // 2. Try Vercel Blob if token is available
    if (!resumeUrl && process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blobFilename = `${Date.now()}-${resumeFile.name.replace(/\s+/g, "-")}`;
        const blob = await put(blobFilename, resumeFile, {
          access: "public",
        });
        resumeUrl = blob.url;
      } catch (err) {
        console.warn("Vercel Blob upload failed, trying fallback:", err);
      }
    }

    // 3. Fallback to local public/uploads directory for local development
    if (!resumeUrl) {
      const bytes = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      
      // Ensure the directory exists
      await fs.mkdir(uploadDir, { recursive: true });
      
      const blobFilename = `${Date.now()}-${resumeFile.name.replace(/\s+/g, "-")}`;
      const filePath = path.join(uploadDir, blobFilename);
      await fs.writeFile(filePath, buffer);
      
      resumeUrl = `/uploads/${blobFilename}`;
    }

    // Save job application details with resume URL and social profiles
    const jobApplication = await db.jobApplication.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        role,
        resumeUrl,
        linkedin: linkedin || null,
        github: github || null,
        experience: experience || null,
      },
    });

    // Send email notification with a beautiful HTML template
    const origin = req.headers.get("origin") || "http://localhost:3000";
    const shareUrl = `${origin}/careers/share/${jobApplication.id}`;
    const absoluteResumeUrl = resumeUrl.startsWith("http") ? resumeUrl : `${origin}${resumeUrl}`;

    const emailSubject = `💼 New Job Application: ${firstName} ${lastName} - ${role}`;
    const emailHtml = `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eef2f6; border-radius: 24px; background-color: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.02);">
        <div style="text-align: center; margin-bottom: 25px;">
          <span style="background-color: #10b981; color: #ffffff; padding: 6px 16px; border-radius: 50px; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">New Applicant</span>
          <h2 style="color: #1e1b4b; margin: 15px 0 5px 0; font-size: 22px; font-weight: 800;">Job Application Submitted</h2>
          <p style="color: #64748b; margin: 0; font-size: 14px;">A candidate has applied for the <strong>${role}</strong> opening.</p>
        </div>
        
        <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 16px; padding: 20px; margin-bottom: 25px;">
          <h3 style="margin-top: 0; color: #0f172a; font-size: 14px; font-weight: 700; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;">Candidate Profile</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: 500; width: 30%;">Name:</td>
              <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Email:</td>
              <td style="padding: 6px 0; color: #0f172a; font-weight: 700;"><a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Phone:</td>
              <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${phone}</td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Role:</td>
              <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${role}</td>
            </tr>
            ${experience ? `
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Experience:</td>
              <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${experience}</td>
            </tr>
            ` : ""}
          </table>
        </div>

        <div style="margin-bottom: 25px; display: flex; gap: 10px; justify-content: center;">
          <a href="${shareUrl}" style="background-color: #6366f1; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 12px; font-size: 14px; font-weight: 700; display: inline-block; text-align: center; margin-right: 10px;">
            View Candidate Profile
          </a>
          <a href="${absoluteResumeUrl}" target="_blank" style="background-color: #f1f5f9; color: #334155; text-decoration: none; padding: 12px 20px; border-radius: 12px; font-size: 14px; font-weight: 700; display: inline-block; text-align: center; border: 1px solid #e2e8f0;">
            Download Resume
          </a>
        </div>

        ${(linkedin || github) ? `
        <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 16px; padding: 15px 20px; margin-bottom: 25px;">
          <h3 style="margin-top: 0; color: #0f172a; font-size: 13px; font-weight: 700; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Social Profiles</h3>
          <div style="font-size: 13px; color: #475569;">
            ${linkedin ? `<p style="margin: 4px 0;"><strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank" style="color: #6366f1; text-decoration: none;">${linkedin}</a></p>` : ""}
            ${github ? `<p style="margin: 4px 0;"><strong>GitHub:</strong> <a href="${github}" target="_blank" style="color: #6366f1; text-decoration: none;">${github}</a></p>` : ""}
          </div>
        </div>
        ` : ""}

        <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 25px 0;" />
        <div style="text-align: center;">
          <p style="font-size: 11px; color: #94a3b8; margin: 0;">This email was sent automatically by the Devosphere recruitment system.</p>
        </div>
      </div>
    `;

    // Fire email asynchronously
    sendEmailNotification(emailSubject, emailHtml).catch((err) => {
      console.error("Failed to trigger email notification for job application:", err);
    });

    return NextResponse.json(
      { message: "Application submitted successfully.", id: jobApplication.id, url: resumeUrl },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in job application submission API:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}
