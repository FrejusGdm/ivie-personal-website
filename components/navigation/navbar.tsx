"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/magnetic-button";

interface NavbarProps {
  variant?: "light" | "dark" | "transparent";
  showLogo?: boolean;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#film", label: "Film" },
  { href: "#photography", label: "Photography" },
  { href: "#design", label: "Design" },
  { href: "#branding", label: "Branding" },
  { href: "#about", label: "About" },
];

export function Navbar({ variant = "light", showLogo = true }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isDark = variant === "dark";

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-5"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      >
        {showLogo && (
          <Link href="/" data-cursor="link">
            <motion.span
              className={`font-serif text-xl md:text-2xl italic ${isDark ? "text-white" : "text-foreground/80"}`}
              whileHover={{ scale: 1.02 }}
            >
              Ivie.
            </motion.span>
          </Link>
        )}

        <MagneticButton
          className="relative z-[101]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <button
            className={`flex flex-col gap-[6px] p-2 ${isDark || menuOpen ? "text-white" : "text-foreground"}`}
          >
            <motion.span
              className="block w-6 h-[1.5px] bg-current origin-center"
              animate={{
                rotate: menuOpen ? 45 : 0,
                y: menuOpen ? 3.75 : 0,
              }}
            />
            <motion.span
              className="block w-6 h-[1.5px] bg-current origin-center"
              animate={{
                rotate: menuOpen ? -45 : 0,
                y: menuOpen ? -3.75 : 0,
              }}
            />
          </button>
        </MagneticButton>
      </motion.nav>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] bg-foreground flex items-center justify-center"
            initial={{ clipPath: "circle(0% at calc(100% - 48px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 48px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 48px) 40px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col items-center gap-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-white font-serif text-5xl md:text-7xl tracking-[-0.03em] hover:opacity-60 transition-opacity duration-300"
                    data-cursor="link"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="mt-12 flex gap-8 text-white/50 font-mono text-[11px] uppercase tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span>Chicago</span>
                <span className="text-white/15">/</span>
                <span>Dartmouth</span>
                <span className="text-white/15">/</span>
                <span>Lagos</span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
