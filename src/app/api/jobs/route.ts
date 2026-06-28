import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const job = await db.jobOpening.findUnique({
        where: { id },
      });
      if (!job) {
        return NextResponse.json({ error: "Job not found" }, { status: 404 });
      }
      return NextResponse.json(job, { status: 200 });
    }

    const jobs = await db.jobOpening.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(jobs, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching job openings:", error);
    return NextResponse.json({ error: "Failed to fetch job openings." }, { status: 500 });
  }
}
