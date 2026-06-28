"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Briefcase, Calendar, CheckCircle2, MapPin, IndianRupee, Clock, Share2, Award } from "lucide-react";

interface JobOpening {
  id: string;
  title: string;
  dept: string;
  description: string;
  requirements: string;
  locationType: string;
  budget: string;
  experience: string;
  createdAt: string;
}

export default function JobDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [job, setJob] = React.useState<JobOpening | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!id) return;

    fetch(`/api/jobs?id=${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Job opening not found.");
        }
        return res.json();
      })
      .then((data) => {
        setJob(data);
      })
      .catch((err) => {
        setError(err.message || "Failed to load job details.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white text-text-primary">
        <Header />
        <main className="flex-grow flex items-center justify-center pt-32 pb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[40%] h-[70%] bg-gradient-to-bl from-brand-primary/5 to-transparent blur-[120px] pointer-events-none" />
          <div className="text-center py-8 text-gray-500 font-heading font-bold">
            Loading position details...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex flex-col min-h-screen bg-white text-text-primary">
        <Header />
        <main className="flex-grow flex items-center justify-center pt-32 pb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[40%] h-[70%] bg-gradient-to-bl from-brand-primary/5 to-transparent blur-[120px] pointer-events-none" />
          <Card className="w-full max-w-md p-8 border border-gray-200 bg-white/80 backdrop-blur-md shadow-xl rounded-3xl flex flex-col gap-5 text-center">
            <h3 className="text-xl font-heading font-extrabold text-brand-red">Position Not Found</h3>
            <Text size="sm" variant="muted">
              {error || "We couldn't find the job details you were looking for."}
            </Text>
            <Button variant="primary" size="md" href="/careers" className="bg-brand-primary border-brand-primary text-white font-bold rounded-lg mt-2">
              Back to Careers
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const requirementsList = job.requirements
    ? job.requirements.split("\n").filter((line) => line.trim() !== "")
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-white text-text-primary relative selection:bg-brand-primary selection:text-white">
      <Header />

      {/* Decorative Background Blobs */}
      <div className="absolute top-0 right-0 w-[45%] h-[60%] bg-gradient-to-bl from-brand-primary/5 via-brand-primary/2 to-transparent blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[35%] h-[50%] bg-gradient-to-tr from-brand-primary/4 to-transparent blur-[110px] pointer-events-none -z-10" />
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(135deg,rgba(109,36,229,0.15)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none -z-10" />

      <main className="flex-grow pt-32 pb-24 relative z-10">
        <Container size="2xl">
          {/* Back button */}
          <div className="mb-8 text-left">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 text-sm font-heading font-bold text-gray-500 hover:text-brand-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Open Positions
            </Link>
          </div>

          {/* Premium Header Hero Card */}
          <div className="w-full mb-10 text-left">
            <div className="relative overflow-hidden bg-gradient-to-br from-brand-primary/[0.03] to-brand-secondary/[0.01] border border-gray-100 rounded-3xl p-8 md:p-10 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-primary/10 to-transparent rounded-bl-full pointer-events-none" />
              
              <div className="flex flex-col gap-4">
                <div>
                  <span className="bg-brand-primary/10 text-brand-primary border border-brand-primary/20 px-3.5 py-1 rounded-full text-xs font-heading font-black uppercase tracking-wider">
                    {job.dept}
                  </span>
                </div>
                <Heading level={1} size="3xl" className="font-heading font-extrabold text-black tracking-tight leading-tight max-w-2xl">
                  {job.title}
                </Heading>
                
                {/* Meta Row */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-500 font-medium">
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-brand-primary" /> Full-time / Contract
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-primary" /> {job.locationType || "Remote"}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-primary" /> Posted {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Button
                  variant="primary"
                  size="lg"
                  href={`/apply?role=${encodeURIComponent(job.title)}`}
                  className="bg-brand-primary hover:bg-brand-secondary border-brand-primary text-white font-heading font-black uppercase tracking-wider rounded-xl shadow-md px-8 py-4"
                >
                  Apply For This Role
                </Button>
              </div>
            </div>
          </div>

          {/* Main Two-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            {/* Left Column: Role Details & Requirements */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              <div className="bg-white/80 backdrop-blur-md border border-gray-150 shadow-sm rounded-3xl p-8 md:p-10 flex flex-col gap-8">
                
                {/* Role Overview */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                    <div className="w-1.5 h-6 bg-brand-primary rounded-full" />
                    <h3 className="font-heading font-black text-xl text-black tracking-tight">
                      Role Overview
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap font-normal text-base md:text-lg">
                    {job.description}
                  </p>
                </div>

                {/* Key Requirements */}
                {requirementsList.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                      <div className="w-1.5 h-6 bg-brand-primary rounded-full" />
                      <h3 className="font-heading font-black text-xl text-black tracking-tight">
                        Key Requirements
                      </h3>
                    </div>
                    <ul className="flex flex-col gap-4">
                      {requirementsList.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-3.5 bg-brand-primary/[0.01] border border-gray-100/50 hover:border-brand-primary/10 rounded-xl p-4 transition-all hover:bg-white/50">
                          <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                          <span className="text-gray-700 font-medium text-sm md:text-base leading-relaxed">
                            {req}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Sticky Sidebar Card */}
            <div className="lg:col-span-4">
              <div className="bg-white/90 backdrop-blur-md border border-gray-150 shadow-md rounded-3xl p-8 flex flex-col gap-6 lg:sticky lg:top-32">
                <div className="flex flex-col gap-2 border-b border-gray-100 pb-4">
                  <Heading level={3} size="xl" className="text-black font-heading font-black tracking-tight">
                    Job Highlights
                  </Heading>
                  <Text size="sm" variant="muted">
                    Quick summary of this opportunity at Devosphere.
                  </Text>
                </div>

                {/* Highlight Stats */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-heading font-black text-gray-400 uppercase tracking-wider">Location</span>
                      <span className="text-sm font-bold text-gray-800">{job.locationType || "Remote"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-heading font-black text-gray-400 uppercase tracking-wider">Commitment</span>
                      <span className="text-sm font-bold text-gray-800">Full-time / Contract</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                      <IndianRupee className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-heading font-black text-gray-400 uppercase tracking-wider">Compensation</span>
                      <span className="text-sm font-bold text-gray-800">{job.budget || "Not Disclosed"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-heading font-black text-gray-400 uppercase tracking-wider">Experience</span>
                      <span className="text-sm font-bold text-gray-800">{job.experience || "Not Disclosed"}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-5 flex flex-col gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    href={`/apply?role=${encodeURIComponent(job.title)}`}
                    className="bg-brand-primary hover:bg-brand-secondary border-brand-primary text-white font-heading font-black uppercase tracking-wider py-3.5 w-full text-center rounded-xl shadow-sm"
                  >
                    Apply Now
                  </Button>
                  <span className="text-xs text-center text-gray-400 font-bold">
                    Takes less than 2 minutes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
