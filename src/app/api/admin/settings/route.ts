import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const passcode = req.headers.get("x-admin-passcode") || searchParams.get("passcode");
    const superPasscode = process.env.SUPER_ADMIN_PASSCODE || "superadmin123";

    if (passcode !== superPasscode) {
      return NextResponse.json({ error: "Unauthorized. Super Admin access required." }, { status: 401 });
    }

    const body = await req.json();
    const { notificationEmail } = body;

    if (!notificationEmail || !notificationEmail.includes("@")) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const settings = await db.adminSettings.upsert({
      where: { id: "default" },
      update: { notificationEmail },
      create: { id: "default", notificationEmail },
    });

    return NextResponse.json(settings, { status: 200 });
  } catch (error: any) {
    console.error("Error updating admin settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
