import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const superAdminPasscode = process.env.SUPER_ADMIN_PASSCODE || "superadmin123";

function checkAuth(req: Request) {
  const { searchParams } = new URL(req.url);
  const passcode = req.headers.get("x-admin-passcode") || searchParams.get("passcode");
  return passcode === superAdminPasscode;
}

export async function DELETE(req: Request) {
  try {
    if (!checkAuth(req)) {
      return NextResponse.json({ error: "Unauthorized. Super Admin access required." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const idsString = searchParams.get("ids");

    if (!idsString) {
      return NextResponse.json({ error: "Missing candidate IDs." }, { status: 400 });
    }

    const ids = idsString.split(",").filter(Boolean);

    await db.jobApplication.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return NextResponse.json({ message: "Candidates deleted successfully." }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting candidates:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
