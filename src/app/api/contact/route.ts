import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendEmailNotification } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, project } = body;

    // Basic server-side validation
    if (!firstName || !lastName || !email || !project) {
      return NextResponse.json(
        { error: "Required fields (First Name, Last Name, Email, Project) are missing." },
        { status: 400 }
      );
    }

    const contactRequest = await db.contactRequest.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        project,
      },
    });

    // Send email notification with a beautiful HTML template
    const emailSubject = `🚨 New Client Lead: ${firstName} ${lastName}`;
    const emailHtml = `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eef2f6; border-radius: 24px; background-color: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.02);">
        <div style="text-align: center; margin-bottom: 25px;">
          <span style="background-color: #6366f1; color: #ffffff; padding: 6px 16px; border-radius: 50px; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">New Inquiry</span>
          <h2 style="color: #1e1b4b; margin: 15px 0 5px 0; font-size: 22px; font-weight: 800;">Project Inquiry Received</h2>
          <p style="color: #64748b; margin: 0; font-size: 14px;">A prospective client has submitted project details via the contact form.</p>
        </div>
        
        <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 16px; padding: 20px; margin-bottom: 25px;">
          <h3 style="margin-top: 0; color: #0f172a; font-size: 14px; font-weight: 700; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;">Client Information</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: 500; width: 30%;">Name:</td>
              <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Email:</td>
              <td style="padding: 6px 0; color: #6366f1; font-weight: 700;"><a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Phone:</td>
              <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${phone}</td>
            </tr>
            ` : ""}
          </table>
        </div>

        <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; border-left: 4px solid #6366f1; margin-bottom: 25px;">
          <h3 style="margin-top: 0; color: #0f172a; font-size: 14px; font-weight: 700; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;">Project Brief</h3>
          <p style="color: #334155; line-height: 1.6; font-size: 14px; margin: 0; white-space: pre-wrap;">${project}</p>
        </div>

        <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 25px 0;" />
        <div style="text-align: center;">
          <p style="font-size: 11px; color: #94a3b8; margin: 0;">This email was sent automatically by the Devosphere admin system.</p>
        </div>
      </div>
    `;

    // Fire email asynchronously so we don't delay the API response
    sendEmailNotification(emailSubject, emailHtml).catch((err) => {
      console.error("Failed to trigger email notification for contact request:", err);
    });

    return NextResponse.json(
      { message: "Contact request submitted successfully.", id: contactRequest.id },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in contact form submission API:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}
