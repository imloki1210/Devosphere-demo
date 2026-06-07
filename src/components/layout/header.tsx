"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Container } from "../ui/container";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface SubItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  subItems?: SubItem[];
}

const navigationItems: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    subItems: [
      { label: "Solutions", href: "/services" },
      { label: "How It Works", href: "/services/how-it-works" },
      { label: "Technologies", href: "/services/technologies" },
    ],
  },
  {
    label: "Our Clients",
    href: "/our-clients",
    subItems: [
      { label: "Case Studies", href: "/our-clients#cases" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
  },
  {
    label: "Who We Are",
    href: "/who-we-are",
    subItems: [
      { label: "About Us", href: "/who-we-are#about" },
      { label: "Our Values", href: "/who-we-are#values" },
    ],
  },
  {
    label: "Careers",
    href: "/careers",
    subItems: [
      { label: "Why Work With Us", href: "/careers#why-us" },
      { label: "Open Roles", href: "/careers#roles" },
    ],
  },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

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
            ? "bg-white/95 backdrop-blur-md border-black/5 py-3 shadow-sm"
            : "bg-white border-black/5 py-4"
        )}
      >
        <Container size="2xl">
          <nav className="flex items-center justify-between gap-4 w-full">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="flex gap-2 items-center">
                <svg
                  width="30"
                  height="30"
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
                <span className="font-heading font-black text-xl tracking-tight uppercase text-black ml-0.5">
                  Devo<span className="text-brand-primary">sphere</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-4 flex-grow justify-center">
              {navigationItems.map((item) => {
                const hasSubItems = !!item.subItems;
                const isDropdownOpen = activeDropdown === item.label;
                const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");

                return (
                  <div
                    key={item.label}
                    className="relative py-1.5"
                    onMouseEnter={() => hasSubItems && setActiveDropdown(item.label)}
                    onMouseLeave={() => hasSubItems && setActiveDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "text-sm font-heading font-semibold tracking-normal transition-all duration-200 px-4 py-2 rounded-lg whitespace-nowrap block text-center",
                        isActive || isDropdownOpen
                          ? "text-brand-primary bg-gray-100/70"
                          : "text-gray-700 hover:text-brand-primary hover:bg-gray-50/50"
                      )}
                    >
                      {item.label}
                    </Link>

                    {/* Centered Dropdown Panel */}
                    <AnimatePresence>
                      {hasSubItems && isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.12, ease: "easeOut" }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 min-w-[200px] bg-white border border-gray-150 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] py-2.5 z-50 flex flex-col gap-0.5"
                        >
                          {item.subItems?.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className="px-5 py-2 text-sm font-heading font-semibold text-gray-700 hover:text-brand-primary hover:bg-brand-primary/[0.03] transition-colors duration-150 block text-left whitespace-nowrap"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Button
                variant="secondary"
                size="sm"
                href="/careers#roles"
                className="border-gray-200 text-black hover:bg-gray-50 hover:border-gray-400 rounded-md font-bold px-4 py-2 text-sm whitespace-nowrap"
              >
                Open Positions
              </Button>
              <Button
                variant="primary"
                size="sm"
                href="/contact"
                className="bg-brand-primary hover:bg-brand-secondary border-brand-primary hover:border-brand-secondary text-white font-bold rounded-md px-4 py-2 text-sm whitespace-nowrap"
              >
                Hire Devosphere
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-black hover:text-brand-primary transition-colors cursor-pointer shrink-0"
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
            className="fixed inset-0 z-40 bg-white flex flex-col pt-24 pb-8 px-6 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-4 flex-1">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-xl font-heading font-bold tracking-tight block py-2 border-b border-black/5",
                      pathname === item.href ? "text-brand-primary" : "text-black"
                    )}
                  >
                    {item.label}
                  </Link>

                  {/* Mobile sub items */}
                  {item.subItems && (
                    <div className="flex flex-col pl-4 gap-2 mt-2 mb-1">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-sm font-heading font-medium text-gray-500 hover:text-brand-primary py-1 block text-left"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col gap-3 mt-8">
              <Button variant="secondary" size="lg" href="/careers#roles" className="w-full border-black text-black">
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


