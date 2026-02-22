"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import { projects } from "@/lib/projects";
import { AdirePattern, AdireBorder } from "@/components/ui/adire-pattern";
import { TextReveal, TextRevealOnScroll } from "@/components/ui/text-reveal";
import { Navbar } from "@/components/navigation/navbar";

function Chapter({
  number,
  title,
  subtitle,
  color,
  children,
}: {
  number: string;
  title: string;
  subtitle: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative min-h-screen py-24 md:py-32">
      <motion.div
        className="mb-16 px-8 md:px-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <span
            className="font-mono text-[11px] tracking-[0.5em] uppercase"
            style={{ color }}
          >
            Chapter {number}
          </span>
          <div className="h-[1px] flex-1" style={{ backgroundColor: `${color}15` }} />
        </div>
        <TextRevealOnScroll
          text={title}
          as="h2"
          className="font-serif text-5xl md:text-8xl leading-[0.85] tracking-[-0.03em]"
        />
        <motion.p
          className="font-mono text-sm mt-4"
          style={{ color }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {subtitle}
        </motion.p>
      </motion.div>

      {children}
    </section>
  );
}

function ProjectCard({
  project,
  index,
  direction = "left",
}: {
  project: (typeof projects)[0];
  index: number;
  direction?: "left" | "right";
}) {
  return (
    <motion.div
      className={`flex items-start gap-8 md:gap-16 px-8 md:px-16 mb-16 ${
        direction === "right" ? "flex-row-reverse" : ""
      }`}
      initial={{ opacity: 0, x: direction === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div
        className="w-1/2 aspect-[4/3] rounded-2xl overflow-hidden flex-shrink-0 group relative"
        style={{
          background: project.thumbnail.startsWith("http") ? undefined : `linear-gradient(135deg, ${project.color}15, ${project.color}45)`,
        }}
        data-cursor="image"
      >
        {project.thumbnail.startsWith("http") && (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
          <div className="flex gap-2">
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-mono uppercase tracking-wider px-2 py-1 rounded-full bg-white/15 text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="w-1/2 py-8">
        <span className="font-mono text-[10px] tracking-wider uppercase" style={{ color: project.color }}>
          {project.year}
        </span>
        <h3 className="font-serif text-2xl md:text-3xl mt-2 mb-3 tracking-[-0.02em]">{project.title}</h3>
        <p className="text-sm text-foreground/65 leading-relaxed">{project.description}</p>
        {project.role && (
          <p className="font-mono text-[11px] text-foreground/50 mt-4">
            Role: {project.role}
          </p>
        )}
      </div>
    </motion.div>
  );
}

function StatCounter({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <span className="font-serif text-5xl md:text-7xl tracking-[-0.03em]" style={{ color }}>
        {value}
      </span>
      <p className="font-mono text-[10px] tracking-wider uppercase text-foreground/55 mt-2">
        {label}
      </p>
    </motion.div>
  );
}

export function Storyboard() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

  const filmProjects = projects.filter((p) => p.category === "film");
  const photoProjects = projects.filter((p) => p.category === "photography");
  const designProjects = projects.filter((p) => p.category === "design");
  const brandingProjects = projects.filter((p) => p.category === "branding");

  return (
    <div className="relative bg-background">
      <Navbar />

      {/* Hero */}
      <motion.section
        ref={heroRef}
        className="h-screen flex items-center justify-center relative overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <AdirePattern opacity={0.02} animate />

        <div className="text-center z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.5 }}
          >
            <TextReveal
              text="IVIE AIWUYO"
              as="h1"
              className="font-serif text-6xl md:text-[10rem] leading-[0.85] tracking-[-0.04em]"
            />
          </motion.div>

          <motion.div
            className="mt-8 space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-foreground/65">
              A Visual Storyteller
            </p>
            <p className="font-serif text-xl italic text-foreground/60 mt-4">
              &ldquo;Every story has a beginning...&rdquo;
            </p>
          </motion.div>

          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            <motion.div
              className="flex flex-col items-center gap-2 text-foreground/40"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="font-mono text-[9px] uppercase tracking-wider">
                Scroll to begin
              </span>
              <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
                <rect x="4" y="0" width="8" height="14" rx="4" stroke="currentColor" strokeWidth="1" />
                <motion.rect
                  x="7" y="3" width="2" height="4" rx="1"
                  fill="currentColor"
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: "#0A0A0A08" }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: "#0A0A0A08" }} />
      </motion.section>

      {/* Chapter I: ROOTS */}
      <Chapter number="I" title="ROOTS" subtitle="Chicago, Illinois" color="#0A0A0A">
        <div className="px-8 md:px-16 mb-16">
          <div className="max-w-2xl">
            <motion.p
              className="font-serif text-xl md:text-2xl leading-relaxed text-foreground/65"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Born and raised on the South Side of Chicago, Ivie grew up surrounded by the
              vibrant culture and resilient spirit of her community. Early exposure to the
              power of visual storytelling sparked a lifelong passion.
            </motion.p>
          </div>
        </div>

        {/* Animated journey SVG */}
        <motion.div
          className="mx-8 md:mx-16 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <svg
            viewBox="0 0 800 280"
            fill="none"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Animated arc path: Chicago → Hanover */}
            <motion.path
              d="M120 180 C 200 40, 350 40, 400 160"
              stroke="#0A0A0A"
              strokeWidth="1"
              strokeDasharray="4 6"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
            />

            {/* Animated arc path: Hanover → Lagos */}
            <motion.path
              d="M400 160 C 500 20, 600 60, 680 180"
              stroke="#0A0A0A"
              strokeWidth="1"
              strokeDasharray="4 6"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
            />

            {/* Traveling dot on first arc */}
            <motion.circle
              r="3"
              fill="#0A0A0A"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: [0, 1, 1, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
            >
              <animateMotion
                dur="1.5s"
                begin="0.3s"
                fill="freeze"
                path="M120 180 C 200 40, 350 40, 400 160"
              />
            </motion.circle>

            {/* Traveling dot on second arc */}
            <motion.circle
              r="3"
              fill="#0A0A0A"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: [0, 1, 1, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
            >
              <animateMotion
                dur="1.5s"
                begin="1.2s"
                fill="freeze"
                path="M400 160 C 500 20, 600 60, 680 180"
              />
            </motion.circle>

            {/* Chicago dot */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 300 }}
            >
              <circle cx="120" cy="180" r="6" fill="#0A0A0A" />
              <motion.circle
                cx="120" cy="180" r="12"
                stroke="#0A0A0A" strokeWidth="1" fill="none"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: [0, 0.4, 0], scale: [0.5, 1.5, 2] }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatDelay: 1 }}
              />
              <text x="120" y="215" textAnchor="middle" className="fill-foreground/70" style={{ fontSize: "11px", fontFamily: "var(--font-mono)" }}>
                CHICAGO
              </text>
              <text x="120" y="230" textAnchor="middle" className="fill-foreground/40" style={{ fontSize: "9px", fontFamily: "var(--font-mono)" }}>
                Home
              </text>
            </motion.g>

            {/* Hanover dot */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.0, type: "spring", stiffness: 300 }}
            >
              <circle cx="400" cy="160" r="6" fill="#0A0A0A" />
              <motion.circle
                cx="400" cy="160" r="12"
                stroke="#0A0A0A" strokeWidth="1" fill="none"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: [0, 0.4, 0], scale: [0.5, 1.5, 2] }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 1 }}
              />
              <text x="400" y="195" textAnchor="middle" className="fill-foreground/70" style={{ fontSize: "11px", fontFamily: "var(--font-mono)" }}>
                HANOVER, NH
              </text>
              <text x="400" y="210" textAnchor="middle" className="fill-foreground/40" style={{ fontSize: "9px", fontFamily: "var(--font-mono)" }}>
                Dartmouth
              </text>
            </motion.g>

            {/* Lagos dot */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 2.0, type: "spring", stiffness: 300 }}
            >
              <circle cx="680" cy="180" r="6" fill="#0A0A0A" />
              <motion.circle
                cx="680" cy="180" r="12"
                stroke="#0A0A0A" strokeWidth="1" fill="none"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: [0, 0.4, 0], scale: [0.5, 1.5, 2] }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 2.5, repeat: Infinity, repeatDelay: 1 }}
              />
              <text x="680" y="215" textAnchor="middle" className="fill-foreground/70" style={{ fontSize: "11px", fontFamily: "var(--font-mono)" }}>
                LAGOS
              </text>
              <text x="680" y="230" textAnchor="middle" className="fill-foreground/40" style={{ fontSize: "9px", fontFamily: "var(--font-mono)" }}>
                Heritage
              </text>
            </motion.g>

            {/* Decorative small dots along paths */}
            {[0.25, 0.5, 0.75].map((t, i) => (
              <motion.circle
                key={`dot-a-${i}`}
                r="1.5"
                fill="#0A0A0A"
                opacity="0.15"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.15 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.2 }}
                cx={120 + (400 - 120) * t}
                cy={180 + (160 - 180) * t - Math.sin(t * Math.PI) * 100}
              />
            ))}
            {[0.25, 0.5, 0.75].map((t, i) => (
              <motion.circle
                key={`dot-b-${i}`}
                r="1.5"
                fill="#0A0A0A"
                opacity="0.15"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.15 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5 + i * 0.2 }}
                cx={400 + (680 - 400) * t}
                cy={160 + (180 - 160) * t - Math.sin(t * Math.PI) * 100}
              />
            ))}
          </svg>
        </motion.div>
      </Chapter>

      {/* Divider with Adire pattern */}
      <div className="py-8">
        <AdireBorder className="w-full h-6 opacity-8" />
      </div>

      {/* Chapter II: HERITAGE */}
      <Chapter number="II" title="HERITAGE" subtitle="Nigerian-American Identity" color="#0A0A0A">
        <div className="relative">
          <AdirePattern opacity={0.03} color="#0A0A0A" animate />

          <div className="px-8 md:px-16 mb-16 relative z-10">
            <motion.p
              className="font-serif text-xl md:text-2xl leading-relaxed text-foreground/55 max-w-2xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Recognizing the profound impact of television and film on shaping societal
              perspectives, Ivie developed a passionate interest in creating work that
              challenges stereotypes and promotes inclusivity.
            </motion.p>
          </div>

          {brandingProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              direction={i % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </Chapter>

      {/* Stats interlude */}
      <section className="py-24 bg-foreground/[0.015]">
        <div className="flex justify-center gap-16 md:gap-24 px-8">
          <StatCounter label="Films Created" value="9+" color="#0A0A0A" />
          <StatCounter label="Events Covered" value="20+" color="#0A0A0A" />
          <StatCounter label="Organizations" value="5+" color="#0A0A0A" />
          <StatCounter label="Years Active" value="3" color="#0A0A0A" />
        </div>
      </section>

      {/* Chapter III: CRAFT */}
      <Chapter number="III" title="CRAFT" subtitle="Dartmouth College" color="#0A0A0A">
        <div className="px-8 md:px-16 mb-16">
          <motion.p
            className="font-serif text-xl md:text-2xl leading-relaxed text-foreground/55 max-w-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            At Dartmouth, Ivie honed her skills across multiple disciplines — from
            documentary filmmaking to event photography to graphic design. Each medium
            became a new way to tell the stories that matter.
          </motion.p>
        </div>

        {/* Film projects */}
        <div className="mb-16">
          <div className="px-8 md:px-16 mb-8">
            <span className="font-mono text-[11px] tracking-wider uppercase" style={{ color: "#0A0A0A" }}>
              Film Works
            </span>
          </div>
          {filmProjects.slice(0, 3).map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              direction={i % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>

        {/* Photography projects */}
        <div className="mb-16">
          <div className="px-8 md:px-16 mb-8">
            <span className="font-mono text-[11px] tracking-wider uppercase" style={{ color: "#0A0A0A" }}>
              Photography
            </span>
          </div>
          {photoProjects.slice(0, 3).map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              direction={i % 2 === 0 ? "right" : "left"}
            />
          ))}
        </div>

        {/* Design projects */}
        <div>
          <div className="px-8 md:px-16 mb-8">
            <span className="font-mono text-[11px] tracking-wider uppercase" style={{ color: "#0A0A0A" }}>
              Design
            </span>
          </div>
          {designProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              direction={i % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </Chapter>

      {/* Chapter IV: HORIZON */}
      <Chapter number="IV" title="HORIZON" subtitle="What Comes Next" color="#0A0A0A">
        <div className="px-8 md:px-16 text-center max-w-3xl mx-auto">
          <motion.p
            className="font-serif text-2xl md:text-4xl leading-relaxed text-foreground/65"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            &ldquo;I want to create a world where every story is heard, every
            perspective valued, and every community represented on screen.&rdquo;
          </motion.p>

          <motion.div
            className="mt-16 inline-flex items-center gap-3 px-8 py-4 rounded-full font-mono text-sm"
            style={{ border: "1px solid #0A0A0A30", color: "#0A0A0A" }}
            data-cursor="link"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <span>Let&apos;s Collaborate</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.div>

          <motion.p
            className="mt-8 font-mono text-[11px] text-foreground/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            ivie.aiwuyo@dartmouth.edu
          </motion.p>
        </div>
      </Chapter>

      {/* Footer */}
      <footer className="py-12 px-8 md:px-16 border-t border-foreground/[0.04]">
        <div className="flex justify-between items-center">
          <span className="font-serif text-lg italic text-foreground/70">Ivie.</span>
          <span className="font-mono text-[10px] text-foreground/45">
            &copy; {new Date().getFullYear()} Ivie Aiwuyo
          </span>
        </div>
      </footer>

      {/* Chapter navigation dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {["I", "II", "III", "IV"].map((num, i) => (
          <motion.div
            key={num}
            className="w-1.5 h-1.5 rounded-full bg-foreground/35"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 + i * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
}
