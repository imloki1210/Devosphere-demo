"use client";

import * as React from "react";
import { Button } from "./button";
import { Text } from "./text";
import { Send } from "lucide-react";

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    
    // Simulate API registration
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
        <input
          type="email"
          placeholder="Enter your work email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading" || status === "success"}
          className="flex-1 bg-white/5 border border-white/10 rounded-default px-4 py-3 text-base text-white placeholder-text-muted focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary disabled:opacity-50 transition-all duration-200"
        />
        <Button
          type="submit"
          variant="primary"
          disabled={status === "loading" || status === "success"}
          className="sm:w-auto h-full"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
          <Send className="ml-2 w-4 h-4" />
        </Button>
      </form>
      {status === "success" && (
        <Text size="sm" className="text-emerald-400 mt-2 font-semibold">
          Thank you! You have successfully subscribed to our newsletter.
        </Text>
      )}
    </div>
  );
};
