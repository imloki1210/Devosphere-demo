"use client";

import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

export default function ApplyPage() {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "Frontend",
    linkedin: "",
    github: "",
    resume: "",
    experience: "",
  });
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success">("idle");

  const [resumeFile, setResumeFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "Frontend",
        linkedin: "",
        github: "",
        resume: "",
        experience: "",
      });
      setResumeFile(null);
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-text-primary">
      <Header />
      
      <main className="flex-grow pt-32 pb-24">
        <Container size="xl">
          {/* Centered Heading Block */}
          <div className="max-w-3xl mx-auto text-center mb-12 flex flex-col gap-4">
            <span className="text-sm font-heading font-black tracking-wider text-brand-primary uppercase">
              Careers & Opportunities
            </span>
            <Heading level={1} size="4xl" className="font-heading font-extrabold text-black tracking-tight leading-tight">
              Apply to the Devosphere Network
            </Heading>
            <Text size="lg" className="text-gray-600 leading-relaxed font-normal max-w-2xl mx-auto">
              Join our elite pool of engineers. Complete the application below, and our team will get in touch for vetting and matching.
            </Text>
          </div>

          {/* Form Wrapper */}
          <div className="max-w-[700px] mx-auto bg-white p-2 md:p-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* First Name & Last Name (Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-heading font-bold text-gray-800">
                    First Name<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-white border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-md px-4 py-3 text-base text-black placeholder-gray-400 outline-none transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-heading font-bold text-gray-800">
                    Last Name<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-white border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-md px-4 py-3 text-base text-black placeholder-gray-400 outline-none transition-all duration-200"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-heading font-bold text-gray-800">
                    Email Address<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-md px-4 py-3 text-base text-black placeholder-gray-400 outline-none transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-heading font-bold text-gray-800">
                    Phone Number
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white focus-within:border-brand-primary focus-within:ring-1 focus-within:ring-brand-primary transition-all duration-200">
                    <div className="flex items-center gap-1.5 px-3 bg-gray-50 border-r border-gray-200 select-none">
                      <span className="text-lg">🇮🇳</span>
                      <span className="text-gray-500 text-sm font-medium">▼</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="+91"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white px-4 py-3 text-base text-black outline-none placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Primary Role / Stack */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-heading font-bold text-gray-800">
                  Primary Role / Expertise<span className="text-red-500 ml-0.5">*</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-white border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-md px-4 py-3 text-base text-black outline-none transition-all duration-200"
                >
                  <option value="Frontend">Frontend Engineer (React / Next.js)</option>
                  <option value="Backend">Backend Engineer (Node.js / Go)</option>
                  <option value="Fullstack">Fullstack Engineer</option>
                  <option value="DevOps">DevOps / Cloud Architect</option>
                  <option value="Mobile">Mobile Developer (React Native / Flutter)</option>
                  <option value="UIUX">UI/UX Designer</option>
                </select>
              </div>

              {/* LinkedIn & GitHub */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-heading font-bold text-gray-800">
                    LinkedIn Profile URL<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://linkedin.com/in/username"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full bg-white border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-md px-4 py-3 text-base text-black placeholder-gray-400 outline-none transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-heading font-bold text-gray-800">
                    GitHub / Portfolio URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full bg-white border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-md px-4 py-3 text-base text-black placeholder-gray-400 outline-none transition-all duration-200"
                  />
                </div>
              </div>

              {/* Resume/CV File Upload */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-heading font-bold text-gray-800">
                  Upload Resume / CV<span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  required
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 hover:border-brand-primary rounded-lg p-6 text-center cursor-pointer transition-all duration-200 bg-gray-50/50 hover:bg-brand-primary/[0.02] flex flex-col items-center justify-center gap-2 group"
                >
                  <svg
                    className="w-8 h-8 text-gray-400 group-hover:text-brand-primary transition-colors duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-gray-700">
                    {resumeFile ? resumeFile.name : "Upload your resume (PDF, DOC, DOCX)"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {resumeFile ? `${(resumeFile.size / 1024 / 1024).toFixed(2)} MB` : "Drag and drop or click to browse"}
                  </span>
                </div>
              </div>

              {/* Tell Us About Yourself */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-heading font-bold text-gray-800">
                  Briefly Describe Your Experience & Key Stack
                </label>
                <textarea
                  rows={4}
                  placeholder="What systems or products have you built? What technologies do you enjoy working with?"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full bg-white border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-md px-4 py-3 text-base text-black placeholder-gray-400 outline-none transition-all duration-200 resize-y min-h-[100px]"
                />
              </div>

              {/* Privacy Disclaimer */}
              <div className="text-xs text-gray-500 leading-relaxed font-normal">
                Devosphere handles candidate data in accordance with our recruitment procedures. For details on how we store and process candidate applications, please review our{" "}
                <Link href="/privacy-policy" className="text-brand-primary hover:underline font-semibold">
                  Privacy Policy
                </Link>.
              </div>

              {/* Submit Button */}
              <div className="mt-4">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={status === "submitting"}
                  className="bg-brand-primary hover:bg-brand-secondary border-brand-primary text-white font-extrabold uppercase tracking-wide px-8 py-4 rounded-md text-sm md:text-base min-w-[200px]"
                >
                  {status === "submitting" ? "Submitting..." : "Submit Application"}
                </Button>
              </div>

              {status === "success" && (
                <div className="text-sm font-semibold text-emerald-600 mt-2 text-center p-3 bg-emerald-50 border border-emerald-100 rounded-md">
                  Thank you! Your application has been successfully submitted. We will review it and get back to you shortly.
                </div>
              )}

            </form>
          </div>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
}
