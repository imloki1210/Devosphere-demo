"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          type="button"
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-50 p-3.5 rounded-full bg-brand-primary text-white shadow-[0_4px_20px_rgba(109,36,229,0.25)] hover:shadow-[0_4px_25px_rgba(109,36,229,0.4)] border border-brand-primary/10 hover:bg-brand-secondary active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center group"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
