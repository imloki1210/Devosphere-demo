"use client";

import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

import { COUNTRIES } from "@/lib/countries";

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    project: "",
  });
  const [phoneInput, setPhoneInput] = React.useState("");
  const [selectedCountry, setSelectedCountry] = React.useState(COUNTRIES[0]);
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success">("idle");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    try {
      const finalPhone = phoneInput.trim() ? `${selectedCountry.code} ${phoneInput.trim()}` : "";
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: finalPhone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        project: "",
      });
      setPhoneInput("");
    } catch (err: any) {
      setStatus("idle");
      setErrorMsg(err.message || "Failed to submit. Please check your connection.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-text-primary">
      <Header />
      
      <main className="flex-grow pt-32 pb-24">
        <Container size="xl">
          {/* Centered Heading Block */}
          <div className="max-w-3xl mx-auto text-center mb-12 flex flex-col gap-4">
            <Heading level={1} size="4xl" className="font-heading font-extrabold text-black tracking-tight leading-tight">
              Let's Build Your Dream Engineering Team
            </Heading>
            <Text size="lg" className="text-gray-600 leading-relaxed font-normal max-w-2xl mx-auto">
              Request a meeting and check your inbox to browse a selection of our elite developer profiles right away.
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

              {/* Work Email */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-heading font-bold text-gray-800">
                  Work Email<span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="Work Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-md px-4 py-3 text-base text-black placeholder-gray-400 outline-none transition-all duration-200"
                />
              </div>

              {/* Phone Number with country dropdown mock */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-heading font-bold text-gray-800">
                  Phone Number
                </label>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white focus-within:border-brand-primary focus-within:ring-1 focus-within:ring-brand-primary transition-all duration-200">
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
                    className="w-full bg-white px-4 py-3 text-base text-black outline-none placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Project Brief */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-heading font-bold text-gray-800">
                  Tell Us About Your Project<span className="text-red-500 ml-0.5">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="What skills do you need? How many engineers are you looking to hire?"
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full bg-white border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-md px-4 py-3 text-base text-black placeholder-gray-400 outline-none transition-all duration-200 resize-y min-h-[100px]"
                />
              </div>

              {/* Privacy Disclaimer */}
              <div className="text-xs text-gray-500 leading-relaxed font-normal">
                Devosphere may use your contact information to share updates about our services. You may unsubscribe at any time. For more information, please review our{" "}
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
                  {status === "submitting" ? "Requesting..." : "Request a Meeting"}
                </Button>
              </div>

              {status === "success" && (
                <div className="text-sm font-semibold text-emerald-600 mt-2 text-center p-3 bg-emerald-50 border border-emerald-100 rounded-md">
                  Thank you! Your request has been successfully submitted. We will contact you shortly.
                </div>
              )}

              {errorMsg && (
                <div className="text-sm font-semibold text-red-600 mt-2 text-center p-3 bg-red-50 border border-red-100 rounded-md">
                  {errorMsg}
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
