"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Container } from "../ui/container";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const navigationItems = [
  { label: "Services", href: "/services" },
  { label: "Our Clients", href: "/our-clients" },
  { label: "Industries", href: "/industries" },
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Careers", href: "/careers" },
  { label: "Resources", href: "/resources" },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full border-b",
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-black/5 py-3.5 shadow-sm"
            : "bg-white border-black/5 py-4.5"
        )}
      >
        <Container size="2xl">
          <nav className="flex items-center justify-between gap-4">


            {/* Logo */}
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
                    <linearGradient id="sphereGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#6d24e5" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="42" stroke="url(#sphereGrad)" strokeWidth="8" />
                  <ellipse cx="50" cy="50" rx="42" ry="15" stroke="url(#sphereGrad)" strokeWidth="5" strokeDasharray="8 6" transform="rotate(-30 50 50)" />
                  <path d="M38 40 L26 50 L38 60" stroke="#6d24e5" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M62 40 L74 50 L62 60" stroke="#6d24e5" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-heading font-black text-2xl tracking-tight uppercase text-black ml-0.5">
                  Devo<span className="text-brand-primary">sphere</span>
                </span>
              </div>
            </Link>
            <div className="hidden lg:flex items-center gap-7">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-heading font-semibold tracking-wide transition-colors duration-200 hover:text-brand-primary",
                    pathname === item.href ? "text-brand-primary" : "text-black/80"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                href="/careers"
                className="border-black/20 text-black hover:bg-black/5 hover:border-black rounded-md font-bold px-4 py-2 text-sm"
              >
                Open Positions
              </Button>
              <Button
                variant="primary"
                size="sm"
                href="/contact"
                className="bg-brand-primary hover:bg-brand-secondary border-brand-primary hover:border-brand-secondary text-white font-bold rounded-md px-4 py-2 text-sm"
              >
                Hire Devosphere
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-black hover:text-brand-primary transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
        </Container>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-white flex flex-col pt-24 pb-8 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-5 flex-1">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "text-xl font-heading font-bold tracking-tight block py-2 border-b border-black/5",
                      pathname === item.href ? "text-brand-primary" : "text-black"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-col gap-3 mt-auto">
              <Button variant="secondary" size="lg" href="/careers" className="w-full border-black text-black">
                Open Positions
              </Button>
              <Button variant="primary" size="lg" href="/contact" className="w-full bg-brand-primary text-white">
                Hire Devosphere
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
