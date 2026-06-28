"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/toast";
import Link from "next/link";
import { Users, Award, Code, Rocket, Mail, Phone, FileText, ArrowLeft, UploadCloud } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { COUNTRIES } from "@/lib/countries";

export default function ApplyPage() {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "Frontend Engineer (React / Next.js)",
    linkedin: "",
    github: "",
    resume: "",
    experience: "",
  });
  const [phoneInput, setPhoneInput] = React.useState("");
  const [selectedCountry, setSelectedCountry] = React.useState(COUNTRIES[0]);
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success">("idle");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [honeypot, setHoneypot] = React.useState("");

  const router = useRouter();

  // Dynamic Openings state
  interface JobItem {
    id: string;
    title: string;
  }
  const [openings, setOpenings] = React.useState<JobItem[]>([]);

  React.useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOpenings(data);
          
          // Check query parameters for role pre-selection
          if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const roleParam = params.get("role");
            if (roleParam) {
              setFormData((prev) => ({ ...prev, role: roleParam }));
            } else if (data.length > 0) {
              setFormData((prev) => ({ ...prev, role: data[0].title }));
            }
          }
        }
      })
      .catch(() => {
        // Fallback or ignore
      });
  }, []);

  const [resumeFile, setResumeFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      setErrorMsg("Please upload your resume.");
      return;
    }

    setStatus("submitting");
    setErrorMsg(null);

    try {
      const finalPhone = phoneInput.trim() ? `${selectedCountry.code} ${phoneInput.trim()}` : "";
      const data = new FormData();
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("email", formData.email);
      data.append("phone", finalPhone);
      data.append("role", formData.role);
      data.append("resume", resumeFile);
      data.append("linkedin", formData.linkedin);
      data.append("github", formData.github);
      data.append("experience", formData.experience);
      data.append("company_website", honeypot);

      const res = await fetch("/api/apply", {
        method: "POST",
        body: data,
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.error || "Failed to submit application. Please try again.");
      }

      setStatus("success");
      showToast("Application submitted successfully! Redirecting...");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        linkedin: "",
        github: "",
        resume: "",
        experience: "",
      });
      setPhoneInput("");
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
      // Redirect to careers page after brief delay
      setTimeout(() => {
        router.push("/careers");
      }, 2000);
    } catch (err: any) {
      setStatus("idle");
      setErrorMsg(err.message || "Failed to submit application.");
      showToast(err.message || "Failed to submit application.", "error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-text-primary relative overflow-hidden selection:bg-brand-primary selection:text-white">
      <Header />
      
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 right-0 w-[45%] h-[60%] bg-gradient-to-bl from-brand-primary/5 via-brand-primary/2 to-transparent blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[35%] h-[50%] bg-gradient-to-tr from-brand-primary/4 to-transparent blur-[110px] pointer-events-none -z-10" />
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(135deg,rgba(109,36,229,0.15)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none -z-10" />

      <main className="flex-grow pt-32 pb-24 relative z-10">
        <Container size="xl">
          {/* Back button */}
          <div className="max-w-3xl mx-auto mb-6 text-left">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 text-sm font-heading font-bold text-gray-500 hover:text-brand-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Careers
            </Link>
          </div>

          {/* Centered Heading Block */}
          <div className="max-w-3xl mx-auto text-center mb-10 flex flex-col gap-3">
            <span className="text-xs font-heading font-black tracking-wider text-brand-primary bg-brand-primary/10 px-3.5 py-1.5 rounded-full inline-block mx-auto uppercase">
              Careers & Opportunities
            </span>
            <Heading level={1} size="3xl" className="font-heading font-extrabold text-black tracking-tight leading-tight">
              Apply to the Devosphere Network
            </Heading>
            <Text size="base" className="text-gray-500 leading-relaxed font-normal max-w-xl mx-auto">
              Join our elite pool of engineers. Complete the application below, and our team will get in touch for vetting and matching.
            </Text>
          </div>

          {/* Form Wrapper (Glassmorphism Card) */}
          <div className="max-w-3xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-md border border-gray-150 shadow-xl rounded-3xl p-8 md:p-12">
              <form onSubmit={handleSubmit} className="flex flex-col gap-8 text-left">
                {/* Honeypot field for spam prevention */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="company_website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                
                {/* First Name & Last Name (Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-heading font-bold text-gray-800">
                      First Name<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-white border border-gray-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl px-4 py-3.5 text-base text-black placeholder-gray-400 outline-none transition-all duration-200 shadow-sm"
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
                      className="w-full bg-white border border-gray-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl px-4 py-3.5 text-base text-black placeholder-gray-400 outline-none transition-all duration-200 shadow-sm"
                    />
                  </div>
                </div>

                {/* Email Address */}
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
                    className="w-full bg-white border border-gray-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl px-4 py-3.5 text-base text-black placeholder-gray-400 outline-none transition-all duration-200 shadow-sm"
                  />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-heading font-bold text-gray-800">
                    Phone Number
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white focus-within:border-brand-primary focus-within:ring-1 focus-within:ring-brand-primary transition-all duration-200 shadow-sm">
                    <div className="relative flex items-center gap-1.5 px-3 py-3.5 bg-gray-50 border-r border-gray-200 select-none cursor-pointer">
                      <span className="text-lg leading-none">{selectedCountry.flag}</span>
                      <span className="text-gray-600 text-sm font-semibold">{selectedCountry.code}</span>
                      <span className="text-gray-400 text-xs">▼</span>
                      <select
                        value={selectedCountry.code}
                        onChange={(e) => {
                          const country = COUNTRIES.find((c) => c.code === e.target.value);
                          if (country) setSelectedCountry(country);
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      >
                        {COUNTRIES.map((c, idx) => (
                          <option key={idx} value={c.code}>
                            {c.flag} {c.name} ({c.code})
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      className="w-full bg-white px-4 py-3.5 text-base text-black outline-none placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Role & Experience */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Role You're Applying For */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-heading font-bold text-gray-800">
                      Role You're Applying For
                    </label>
                    <input
                      type="text"
                      disabled
                      value={formData.role || "General Application"}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base text-gray-500 font-medium outline-none cursor-not-allowed shadow-sm"
                    />
                  </div>

                  {/* Years of Experience */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-heading font-bold text-gray-800">
                      Years of Experience<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 3 Years, 5+ Years"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full bg-white border border-gray-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl px-4 py-3.5 text-base text-black placeholder-gray-400 outline-none transition-all duration-200 shadow-sm"
                    />
                  </div>
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
                      className="w-full bg-white border border-gray-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl px-4 py-3 text-base text-black placeholder-gray-400 outline-none transition-all duration-200 shadow-sm"
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
                      className="w-full bg-white border border-gray-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl px-4 py-3 text-base text-black placeholder-gray-400 outline-none transition-all duration-200 shadow-sm"
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
                    className="border-2 border-dashed border-gray-200 hover:border-brand-primary rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 bg-gray-50/50 hover:bg-brand-primary/[0.02] flex flex-col items-center justify-center gap-3 group shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary/10 transition-colors duration-200">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-gray-700">
                        {resumeFile ? resumeFile.name : "Upload your resume (PDF, DOC, DOCX)"}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">
                        {resumeFile ? `${(resumeFile.size / 1024 / 1024).toFixed(2)} MB` : "Drag and drop or click to browse"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Privacy Disclaimer */}
                <div className="text-xs text-gray-400 leading-relaxed font-medium pt-2">
                  Devosphere handles candidate data in accordance with our recruitment procedures. For details on how we store and process candidate applications, please review our{" "}
                  <Link href="/privacy-policy" className="text-brand-primary hover:underline font-bold">
                    Privacy Policy
                  </Link>.
                </div>

                {/* Submit Button */}
                <div className="mt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={status === "submitting"}
                    className="bg-brand-primary hover:bg-brand-secondary border-brand-primary text-white font-heading font-black uppercase tracking-wider py-4 w-full text-center rounded-xl shadow-md transition-all duration-200"
                  >
                    {status === "submitting" ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>

              </form>
            </Card>
          </div>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
}
