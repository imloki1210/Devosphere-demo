"use client";

import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Mail, Phone, Calendar, Briefcase, FileText, Lock, Plus, Trash2, Tag, Share2, ChevronDown, Download } from "lucide-react";
import { showToast } from "@/lib/toast";

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  role: string;
  resumeUrl: string;
  createdAt: string;
}

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  project: string;
  createdAt: string;
}

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

export default function AdminPage() {
  const [passcode, setPasscode] = React.useState("");
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loginError, setLoginError] = React.useState<string | null>(null);

  const [activeTab, setActiveTab] = React.useState<"candidates" | "leads" | "openings">("candidates");
  const [candidates, setCandidates] = React.useState<Candidate[]>([]);
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [jobs, setJobs] = React.useState<JobOpening[]>([]);
  const [adminRole, setAdminRole] = React.useState<"hr" | "super_admin" | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [selectedCandidates, setSelectedCandidates] = React.useState<string[]>([]);
  const [selectedLeads, setSelectedLeads] = React.useState<string[]>([]);

  // Add Job Form State
  const [newJobTitle, setNewJobTitle] = React.useState("");
  const [newJobDept, setNewJobDept] = React.useState("");
  const [newJobDescription, setNewJobDescription] = React.useState("");
  const [newJobRequirements, setNewJobRequirements] = React.useState("");
  const [newJobLocationType, setNewJobLocationType] = React.useState("Remote");
  const [newJobBudget, setNewJobBudget] = React.useState("");
  const [newJobExperience, setNewJobExperience] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmittingJob, setIsSubmittingJob] = React.useState(false);
  const [actionError, setActionError] = React.useState<string | null>(null);
  const [candidateFilter, setCandidateFilter] = React.useState<string | null>(null);

  const handleShareProfile = (candidateId: string) => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}/careers/share/${candidateId}`;
      navigator.clipboard.writeText(shareUrl);
      showToast("Candidate share link copied!");
    }
  };

  const handleShareJob = (jobId: string) => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}/careers/${jobId}`;
      navigator.clipboard.writeText(shareUrl);
      showToast("Job details link copied!");
    }
  };

  React.useEffect(() => {
    // Check localStorage for existing passcode
    const savedPasscode = localStorage.getItem("devosphere_admin_passcode");
    if (savedPasscode) {
      verifyAndLoad(savedPasscode);
    }
  }, []);

  const verifyAndLoad = async (code: string) => {
    setIsLoading(true);
    setLoginError(null);
    try {
      const res = await fetch(`/api/admin/data?passcode=${encodeURIComponent(code)}`, {
        headers: {
          "x-admin-passcode": code,
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Authentication failed.");
      }

      const data = await res.json();
      setCandidates(data.candidates || []);
      setLeads(data.leads || []);
      setJobs(data.jobs || []);
      setAdminRole(data.role);
      setIsAuthenticated(true);
      localStorage.setItem("devosphere_admin_passcode", code);
      setLoginError(null);
    } catch (err: any) {
      setLoginError(err.message || "Invalid passcode.");
      localStorage.removeItem("devosphere_admin_passcode");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    verifyAndLoad(passcode);
  };

  const handleLogout = () => {
    localStorage.removeItem("devosphere_admin_passcode");
    setIsAuthenticated(false);
    setPasscode("");
    setCandidates([]);
    setLeads([]);
    setJobs([]);
    setAdminRole(null);
  };


  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle.trim()) return;

    setIsSubmittingJob(true);
    setActionError(null);

    const savedPasscode = localStorage.getItem("devosphere_admin_passcode") || passcode;

    try {
      const res = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": savedPasscode,
        },
        body: JSON.stringify({
          title: newJobTitle,
          dept: newJobDept,
          description: newJobDescription,
          requirements: newJobRequirements,
          locationType: newJobLocationType,
          budget: newJobBudget,
          experience: newJobExperience,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create job opening.");
      }

      setJobs([data, ...jobs]);
      setNewJobTitle("");
      setNewJobDept("");
      setNewJobDescription("");
      setNewJobRequirements("");
      setNewJobLocationType("Remote");
      setNewJobBudget("");
      setNewJobExperience("");
      setIsCreateModalOpen(false);
      showToast("Job opening created successfully!");
    } catch (err: any) {
      setActionError(err.message);
      showToast(err.message, "error");
    } finally {
      setIsSubmittingJob(false);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job opening?")) return;

    setActionError(null);
    const savedPasscode = localStorage.getItem("devosphere_admin_passcode") || passcode;

    try {
      const res = await fetch(`/api/admin/jobs?id=${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-passcode": savedPasscode,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete job opening.");
      }

      setJobs(jobs.filter((j) => j.id !== id));
      showToast("Job opening deleted successfully!");
    } catch (err: any) {
      setActionError(err.message);
      showToast(err.message, "error");
    }
  };

  const handleDeleteCandidates = async (ids: string[]) => {
    if (ids.length === 0) return;
    const confirmMsg = ids.length === 1
      ? "Are you sure you want to delete this candidate application?"
      : `Are you sure you want to delete these ${ids.length} candidate applications?`;
    if (!window.confirm(confirmMsg)) return;

    setActionError(null);
    const savedPasscode = localStorage.getItem("devosphere_admin_passcode") || passcode;

    try {
      const res = await fetch(`/api/admin/candidates?ids=${ids.join(",")}`, {
        method: "DELETE",
        headers: {
          "x-admin-passcode": savedPasscode,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete candidates.");
      }

      setCandidates(candidates.filter((c) => !ids.includes(c.id)));
      setSelectedCandidates([]);
      showToast(ids.length === 1 ? "Candidate deleted!" : `${ids.length} candidates deleted!`);
    } catch (err: any) {
      setActionError(err.message);
      showToast(err.message, "error");
    }
  };

  const handleDeleteLeads = async (ids: string[]) => {
    if (ids.length === 0) return;
    const confirmMsg = ids.length === 1
      ? "Are you sure you want to delete this client lead?"
      : `Are you sure you want to delete these ${ids.length} client leads?`;
    if (!window.confirm(confirmMsg)) return;

    setActionError(null);
    const savedPasscode = localStorage.getItem("devosphere_admin_passcode") || passcode;

    try {
      const res = await fetch(`/api/admin/leads?ids=${ids.join(",")}`, {
        method: "DELETE",
        headers: {
          "x-admin-passcode": savedPasscode,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete client leads.");
      }

      setLeads(leads.filter((l) => !ids.includes(l.id)));
      setSelectedLeads([]);
      showToast(ids.length === 1 ? "Client lead deleted!" : `${ids.length} client leads deleted!`);
    } catch (err: any) {
      setActionError(err.message);
      showToast(err.message, "error");
    }
  };

  const handleExportCSV = (candidatesToExport: Candidate[]) => {
    if (candidatesToExport.length === 0) {
      showToast("No candidates to export", "error");
      return;
    }

    const headers = [
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Role (Expertise)",
      "Applied Date",
      "Resume URL"
    ];

    const rows = candidatesToExport.map((c) => [
      c.firstName,
      c.lastName,
      c.email,
      c.phone || "",
      c.role,
      formatDate(c.createdAt),
      c.resumeUrl
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((val) => {
            const escaped = String(val).replace(/"/g, '""');
            return escaped.includes(",") || escaped.includes("\n") || escaped.includes('"')
              ? `"${escaped}"`
              : escaped;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    
    const filename = selectedCandidates.length > 0 
      ? `selected_candidates_${Date.now()}.csv`
      : candidateFilter 
        ? `candidates_${candidateFilter.replace(/\s+/g, "_").toLowerCase()}_${Date.now()}.csv`
        : `all_candidates_${Date.now()}.csv`;
        
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Exported successfully!");
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 text-text-primary">
        <Header />
        <main className="flex-grow flex items-center justify-center pt-32 pb-24">
          <Card className="w-full max-w-md p-8 border border-gray-200 bg-white shadow-xl rounded-2xl flex flex-col gap-6 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <Lock className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2">
              <Heading level={2} size="2xl" className="text-black font-extrabold tracking-tight">
                HR Admin Access
              </Heading>
              <Text size="sm" variant="muted">
                Enter the passcode to manage openings, applicants, and inquiries.
              </Text>
            </div>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="password"
                required
                placeholder="Enter passcode (default: admin123)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-white border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-md px-4 py-3 text-base text-black placeholder-gray-400 outline-none transition-all duration-200"
              />
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                className="bg-brand-primary hover:bg-brand-secondary border-brand-primary text-white font-extrabold py-3.5 rounded-md w-full"
              >
                {isLoading ? "Authenticating..." : "Unlock Dashboard"}
              </Button>
              {loginError && (
                <div className="text-sm font-semibold text-red-600 mt-1 p-2.5 bg-red-50 border border-red-100 rounded-md">
                  {loginError}
                </div>
              )}
            </form>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-text-primary">
      <Header />
      
      <main className="flex-grow pt-32 pb-24">
        <Container size="2xl">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-gray-200 pb-6">
            <div className="text-left">
              <Heading level={1} size="3xl" className="font-heading font-extrabold text-black tracking-tight">
                {adminRole === "super_admin" ? "Super Admin Panel" : "HR Admin Panel"}
              </Heading>
              <Text size="sm" variant="muted" className="mt-1">
                {adminRole === "super_admin" 
                  ? "Full control over recruitment settings, job postings, and incoming client leads."
                  : "Manage your job openings and view submitted candidate resumes."}
              </Text>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm font-bold text-gray-500 hover:text-red-600 transition-colors border border-gray-200 bg-white hover:bg-red-50 rounded-lg px-4 py-2"
            >
              Sign Out
            </button>
          </div>

          {/* Statistics summary row */}
          <div className={`grid grid-cols-1 ${adminRole === "super_admin" ? "md:grid-cols-3" : "md:grid-cols-2"} gap-5 mb-8`}>
            <Card className="p-6 border border-gray-200 bg-white flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="text-xs font-heading font-black text-gray-400 uppercase tracking-wider">Total Applications</span>
                <h3 className="text-2xl font-black text-black mt-0.5">{candidates.length}</h3>
              </div>
            </Card>
            {adminRole === "super_admin" && (
              <Card className="p-6 border border-gray-200 bg-white flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-heading font-black text-gray-400 uppercase tracking-wider">Total Client Leads</span>
                  <h3 className="text-2xl font-black text-black mt-0.5">{leads.length}</h3>
                </div>
              </Card>
            )}
            <Card className="p-6 border border-gray-200 bg-white flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                <Tag className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="text-xs font-heading font-black text-gray-400 uppercase tracking-wider">Active Openings</span>
                <h3 className="text-2xl font-black text-black mt-0.5">{jobs.length}</h3>
              </div>
            </Card>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-6 border-b border-gray-200 mb-8 pl-1">
            <button
              onClick={() => setActiveTab("candidates")}
              className={`pb-4 text-base font-bold transition-all relative ${
                activeTab === "candidates" ? "text-brand-primary" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Candidates ({candidates.length})
              {activeTab === "candidates" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />
              )}
            </button>
            {adminRole === "super_admin" && (
              <button
                onClick={() => setActiveTab("leads")}
                className={`pb-4 text-base font-bold transition-all relative ${
                  activeTab === "leads" ? "text-brand-primary" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Client Leads ({leads.length})
                {activeTab === "leads" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />
                )}
              </button>
            )}
            <button
              onClick={() => setActiveTab("openings")}
              className={`pb-4 text-base font-bold transition-all relative ${
                activeTab === "openings" ? "text-brand-primary" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Job Openings ({jobs.length})
              {activeTab === "openings" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />
              )}
            </button>
          </div>

          {actionError && (
            <div className="text-sm font-semibold text-red-600 mb-6 p-3 bg-red-50 border border-red-100 rounded-md text-left">
              Error: {actionError}
            </div>
          )}

          {/* Content Area */}
          {activeTab === "candidates" ? (
            <div className="flex flex-col gap-5 text-left">
              {candidateFilter && (
                <div className="flex items-center justify-between bg-brand-primary/5 border border-brand-primary/20 rounded-2xl p-4 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-heading font-black text-brand-primary uppercase tracking-wider">Filtering:</span>
                    <span className="text-sm font-bold text-gray-800">Applications for "{candidateFilter}"</span>
                  </div>
                  <button
                    onClick={() => setCandidateFilter(null)}
                    className="text-xs font-bold text-brand-primary hover:text-brand-secondary bg-white border border-brand-primary/20 px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Clear Filter
                  </button>
                </div>
              )}
              {(() => {
                const filteredCandidates = candidateFilter
                  ? candidates.filter((c) => c.role.toLowerCase() === candidateFilter.toLowerCase())
                  : candidates;

                if (filteredCandidates.length === 0) {
                  return (
                    <Card className="p-10 border border-dashed border-gray-300 text-center bg-white rounded-2xl">
                      <Text size="base" variant="muted">
                        {candidateFilter
                          ? `No candidate applications found for "${candidateFilter}".`
                          : "No candidate applications found yet."}
                      </Text>
                    </Card>
                  );
                }

                return (
                  <>
                    {/* Bulk Action Bar for Candidates */}
                    {adminRole === "super_admin" && selectedCandidates.length > 0 && (
                      <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-2xl p-4 mb-2 text-left animate-fade-in">
                        <span className="text-sm font-semibold text-red-850">
                          {selectedCandidates.length} candidate{selectedCandidates.length > 1 ? "s" : ""} selected
                        </span>
                        <button
                          onClick={() => handleDeleteCandidates(selectedCandidates)}
                          className="inline-flex items-center gap-2 text-xs font-bold text-white bg-red-600 hover:bg-red-750 px-4 py-2 rounded-xl transition-all cursor-pointer shadow-sm"
                        >
                          <Trash2 className="w-4 h-4" /> Delete Selected
                        </button>
                      </div>
                    )}

                    {/* Table Header Action Row */}
                    <div className="flex justify-between items-center mb-4 bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-3.5">
                      <Text size="sm" variant="muted" className="font-bold">
                        Showing {filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? "s" : ""}
                      </Text>
                      <button
                        onClick={() => handleExportCSV(selectedCandidates.length > 0 ? candidates.filter(c => selectedCandidates.includes(c.id)) : filteredCandidates)}
                        className="inline-flex items-center gap-2 text-xs font-heading font-black text-brand-primary hover:text-brand-secondary bg-white border border-brand-primary/20 hover:border-brand-primary px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm uppercase tracking-wider"
                      >
                        <Download className="w-4 h-4" />
                        {selectedCandidates.length > 0
                          ? `Export Selected (${selectedCandidates.length})`
                          : candidateFilter
                            ? "Export Filtered"
                            : "Export All"}
                      </button>
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto bg-white border border-gray-200 rounded-2xl shadow-sm">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200 text-xs font-heading font-black text-gray-400 uppercase tracking-wider">
                            {adminRole === "super_admin" && (
                              <th className="p-5 w-12">
                                <input
                                  type="checkbox"
                                  checked={filteredCandidates.length > 0 && filteredCandidates.every(c => selectedCandidates.includes(c.id))}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      const newSelected = Array.from(new Set([...selectedCandidates, ...filteredCandidates.map(c => c.id)]));
                                      setSelectedCandidates(newSelected);
                                    } else {
                                      const filteredIds = filteredCandidates.map(c => c.id);
                                      setSelectedCandidates(selectedCandidates.filter(id => !filteredIds.includes(id)));
                                    }
                                  }}
                                  className="w-4 h-4 text-brand-primary border-gray-305 rounded focus:ring-brand-primary cursor-pointer"
                                />
                              </th>
                            )}
                            <th className="p-5">Applicant</th>
                            <th className="p-5">Expertise</th>
                            <th className="p-5">Applied Date</th>
                            <th className="p-5 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-150">
                          {filteredCandidates.map((candidate) => (
                            <tr key={candidate.id} className="hover:bg-gray-55 transition-colors">
                              {adminRole === "super_admin" && (
                                <td className="p-5">
                                  <input
                                    type="checkbox"
                                    checked={selectedCandidates.includes(candidate.id)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedCandidates([...selectedCandidates, candidate.id]);
                                      } else {
                                        setSelectedCandidates(selectedCandidates.filter(id => id !== candidate.id));
                                      }
                                    }}
                                    className="w-4 h-4 text-brand-primary border-gray-305 rounded focus:ring-brand-primary cursor-pointer"
                                  />
                                </td>
                              )}
                              <td className="p-5">
                                <div className="flex flex-col">
                                  <span className="font-heading font-extrabold text-base text-gray-900">
                                    {candidate.firstName} {candidate.lastName}
                                  </span>
                                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-1">
                                    <span className="flex items-center gap-1 whitespace-nowrap"><Mail className="w-3.5 h-3.5" /> {candidate.email}</span>
                                    {candidate.phone && <span className="flex items-center gap-1 whitespace-nowrap"><Phone className="w-3.5 h-3.5" /> {candidate.phone}</span>}
                                  </div>
                                </div>
                              </td>
                              <td className="p-5">
                                <span className="bg-brand-primary/10 text-brand-primary border border-brand-primary/20 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                                  {candidate.role}
                                </span>
                              </td>
                              <td className="p-5 text-sm text-gray-500 font-medium">
                                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {formatDate(candidate.createdAt)}</span>
                              </td>
                              <td className="p-5 text-right flex items-center justify-end gap-2">
                                <a
                                  href={`mailto:${candidate.email}?subject=Regarding%20your%20Devosphere%20application`}
                                  className="inline-flex items-center gap-2 text-xs md:text-sm font-bold px-4 py-2.5 rounded-lg transition-all border cursor-pointer bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                                >
                                  <Mail className="w-4 h-4 text-gray-400" /> Email
                                </a>
                                <button
                                  onClick={() => handleShareProfile(candidate.id)}
                                  className="inline-flex items-center gap-2 text-xs md:text-sm font-bold px-4 py-2.5 rounded-lg transition-all border cursor-pointer bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                                >
                                  <Share2 className="w-4 h-4" /> Share
                                </button>
                                <a
                                  href={candidate.resumeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-brand-primary hover:text-brand-secondary border border-brand-primary/20 hover:border-brand-primary bg-white hover:bg-brand-primary/5 px-4 py-2.5 rounded-lg transition-all"
                                >
                                  <FileText className="w-4 h-4" /> Resume
                                </a>
                                {adminRole === "super_admin" && (
                                  <button
                                    onClick={() => handleDeleteCandidates([candidate.id])}
                                    className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-xl transition-all cursor-pointer border border-transparent hover:border-red-100"
                                    title="Delete candidate"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                      {filteredCandidates.map((candidate) => (
                        <Card key={candidate.id} className="p-5 border border-gray-100 bg-white shadow-sm rounded-2xl flex flex-col gap-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start gap-3">
                              {adminRole === "super_admin" && (
                                <input
                                  type="checkbox"
                                  checked={selectedCandidates.includes(candidate.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedCandidates([...selectedCandidates, candidate.id]);
                                    } else {
                                      setSelectedCandidates(selectedCandidates.filter(id => id !== candidate.id));
                                    }
                                  }}
                                  className="w-4 h-4 text-brand-primary border-gray-305 rounded focus:ring-brand-primary mt-1 cursor-pointer"
                                />
                              )}
                              <div className="flex flex-col">
                                <span className="font-heading font-extrabold text-base text-gray-900">
                                  {candidate.firstName} {candidate.lastName}
                                </span>
                                <span className="text-xs text-gray-400 mt-0.5">Applied: {formatDate(candidate.createdAt)}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="bg-brand-primary/10 text-brand-primary border border-brand-primary/20 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                                {candidate.role}
                              </span>
                              {adminRole === "super_admin" && (
                                <button
                                  onClick={() => handleDeleteCandidates([candidate.id])}
                                  className="text-gray-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-all"
                                  title="Delete candidate"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 border-t border-b border-gray-100 py-3">
                            <span className="flex items-center gap-2 whitespace-nowrap"><Mail className="w-3.5 h-3.5 text-gray-400" /> {candidate.email}</span>
                            {candidate.phone && <span className="flex items-center gap-2 whitespace-nowrap"><Phone className="w-3.5 h-3.5 text-gray-400" /> {candidate.phone}</span>}
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <a
                              href={`mailto:${candidate.email}?subject=Regarding%20your%20Devosphere%20application`}
                              className="flex items-center justify-center gap-1 text-[10px] font-bold px-2 py-2.5 rounded-xl border bg-white border-gray-200 text-gray-700 hover:bg-gray-50 w-full"
                            >
                              <Mail className="w-3.5 h-3.5" /> Email
                            </a>
                            <button
                              onClick={() => handleShareProfile(candidate.id)}
                              className="flex items-center justify-center gap-1 text-[10px] font-bold px-2 py-2.5 rounded-xl border bg-white border-gray-200 text-gray-700 hover:bg-gray-50 w-full cursor-pointer"
                            >
                              <Share2 className="w-3.5 h-3.5" /> Share
                            </button>
                            <a
                              href={candidate.resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-1 text-[10px] font-bold text-brand-primary hover:text-brand-secondary border border-brand-primary/20 hover:border-brand-primary bg-white hover:bg-brand-primary/5 px-2 py-2.5 rounded-xl w-full text-center"
                            >
                              <FileText className="w-3.5 h-3.5" /> Resume
                            </a>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          ) : activeTab === "leads" && adminRole === "super_admin" ? (
            <div className="flex flex-col gap-5 text-left">
              {/* Bulk Action Bar for Client Leads */}
              {adminRole === "super_admin" && (
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-200 pb-4 mb-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="selectAllLeads"
                      checked={leads.length > 0 && leads.every(l => selectedLeads.includes(l.id))}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedLeads(leads.map(l => l.id));
                        } else {
                          setSelectedLeads([]);
                        }
                      }}
                      className="w-4 h-4 text-brand-primary border-gray-305 rounded focus:ring-brand-primary cursor-pointer"
                    />
                    <label htmlFor="selectAllLeads" className="text-sm font-bold text-gray-600 cursor-pointer select-none">
                      Select All Leads
                    </label>
                  </div>
                  {selectedLeads.length > 0 && (
                    <button
                      onClick={() => handleDeleteLeads(selectedLeads)}
                      className="inline-flex items-center gap-2 text-xs font-bold text-white bg-red-600 hover:bg-red-750 px-4.5 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
                    >
                      <Trash2 className="w-4.5 h-4.5" /> Delete Selected ({selectedLeads.length})
                    </button>
                  )}
                </div>
              )}

              {leads.length === 0 ? (
                <Card className="p-16 border border-dashed border-gray-200 text-center bg-white rounded-3xl flex flex-col items-center justify-center gap-2">
                  <Briefcase className="w-10 h-10 text-gray-300" />
                  <Text size="base" variant="muted">No client inquiries found yet.</Text>
                </Card>
              ) : (
                <div className="flex flex-col gap-6 w-full">
                  {leads.map((lead) => (
                    <Card key={lead.id} className="p-6 md:p-8 border border-gray-200 bg-white shadow-sm rounded-2xl flex flex-col md:flex-row justify-between gap-6 hover:border-brand-primary/30 transition-all duration-300">
                      {/* Client Info Block */}
                      <div className="flex flex-col md:w-1/3 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-8 text-left justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-1.5">
                            {adminRole === "super_admin" && (
                              <input
                                type="checkbox"
                                checked={selectedLeads.includes(lead.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedLeads([...selectedLeads, lead.id]);
                                  } else {
                                    setSelectedLeads(selectedLeads.filter(id => id !== lead.id));
                                  }
                                }}
                                className="w-4 h-4 text-brand-primary border-gray-305 rounded focus:ring-brand-primary cursor-pointer"
                              />
                            )}
                            <span className="text-[10px] font-heading font-black text-brand-primary uppercase tracking-wider block">Client Partner</span>
                          </div>
                          <h4 className="font-heading font-extrabold text-lg text-gray-900 leading-snug">
                            {lead.firstName} {lead.lastName}
                          </h4>
                        </div>
                        
                        <div className="flex flex-col gap-2.5 mt-6 text-xs text-gray-500 font-medium">
                          <a href={`mailto:${lead.email}`} className="flex items-center gap-2 hover:text-brand-primary transition-colors">
                            <Mail className="w-4 h-4 text-gray-400" /> {lead.email}
                          </a>
                          {lead.phone && (
                            <a href={`tel:${lead.phone}`} className="flex items-center gap-2 hover:text-brand-primary transition-colors">
                              <Phone className="w-4 h-4 text-gray-400" /> {lead.phone}
                            </a>
                          )}
                          <span className="flex items-center gap-2 text-gray-400 mt-1.5 border-t border-gray-55 pt-2.5">
                            <Calendar className="w-4 h-4" /> Received: {formatDate(lead.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Project Details Block */}
                      <div className="flex-1 text-left flex flex-col justify-between pl-0 md:pl-2">
                        <div>
                          <span className="text-[10px] font-heading font-black text-gray-400 uppercase tracking-wider block mb-2.5">Project Brief & Requirements</span>
                          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-medium bg-gray-50/50 border border-gray-105 p-4 rounded-xl">
                            {lead.project}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-end gap-3 mt-6">
                          {adminRole === "super_admin" && (
                            <button
                              onClick={() => handleDeleteLeads([lead.id])}
                              className="text-gray-400 hover:text-red-600 p-2.5 rounded-xl hover:bg-red-50 transition-all cursor-pointer border border-gray-100 hover:border-red-100"
                              title="Delete lead"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                          <a
                            href={`mailto:${lead.email}?subject=Regarding%20your%20Devosphere%20inquiry`}
                            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-brand-primary hover:bg-brand-secondary px-4.5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer hover:-translate-y-0.5 duration-200"
                          >
                            <Mail className="w-3.5 h-3.5" /> Reply to Client
                          </a>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-6 text-left w-full">
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-100 pb-5">
                <div>
                  <Heading level={2} size="xl" className="text-black font-extrabold tracking-tight">
                    Active Job Openings
                  </Heading>
                  <Text size="sm" className="text-gray-400 mt-1">Manage, share, and track active career opportunities.</Text>
                </div>
                <Button
                  onClick={() => setIsCreateModalOpen(true)}
                  variant="primary"
                  className="bg-brand-primary hover:bg-brand-secondary border-brand-primary text-white font-heading font-black text-xs md:text-sm uppercase tracking-wider py-3 px-5 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Plus className="w-4 h-4" /> Create Opening
                </Button>
              </div>

              {/* Job Openings List */}
              <div>
                {jobs.length === 0 ? (
                  <Card className="p-16 border border-dashed border-gray-200 text-center bg-white rounded-3xl flex flex-col items-center justify-center gap-2">
                    <Briefcase className="w-10 h-10 text-gray-300" />
                    <Text size="base" variant="muted">No active job openings found. Click "Create Opening" to add one.</Text>
                  </Card>
                ) : (
                  <>
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto bg-white border border-gray-150 rounded-2xl shadow-sm">
                      <table className="w-full text-left border-collapse table-auto">
                        <thead>
                          <tr className="bg-gray-50/75 border-b border-gray-200 text-[11px] font-heading font-black text-gray-400 uppercase tracking-wider">
                            <th className="p-4.5 text-left pl-6">Job Title / Dept</th>
                            <th className="p-4.5 text-left">Location</th>
                            <th className="p-4.5 text-left">Experience</th>
                            <th className="p-4.5 text-left">Budget (INR)</th>
                            <th className="p-4.5 text-left">Date Created</th>
                            <th className="p-4.5 text-right pr-6">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {jobs.map((job) => {
                            const jobCandidatesCount = candidates.filter(
                              (c) => c.role.toLowerCase() === job.title.toLowerCase()
                            ).length;

                            return (
                              <tr key={job.id} className="hover:bg-gray-50/40 transition-colors align-middle">
                                <td className="p-4.5 text-left pl-6">
                                  <div className="flex flex-col">
                                    <span className="font-heading font-extrabold text-gray-900 text-sm">{job.title}</span>
                                    <span className="text-[11px] text-gray-400 font-bold tracking-wide uppercase mt-0.5">{job.dept}</span>
                                  </div>
                                </td>
                                <td className="p-4.5 text-left text-xs text-gray-700 font-semibold">
                                  <span className="bg-brand-primary/5 text-brand-primary border border-brand-primary/10 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                    {job.locationType || "Remote"}
                                  </span>
                                </td>
                                <td className="p-4.5 text-left text-xs text-gray-700 font-bold">
                                  {job.experience || "Not Disclosed"}
                                </td>
                                <td className="p-4.5 text-left text-xs text-gray-700 font-bold">
                                  {job.budget || "Not Disclosed"}
                                </td>
                                <td className="p-4.5 text-left text-xs text-gray-400 font-medium">
                                  {formatDate(job.createdAt)}
                                </td>
                                <td className="p-4.5 text-right pr-6">
                                  <div className="flex items-center justify-end gap-2.5">
                                    {jobCandidatesCount > 0 && (
                                      <button
                                        onClick={() => {
                                          setCandidateFilter(job.title);
                                          setActiveTab("candidates");
                                        }}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-brand-primary hover:bg-brand-secondary px-3 py-2 rounded-xl transition-all cursor-pointer shadow-sm"
                                        title="View Candidates"
                                      >
                                        <Users className="w-3.5 h-3.5" /> Candidates ({jobCandidatesCount})
                                      </button>
                                    )}
                                    <button
                                      onClick={() => handleShareJob(job.id)}
                                      className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-sm"
                                      title="Share Job Link"
                                    >
                                      <Share2 className="w-3.5 h-3.5 text-gray-400" /> Share
                                    </button>
                                    <button
                                      onClick={() => handleDeleteJob(job.id)}
                                      className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-xl transition-all cursor-pointer border border-transparent hover:border-red-100"
                                      title="Delete job opening"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                      {jobs.map((job) => {
                        const jobCandidatesCount = candidates.filter(
                          (c) => c.role.toLowerCase() === job.title.toLowerCase()
                        ).length;

                        return (
                          <Card key={job.id} className="p-5 border border-gray-100 bg-white shadow-sm rounded-2xl flex flex-col gap-4 text-left">
                            <div className="flex justify-between items-start">
                              <div className="flex flex-col">
                                <span className="font-heading font-bold text-gray-900 text-sm">{job.title}</span>
                                <span className="text-xs text-gray-400 font-semibold mt-0.5">{job.dept}</span>
                              </div>
                              <span className="bg-brand-primary/10 text-brand-primary border border-brand-primary/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                                {job.locationType || "Remote"}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-xs border-t border-b border-gray-100 py-3">
                              <div className="flex flex-col">
                                <span className="text-[10px] font-heading font-black text-gray-400 uppercase tracking-wider">Experience</span>
                                <span className="font-semibold text-gray-700 mt-0.5">{job.experience || "Not Disclosed"}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10px] font-heading font-black text-gray-400 uppercase tracking-wider">Budget</span>
                                <span className="font-semibold text-gray-700 mt-0.5">{job.budget || "Not Disclosed"}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between gap-3 pt-1">
                              {jobCandidatesCount > 0 && (
                                <button
                                  onClick={() => {
                                    setCandidateFilter(job.title);
                                    setActiveTab("candidates");
                                  }}
                                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-brand-primary hover:bg-brand-secondary px-3 py-2.5 rounded-xl transition-all cursor-pointer"
                                >
                                  <Users className="w-3.5 h-3.5" /> Candidates ({jobCandidatesCount})
                                </button>
                              )}
                              <button
                                onClick={() => handleShareJob(job.id)}
                                className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 px-3 py-2.5 rounded-xl transition-all cursor-pointer"
                              >
                                <Share2 className="w-3.5 h-3.5" /> Share
                              </button>
                              <button
                                onClick={() => handleDeleteJob(job.id)}
                                className="text-gray-400 hover:text-red-600 p-2.5 rounded-xl hover:bg-red-50 transition-all cursor-pointer border border-gray-100 hover:border-red-100"
                                title="Delete job opening"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </Container>
      </main>

      {/* Create Job Opening Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-y-auto">
          <Card className="bg-white border border-gray-150 shadow-2xl rounded-3xl p-8 max-w-lg w-full relative my-8 text-left animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <Heading level={3} size="lg" className="text-black font-extrabold tracking-tight mb-5">
              Create New Job Opening
            </Heading>

            <form onSubmit={handleCreateJob} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Frontend Engineer"
                  value={newJobTitle}
                  onChange={(e) => setNewJobTitle(e.target.value)}
                  className="w-full bg-white border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl px-4 py-2.5 text-sm text-black placeholder-gray-400 outline-none transition-all duration-200"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Department / Category</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Frontend Development, Sales, HR"
                  value={newJobDept}
                  onChange={(e) => setNewJobDept(e.target.value)}
                  className="w-full bg-white border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl px-4 py-2.5 text-sm text-black placeholder-gray-400 outline-none transition-all duration-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Location Type</label>
                  <div className="relative">
                    <select
                      value={newJobLocationType}
                      onChange={(e) => setNewJobLocationType(e.target.value)}
                      className="w-full bg-white border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl px-4 py-2.5 pr-10 text-sm text-black outline-none transition-all duration-200 appearance-none cursor-pointer font-medium"
                    >
                      <option value="Remote">Remote</option>
                      <option value="Onsite">Onsite</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-400">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Required Experience</label>
                  <input
                    type="text"
                    placeholder="e.g. 3+ Years, 5-8 Years"
                    value={newJobExperience}
                    onChange={(e) => setNewJobExperience(e.target.value)}
                    className="w-full bg-white border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl px-4 py-2.5 text-sm text-black placeholder-gray-400 outline-none transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Budget / Salary (INR)</label>
                <input
                  type="text"
                  placeholder="e.g. ₹50,000/mo or ₹8-12 LPA (Leave blank for Not Disclosed)"
                  value={newJobBudget}
                  onChange={(e) => setNewJobBudget(e.target.value)}
                  className="w-full bg-white border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl px-4 py-2.5 text-sm text-black placeholder-gray-400 outline-none transition-all duration-200"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Job Description</label>
                <textarea
                  required
                  placeholder="Describe the role, day-to-day tasks, and team fit..."
                  value={newJobDescription}
                  onChange={(e) => setNewJobDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-white border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl px-4 py-2.5 text-sm text-black placeholder-gray-400 outline-none transition-all duration-200 resize-y"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Key Requirements (one per line)</label>
                <textarea
                  required
                  placeholder="e.g.&#10;5+ years React experience&#10;Strong TypeScript skills"
                  value={newJobRequirements}
                  onChange={(e) => setNewJobRequirements(e.target.value)}
                  rows={3}
                  className="w-full bg-white border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl px-4 py-2.5 text-sm text-black placeholder-gray-400 outline-none transition-all duration-200 resize-y"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmittingJob}
                className="bg-brand-primary hover:bg-brand-secondary border-brand-primary text-white font-heading font-black text-xs uppercase tracking-wider py-3.5 rounded-xl flex items-center justify-center gap-1.5 mt-2 shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" /> {isSubmittingJob ? "Creating..." : "Create Opening"}
              </Button>
            </form>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
}
