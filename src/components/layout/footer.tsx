import * as React from "react";
import Link from "next/link";
import { Container } from "../ui/container";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";

const footerLinks = {
  solutions: [
    { label: "Solutions", href: "/services" },
    { label: "How It Works", href: "/services/how-it-works" },
    { label: "Technologies", href: "/services/technologies" },
  ],
  company: [
    { label: "Who We Are", href: "/who-we-are" },
    { label: "Our Clients", href: "/our-clients" },
    { label: "Careers", href: "/careers" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/contact" },
    { label: "Terms of Service", href: "/contact" },
  ],
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background-darker border-t border-white/5 pt-20 pb-10 w-full relative z-10">
      <Container size="2xl">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Logo & Info column */}
          <div className="lg:col-span-2 flex flex-col gap-6 text-left">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex gap-2 items-center">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:scale-105 transition-transform duration-200"
                >
                  <defs>
                    <linearGradient id="sphereGradFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#6d24e5" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="42" stroke="url(#sphereGradFooter)" strokeWidth="8" />
                  <ellipse cx="50" cy="50" rx="42" ry="15" stroke="url(#sphereGradFooter)" strokeWidth="5" strokeDasharray="8 6" transform="rotate(-30 50 50)" />
                  <path d="M38 40 L26 50 L38 60" stroke="#6d24e5" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M62 40 L74 50 L62 60" stroke="#6d24e5" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-heading font-black text-2xl tracking-tight uppercase text-black ml-0.5">
                  Devo<span className="text-brand-primary">sphere</span>
                </span>
              </div>
            </Link>
            <Text size="base" variant="muted" className="max-w-sm">
              We hire the world's most motivated developers to help leading brands scale their tech capacity, build great software, and drive technical outcomes.
            </Text>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <Link href="https://linkedin.com" className="w-10 h-10 rounded-default border border-white/10 bg-white/5 hover:bg-brand-primary hover:border-brand-primary transition-all duration-200 flex items-center justify-center text-white/70 hover:text-white" aria-label="LinkedIn">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </Link>
              <Link href="https://instagram.com" className="w-10 h-10 rounded-default border border-white/10 bg-white/5 hover:bg-brand-primary hover:border-brand-primary transition-all duration-200 flex items-center justify-center text-white/70 hover:text-white" aria-label="Instagram">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </Link>
              <Link href="https://github.com" className="w-10 h-10 rounded-default border border-white/10 bg-white/5 hover:bg-brand-primary hover:border-brand-primary transition-all duration-200 flex items-center justify-center text-white/70 hover:text-white" aria-label="Github">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </Link>
              <Link href="https://twitter.com" className="w-10 h-10 rounded-default border border-white/10 bg-white/5 hover:bg-brand-primary hover:border-brand-primary transition-all duration-200 flex items-center justify-center text-white/70 hover:text-white" aria-label="Twitter">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </Link>
              <Link href="https://slack.com" className="w-10 h-10 rounded-default border border-white/10 bg-white/5 hover:bg-brand-primary hover:border-brand-primary transition-all duration-200 flex items-center justify-center text-white/70 hover:text-white" aria-label="Slack">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="12" cy="12" r="3"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>
              </Link>
            </div>
          </div>
 
          {/* Links columns */}
          <div className="text-left">
            <Heading level={4} size="base" className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">
              Solutions
            </Heading>
            <ul className="flex flex-col gap-3">
              {footerLinks.solutions.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-sm text-gray-600 hover:text-brand-primary transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
 
          <div className="text-left">
            <Heading level={4} size="base" className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">
              Company
            </Heading>
            <ul className="flex flex-col gap-3">
              {footerLinks.company.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-sm text-gray-600 hover:text-brand-primary transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lower section */}
        <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Text size="sm" className="text-gray-500">
            &copy; {new Date().getFullYear()} Devosphere. All rights reserved.
          </Text>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((item, index) => (
              <Link key={index} href={item.href} className="text-xs text-gray-500 hover:text-brand-primary transition-colors duration-200">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};
