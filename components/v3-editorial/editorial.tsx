"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { projects, categories, type ProjectCategory } from "@/lib/projects";
import { TextReveal } from "@/components/ui/text-reveal";
import { AdireBorder } from "@/components/ui/adire-pattern";

function ProjectRow({
  project,
  index,
  onHover,
  onLeave,
}: {
  project: (typeof projects)[0];
  index: number;
  onHover: (project: (typeof projects)[0]) => void;
  onLeave: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group border-b border-foreground/[0.04] last:border-none"
      onMouseEnter={() => {
        setIsHovered(true);
        onHover(project);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onLeave();
      }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: index * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      data-cursor="image"
    >
      <div className="flex items-center gap-6 py-5 md:py-7 px-2 transition-all duration-500 group-hover:px-4">
        {/* Index */}
        <motion.span
          className="font-mono text-[10px] w-6 transition-colors duration-300"
          animate={{ color: isHovered ? project.color : "rgba(10,10,10,0.45)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>

        {/* Title — large serif */}
        <div className="flex-1 min-w-0">
          <motion.h3
            className="font-serif text-[1.6rem] md:text-[2.2rem] leading-[1] truncate transition-colors duration-300"
            animate={{ color: isHovered ? project.color : "var(--fg)" }}
          >
            {project.title}
          </motion.h3>
        </div>

        {/* Meta */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          <span className="font-mono text-[9px] tracking-wider uppercase text-foreground/50">
            {project.year}
          </span>
          {project.role && (
            <span className="font-mono text-[9px] tracking-wider uppercase text-foreground/40">
              {project.role}
            </span>
          )}
        </div>

        {/* Arrow */}
        <motion.div
          className="flex-shrink-0"
          animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0.35 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 13L13 3M13 3H5M13 3V11"
              stroke={isHovered ? project.color : "currentColor"}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function EditorialLayout() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">("all");
  const [hoveredProject, setHoveredProject] = useState<(typeof projects)[0] | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.96]);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* ===== LEFT PANEL — FIXED ===== */}
      <motion.aside
        className="md:fixed md:left-0 md:top-0 md:bottom-0 md:w-[40vw] lg:w-[36vw] flex flex-col justify-between p-8 md:p-10 lg:p-14 border-r border-foreground/[0.04] z-20"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Top: Name */}
        <div>
          <div className="mb-14">
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green" />
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-foreground/45">
                Portfolio
              </span>
            </motion.div>

            <TextReveal
              text="IVIE"
              as="h1"
              className="font-serif text-[5.5rem] md:text-[7rem] lg:text-[9rem] leading-[0.82] tracking-[-0.04em] font-light"
            />
          </div>

          {/* Tagline */}
          <motion.p
            className="font-serif text-lg italic text-foreground/55 mb-12 max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Filmmaker, photographer &amp; designer telling stories that
            challenge and include.
          </motion.p>

          {/* Category nav */}
          <nav className="space-y-1">
            {[{ key: "all" as const, label: "All Works", color: "var(--fg)" }, ...categories].map(
              (cat, i) => {
                const isActive =
                  activeCategory === (cat.key as string);
                const count =
                  cat.key === "all"
                    ? projects.length
                    : projects.filter((p) => p.category === cat.key).length;

                return (
                  <motion.button
                    key={cat.key}
                    className="flex items-center gap-3 py-2 w-full text-left group transition-all duration-300"
                    onClick={() => setActiveCategory(cat.key as ProjectCategory | "all")}
                    data-cursor="link"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 + i * 0.06 }}
                  >
                    {/* Active indicator */}
                    <motion.div
                      className="w-4 h-[1px]"
                      animate={{
                        width: isActive ? 24 : 12,
                        backgroundColor: isActive ? cat.color : "rgba(10,10,10,0.2)",
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    <span
                      className={`font-sans text-[13px] font-medium transition-all duration-300 ${
                        isActive
                          ? "text-foreground"
                          : "text-foreground/50 group-hover:text-foreground/75"
                      }`}
                    >
                      {cat.label}
                    </span>

                    <span className="font-mono text-[9px] text-foreground/40 ml-auto">
                      {count}
                    </span>
                  </motion.button>
                );
              }
            )}
          </nav>
        </div>

        {/* Bottom: Location + cultural accent */}
        <motion.div
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <AdireBorder className="w-full h-3 opacity-10" color="#0A0A0A" />
          <div className="flex items-center gap-2 text-foreground/45 font-mono text-[9px] tracking-[0.2em] uppercase">
            <span>Chicago</span>
            <span className="w-3 h-[1px] bg-foreground/10" />
            <span>Dartmouth</span>
            <span className="w-3 h-[1px] bg-foreground/10" />
            <span>Lagos</span>
          </div>
        </motion.div>
      </motion.aside>

      {/* ===== RIGHT PANEL — SCROLLING ===== */}
      <div className="md:ml-[40vw] lg:ml-[36vw] flex-1 relative">
        {/* Hero */}
        <motion.section
          ref={heroRef}
          className="h-[65vh] md:h-[85vh] relative overflow-hidden flex items-end"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          {/* Gradient atmosphere */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A]/[0.06] via-[#0A0A0A]/[0.03] to-[#0A0A0A]/[0.06]" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>

          {/* Portrait placeholder — editorial crop */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-green/8 to-gold/8 flex items-center justify-center">
              <span className="font-serif text-7xl md:text-8xl italic text-foreground/[0.06]">I</span>
            </div>
          </div>

          {/* Hero text */}
          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-foreground/50 block mb-3">
                Selected Works
              </span>
              <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.85] tracking-[-0.03em] font-light">
                Multi&shy;dimensional
              </h2>
              <p className="font-mono text-[10px] text-foreground/55 tracking-wider mt-4">
                2021 — PRESENT
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Marquee ticker */}
        <div className="overflow-hidden py-4 border-y border-foreground/[0.04]">
          <div className="marquee flex gap-10 whitespace-nowrap">
            {Array.from({ length: 3 }).map((_, ri) => (
              <span key={ri} className="flex gap-10">
                {projects.map((p) => (
                  <span
                    key={`${ri}-${p.id}`}
                    className="font-mono text-[9px] text-foreground/20 uppercase tracking-wider"
                  >
                    {p.title} ✦
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ===== PROJECT LIST — the star of V3 ===== */}
        <section className="py-8 md:py-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={i}
                onHover={setHoveredProject}
                onLeave={() => setHoveredProject(null)}
              />
            ))}
          </AnimatePresence>
        </section>

        {/* Footer */}
        <footer className="p-8 md:p-12 lg:p-16 border-t border-foreground/[0.04]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <p className="font-serif text-3xl md:text-4xl font-light leading-tight">
                Let&apos;s create<br />something together
              </p>
              <a
                href="mailto:ivie.aiwuyo@dartmouth.edu"
                className="inline-block mt-4 font-mono text-[11px] tracking-wider text-green link-reveal"
                data-cursor="link"
              >
                ivie.aiwuyo@dartmouth.edu
              </a>
            </div>
            <p className="font-mono text-[9px] text-foreground/40 tracking-wider uppercase">
              &copy; {new Date().getFullYear()} Ivie Aiwuyo
            </p>
          </div>
        </footer>
      </div>

      {/* ===== FLOATING PREVIEW IMAGE — follows cursor ===== */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            className="fixed pointer-events-none z-[50]"
            initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              left: mousePos.x + 24,
              top: mousePos.y - 140,
            }}
          >
            <div
              className="w-[320px] h-[220px] md:w-[400px] md:h-[280px] rounded-2xl overflow-hidden shadow-2xl relative"
              style={{
                boxShadow: `0 25px 50px -12px rgba(0,0,0,0.2)`,
              }}
            >
              {/* Real thumbnail image */}
              {hoveredProject.thumbnail.startsWith("http") ? (
                <img
                  src={hoveredProject.thumbnail}
                  alt={hoveredProject.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full"
                  style={{
                    background: `linear-gradient(145deg, ${hoveredProject.color}18, ${hoveredProject.color}45)`,
                  }}
                />
              )}
              {/* Overlay with project info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="font-mono text-[8px] text-white/50 uppercase tracking-wider">
                    {hoveredProject.category} / {hoveredProject.year}
                  </span>
                  <p className="font-serif text-white text-xl mt-1 leading-tight">
                    {hoveredProject.title}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
