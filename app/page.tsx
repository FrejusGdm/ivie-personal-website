"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { TextReveal } from "@/components/ui/text-reveal";
import { AdirePattern } from "@/components/ui/adire-pattern";
import { MagneticButton } from "@/components/ui/magnetic-button";

const versions = [
  {
    id: "v1",
    name: "The Editorial Magazine",
    description: "High-fashion editorial layout. Asymmetrical grid. Paper textures.",
    number: "01",
  },
  {
    id: "v2",
    name: "The Cinematic Storyboard",
    description: "Horizontal film reel. Focus brackets. Running timecodes.",
    number: "02",
  },
  {
    id: "v3",
    name: "The Editorial",
    description: "Split magazine. Hover reveals. Coslovs-inspired elegance.",
    number: "03",
  },
  {
    id: "v4",
    name: "The Film Reel",
    description: "Horizontal cinema. Sprocket holes. Scroll like scrubbing footage.",
    number: "04",
  },
  {
    id: "v5",
    name: "The Storyboard",
    description: "Narrative chapters. Roots to horizon. Her story, scrolled.",
    number: "05",
  },
];

function VersionCard({
  version,
  index,
}: {
  version: (typeof versions)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    damping: 20,
    stiffness: 150,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
    damping: 20,
    stiffness: 150,
  });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 1.2 + index * 0.08,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link href={`/${version.id}`}>
        <motion.div
          ref={ref}
          className="group relative h-full"
          onMouseMove={handleMouse}
          onMouseLeave={() => {
            resetMouse();
            setHovered(false);
          }}
          onMouseEnter={() => setHovered(true)}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1200,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="relative h-full p-8 md:p-10 rounded-[20px] border border-foreground/[0.06] overflow-hidden transition-all duration-700 noise-overlay flex flex-col"
            style={{
              backgroundColor: hovered ? "#0A0A0A" : "transparent",
              boxShadow: hovered
                ? "0 30px 60px -12px rgba(0,0,0,0.15)"
                : "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            {/* Top row: number + arrow */}
            <div className="flex items-start justify-between mb-12">
              <span
                className={`font-mono text-[11px] font-medium tracking-wider transition-colors duration-500 ${
                  hovered ? "text-white/50" : "text-foreground/50"
                }`}
              >
                {version.number}
              </span>
              <motion.div
                animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.3 }}
                transition={{ duration: 0.3 }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M4 14L14 4M14 4H6M14 4V12"
                    stroke={hovered ? "#ffffff" : "#0A0A0A"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Title */}
            <h2 className="font-serif text-[2rem] md:text-[2.5rem] leading-[0.9] mb-4">
              <span
                className="transition-colors duration-500"
                style={{ color: hovered ? "#ffffff" : "var(--fg)" }}
              >
                {version.name}
              </span>
            </h2>

            {/* Description */}
            <p className={`text-[13px] leading-relaxed mt-auto max-w-[280px] transition-colors duration-500 ${
              hovered ? "text-white/60" : "text-foreground/55"
            }`}>
              {version.description}
            </p>

            {/* Bottom decorative line */}
            <motion.div
              className="mt-10 h-[1px] origin-left bg-white"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hovered ? 1 : 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <AdirePattern opacity={0.012} color="#0A0A0A" />

      {/* Hero — asymmetric, editorial */}
      <div className="relative z-10 pt-16 md:pt-24 pb-20 md:pb-28 px-8 md:px-16 lg:px-24">
        {/* Top line with marker */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="w-2 h-2 rounded-full bg-foreground" />
          <div className="h-[1px] flex-1 bg-foreground/[0.06]" />
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-foreground/50">
            Portfolio Explorations
          </span>
        </motion.div>

        {/* Name — massive, left-aligned, stacked */}
        <div className="max-w-5xl">
          <TextReveal
            text="IVIE"
            as="h1"
            className="font-serif text-[clamp(5rem,15vw,14rem)] leading-[0.82] tracking-[-0.04em] font-light"
          />
          <div className="flex items-end gap-6 md:gap-10">
            <TextReveal
              text="AIWUYO"
              as="h1"
              className="font-serif text-[clamp(5rem,15vw,14rem)] leading-[0.82] tracking-[-0.04em] font-light"
              delay={0.2}
            />
            <motion.span
              className="font-serif text-[clamp(1.2rem,2.5vw,2rem)] italic text-foreground/45 pb-4 hidden md:block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              five visions,<br />one artist
            </motion.span>
          </div>
        </div>

        {/* Subtitle row */}
        <motion.div
          className="mt-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/50">
            {["Film", "Photography", "Design", "Branding"].map((d, i) => (
              <span key={d} className="flex items-center gap-3">
                {i > 0 && <span className="w-4 h-[1px] bg-foreground/10" />}
                {d}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.p
          className="mt-5 text-[13px] text-foreground/55 max-w-lg leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          Nigerian-American filmmaker from Chicago&apos;s South Side. Each version below
          reimagines how her multidisciplinary portfolio could come alive on the web.
        </motion.p>
      </div>

      {/* Marquee divider */}
      <div className="relative z-10 overflow-hidden py-5 border-y border-foreground/[0.04]">
        <div className="marquee flex gap-12 whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, ri) => (
            <span key={ri} className="flex gap-12">
              {[
                "The Editorial Magazine",
                "The Cinematic Storyboard",
                "The Editorial",
                "The Film Reel",
                "The Storyboard"
              ].map((name) => (
                <span
                  key={`${ri}-${name}`}
                  className="font-serif text-foreground/[0.05] text-xl italic"
                >
                  {name} ✦
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Version grid — 3 columns, generous spacing */}
      <div className="relative z-10 flex-1 px-8 md:px-16 lg:px-24 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {versions.map((version, i) => (
            <VersionCard key={version.id} version={version} index={i} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-10 px-8 md:px-16 lg:px-24 border-t border-foreground/[0.04] mt-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="font-serif text-2xl italic text-foreground/70">Ivie.</span>
            <p className="font-mono text-[9px] tracking-wider text-foreground/40 mt-1 uppercase">
              Chicago / Dartmouth / Lagos
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 font-mono text-[9px] tracking-wider text-foreground/35 uppercase">
              <span>Next.js</span>
              <span className="w-3 h-[1px] bg-foreground/8" />
              <span>Framer Motion</span>
              <span className="w-3 h-[1px] bg-foreground/8" />
              <span>GSAP</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}