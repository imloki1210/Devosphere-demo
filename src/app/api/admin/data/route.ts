import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const passcode = req.headers.get("x-admin-passcode") || searchParams.get("passcode");

    const hrPasscode = process.env.ADMIN_PASSCODE || "admin123";
    const superPasscode = process.env.SUPER_ADMIN_PASSCODE || "superadmin123";

    let role: "hr" | "super_admin" | null = null;
    if (passcode === superPasscode) {
      role = "super_admin";
    } else if (passcode === hrPasscode) {
      role = "hr";
    }

    if (!role) {
      return NextResponse.json({ error: "Unauthorized. Invalid passcode." }, { status: 401 });
    }

    // Fetch common data
    const candidates = await db.jobApplication.findMany({
      orderBy: { createdAt: "desc" },
    });

    const jobs = await db.jobOpening.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (role === "super_admin") {
      const leads = await db.contactRequest.findMany({
        orderBy: { createdAt: "desc" },
      });

      // Ensure default settings exist
      let settings = await db.adminSettings.findUnique({
        where: { id: "default" },
      });

      if (!settings) {
        settings = await db.adminSettings.create({
          data: {
            id: "default",
            notificationEmail: process.env.NOTIFICATION_EMAIL || "admin@devosphere.com",
          },
        });
      }

      return NextResponse.json({ role, candidates, jobs, leads, settings }, { status: 200 });
    }

    // For HR, do not return leads or settings
    return NextResponse.json({ role, candidates, jobs, leads: [] }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching admin data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
