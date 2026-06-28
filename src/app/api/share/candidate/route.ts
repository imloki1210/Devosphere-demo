import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing candidate ID" }, { status: 400 });
    }

    const candidate = await db.jobApplication.findUnique({
      where: { id },
    });

    if (!candidate) {
      return NextResponse.json({ error: "Candidate profile not found" }, { status: 404 });
    }

    return NextResponse.json(candidate, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching candidate profile for sharing:", error);
    return NextResponse.json({ error: "Failed to fetch candidate details." }, { status: 500 });
  }
}
