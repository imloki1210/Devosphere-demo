"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Calendar, 
  FileText, 
  Download,
  ExternalLink,
  Printer
} from "lucide-react";

interface CandidateProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  role: string;
  resumeUrl: string;
  linkedin: string | null;
  github: string | null;
  experience: string | null;
  createdAt: string;
}

export default function CandidateSharePage() {
  const params = useParams();
  const id = params.id as string;

  const [candidate, setCandidate] = React.useState<CandidateProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!id) return;

    fetch(`/api/share/candidate?id=${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Candidate profile not found.");
        }
        return res.json();
      })
      .then((data) => {
        setCandidate(data);
      })
      .catch((err) => {
        setError(err.message || "Failed to load candidate details.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white text-text-primary">
        <Header />
        <main className="flex-grow flex items-center justify-center pt-32 pb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[40%] h-[70%] bg-gradient-to-bl from-brand-primary/5 to-transparent blur-[120px] pointer-events-none" />
          <div className="text-center py-8 text-gray-500 font-heading font-bold">
            Loading candidate profile...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !candidate) {
    return (
      <div className="flex flex-col min-h-screen bg-white text-text-primary">
        <Header />
        <main className="flex-grow flex items-center justify-center pt-32 pb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[40%] h-[70%] bg-gradient-to-bl from-brand-primary/5 to-transparent blur-[120px] pointer-events-none" />
          <Card className="w-full max-w-md p-8 border border-gray-200 bg-white/80 backdrop-blur-md shadow-xl rounded-3xl flex flex-col gap-5 text-center">
            <h3 className="text-xl font-heading font-extrabold text-brand-red">Profile Not Found</h3>
            <Text size="sm" variant="muted">
              {error || "The shared candidate profile could not be found or has expired."}
            </Text>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const fullName = `${candidate.firstName} ${candidate.lastName}`;

  return (
    <div className="flex flex-col min-h-screen bg-white text-text-primary relative selection:bg-brand-primary selection:text-white print:bg-white print:pt-0">
      {/* Hide Header on print */}
      <div className="print:hidden">
        <Header />
      </div>

      {/* Decorative Background Blobs */}
      <div className="absolute top-0 right-0 w-[45%] h-[60%] bg-gradient-to-bl from-brand-primary/5 via-brand-primary/2 to-transparent blur-[130px] pointer-events-none -z-10 print:hidden" />
      <div className="absolute bottom-0 left-0 w-[35%] h-[50%] bg-gradient-to-tr from-brand-primary/4 to-transparent blur-[110px] pointer-events-none -z-10 print:hidden" />

      <main className="flex-grow pt-32 pb-24 relative z-10 print:pt-4 print:pb-4">
        <Container size="2xl">
          {/* Action buttons (hidden on print) */}
          <div className="mb-6 flex justify-between items-center print:hidden">
            <span className="text-xs font-heading font-black uppercase tracking-wider text-brand-primary bg-brand-primary/10 px-3.5 py-1.5 rounded-full">
              Shared Candidate Profile
            </span>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 text-sm font-heading font-bold text-gray-500 hover:text-brand-primary transition-colors bg-gray-100 hover:bg-brand-primary/10 px-4 py-2 rounded-xl"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
          </div>

          {/* Main Candidate Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            
            {/* Left Info Column */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white border border-gray-150 shadow-md rounded-3xl p-8 flex flex-col gap-6 print:border-none print:shadow-none print:p-0">
                
                {/* Header Profile */}
                <div className="flex flex-col items-center text-center gap-4 pb-6 border-b border-gray-100 print:items-start print:text-left print:pb-4">
                  <div className="w-20 h-20 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shadow-sm print:hidden">
                    <User className="w-10 h-10" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h2 className="text-2xl font-heading font-black text-black tracking-tight">{fullName}</h2>
                    <span className="bg-brand-primary/10 text-brand-primary border border-brand-primary/20 px-3.5 py-1 rounded-full text-xs font-heading font-black uppercase tracking-wider inline-block mx-auto print:mx-0">
                      {candidate.role}
                    </span>
                  </div>
                </div>

                {/* Contact details */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-heading font-black text-gray-400 uppercase tracking-wider">Contact Details</h3>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                      <Mail className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-heading font-black text-gray-400 uppercase tracking-wider">Email</span>
                      <a href={`mailto:${candidate.email}`} className="text-sm font-bold text-gray-800 hover:text-brand-primary transition-colors truncate">
                        {candidate.email}
                      </a>
                    </div>
                  </div>

                  {candidate.phone && (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                        <Phone className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-heading font-black text-gray-400 uppercase tracking-wider">Phone</span>
                        <a href={`tel:${candidate.phone}`} className="text-sm font-bold text-gray-800 hover:text-brand-primary transition-colors">
                          {candidate.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                      <Calendar className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-heading font-black text-gray-400 uppercase tracking-wider">Applied Date</span>
                      <span className="text-sm font-bold text-gray-800">
                        {new Date(candidate.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        })}
                      </span>
                    </div>
                  </div>

                  {candidate.experience && (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                        <Briefcase className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-heading font-black text-gray-400 uppercase tracking-wider">Experience</span>
                        <span className="text-sm font-bold text-gray-800">
                          {candidate.experience}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Social Profiles */}
                {(candidate.linkedin || candidate.github) && (
                  <div className="flex flex-col gap-4 border-t border-gray-100 pt-5 print:pt-4">
                    <h3 className="text-xs font-heading font-black text-gray-400 uppercase tracking-wider">Social Links</h3>
                    <div className="flex flex-col gap-3">
                      {candidate.linkedin && (
                        <a
                          href={candidate.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-xl bg-blue-50/50 border border-blue-100 hover:bg-blue-50 transition-all text-blue-700 font-bold text-sm"
                        >
                          <span className="flex items-center gap-2">
                            <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            LinkedIn
                          </span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}

                      {candidate.github && (
                        <a
                          href={candidate.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-150 hover:bg-gray-100 transition-all text-gray-800 font-bold text-sm"
                        >
                          <span className="flex items-center gap-2">
                            <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            GitHub / Portfolio
                          </span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Right Resume Column */}
            <div className="lg:col-span-8 flex flex-col gap-6 print:w-full">
              <div className="bg-white border border-gray-150 shadow-md rounded-3xl p-6 md:p-8 flex flex-col gap-6 h-full print:border-none print:shadow-none print:p-0">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-brand-primary" />
                    <h3 className="font-heading font-black text-lg text-black">Candidate Resume</h3>
                  </div>
                  <a
                    href={candidate.resumeUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-heading font-bold text-brand-primary hover:text-brand-secondary transition-colors"
                  >
                    <Download className="w-4.5 h-4.5" />
                    Download File
                  </a>
                </div>

                {/* Embedded PDF Preview */}
                <div className="flex-grow min-h-[550px] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 relative print:min-h-0 print:border-none">
                  {candidate.resumeUrl.toLowerCase().endsWith(".pdf") || candidate.resumeUrl.includes("/uploads/") ? (
                    <iframe
                      src={`${candidate.resumeUrl}#toolbar=0`}
                      className="w-full h-full min-h-[550px] border-none print:hidden"
                      title={`${fullName} Resume`}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center gap-4">
                      <FileText className="w-16 h-16 text-gray-300" />
                      <div className="flex flex-col gap-1.5">
                        <span className="text-base font-bold text-gray-800">Preview Not Available</span>
                        <span className="text-sm text-gray-500">This file format cannot be previewed directly in the browser.</span>
                      </div>
                      <Button
                        variant="primary"
                        size="md"
                        href={candidate.resumeUrl}
                        className="bg-brand-primary border-brand-primary text-white font-bold rounded-lg mt-2"
                      >
                        Download Resume
                      </Button>
                    </div>
                  )}
                  {/* Print Version of Resume Link */}
                  <div className="hidden print:block text-sm text-gray-600 mt-2">
                    Resume file is available at: <span className="font-mono text-xs">{candidate.resumeUrl}</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </Container>
      </main>

      {/* Hide Footer on print */}
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
