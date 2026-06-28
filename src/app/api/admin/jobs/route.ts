import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const hrPasscode = process.env.ADMIN_PASSCODE || "admin123";
const superAdminPasscode = process.env.SUPER_ADMIN_PASSCODE || "superadmin123";

function checkAuth(req: Request) {
  const { searchParams } = new URL(req.url);
  const passcode = req.headers.get("x-admin-passcode") || searchParams.get("passcode");
  return passcode === hrPasscode || passcode === superAdminPasscode;
}

export async function POST(req: Request) {
  try {
    if (!checkAuth(req)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { title, dept, description, requirements, locationType, budget, experience } = await req.json();
    if (!title || !dept) {
      return NextResponse.json({ error: "Required fields (title, dept) missing." }, { status: 400 });
    }

    const job = await db.jobOpening.create({
      data: { 
        title, 
        dept,
        description: description || "",
        requirements: requirements || "",
        locationType: locationType || "Remote",
        budget: budget || "",
        experience: experience || "",
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error: any) {
    console.error("Error creating job opening:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    if (!checkAuth(req)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing parameter: id" }, { status: 400 });
    }

    await db.jobOpening.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Job opening deleted successfully." }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting job opening:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
export async function GET(req: Request) {
  try {
    if (!checkAuth(req)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const jobs = await db.jobOpening.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(jobs, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching admin jobs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
