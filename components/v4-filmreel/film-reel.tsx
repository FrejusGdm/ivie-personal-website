"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import { projects } from "@/lib/projects";
import { TextReveal } from "@/components/ui/text-reveal";
import { AdirePattern } from "@/components/ui/adire-pattern";

const scenes = [
  {
    id: "prologue",
    number: "00",
    title: "PROLOGUE",
    subtitle: "The Origin Story",
    description:
      "From the South Side of Chicago to Dartmouth College. A Nigerian-American creative finding her voice through the lens.",
    color: "#0A0A0A",
    bg: "from-[#0A0A0A]/5 via-[#F0F0F0]/30 to-transparent",
  },
  {
    id: "film",
    number: "01",
    title: "THE FILMMAKER",
    subtitle: "Moving Images",
    category: "film" as const,
    color: "#0A0A0A",
    bg: "from-[#0A0A0A]/5 to-transparent",
  },
  {
    id: "photography",
    number: "02",
    title: "THE PHOTOGRAPHER",
    subtitle: "Frozen Moments",
    category: "photography" as const,
    color: "#0A0A0A",
    bg: "from-[#0A0A0A]/5 to-transparent",
  },
  {
    id: "design",
    number: "03",
    title: "THE DESIGNER",
    subtitle: "Visual Systems",
    category: "design" as const,
    color: "#0A0A0A",
    bg: "from-[#0A0A0A]/5 to-transparent",
  },
  {
    id: "branding",
    number: "04",
    title: "THE STORYTELLER",
    subtitle: "Brand Narratives",
    category: "branding" as const,
    color: "#0A0A0A",
    bg: "from-[#0A0A0A]/5 to-transparent",
  },
  {
    id: "epilogue",
    number: "05",
    title: "EPILOGUE",
    subtitle: "What Comes Next",
    description:
      "Creating films that challenge stereotypes and promote inclusivity. The story continues.",
    color: "#0A0A0A",
    bg: "from-[#0A0A0A]/5 via-[#F0F0F0]/20 to-transparent",
  },
];

function FilmSprocketHoles({ side }: { side: "top" | "bottom" }) {
  return (
    <div
      className={`fixed ${side === "top" ? "top-0" : "bottom-0"} left-0 right-0 h-8 z-[60] flex items-center justify-start gap-[60px] px-8 overflow-hidden pointer-events-none`}
    >
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="w-4 h-4 rounded-[3px] border-[1.5px] border-foreground/8 bg-foreground/[0.015] flex-shrink-0"
        />
      ))}
    </div>
  );
}

function SceneCard({
  scene,
  sceneProjects,
}: {
  scene: (typeof scenes)[0];
  sceneProjects: typeof projects;
}) {
  return (
    <div
      className={`w-screen h-screen flex-shrink-0 flex items-center relative bg-gradient-to-r ${scene.bg}`}
    >
      {/* Scene number */}
      <div className="absolute top-16 left-12 z-10">
        <span
          className="font-mono text-[10px] tracking-[0.5em] uppercase"
          style={{ color: scene.color }}
        >
          Scene {scene.number}
        </span>
      </div>

      <div className="flex items-center w-full h-full px-12 md:px-24 gap-16">
        {/* Left: Scene info */}
        <div className="w-1/3 flex-shrink-0">
          <motion.h2
            className="font-serif text-5xl md:text-7xl leading-[0.88] mb-4 tracking-[-0.03em]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {scene.title}
          </motion.h2>
          <motion.p
            className="font-mono text-[11px] tracking-wider uppercase mb-6"
            style={{ color: scene.color }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {scene.subtitle}
          </motion.p>
          {scene.description && (
            <motion.p
              className="text-sm text-foreground/65 leading-relaxed max-w-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {scene.description}
            </motion.p>
          )}
        </div>

        {/* Right: Projects */}
        {sceneProjects.length > 0 && (
          <div className="flex-1 flex gap-6 overflow-visible">
            {sceneProjects.map((project, i) => (
              <motion.div
                key={project.id}
                className="w-[280px] flex-shrink-0 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                data-cursor="image"
              >
                <div
                  className="aspect-[3/4] rounded-xl overflow-hidden mb-4 transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-1 relative"
                  style={{
                    background: project.thumbnail.startsWith("http") ? "#0A0A0A" : `linear-gradient(135deg, ${project.color}15, ${project.color}45)`,
                    boxShadow: `0 8px 30px rgba(0,0,0,0.08)`,
                  }}
                >
                  {project.thumbnail.startsWith("http") && (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
                    <div>
                      <span className="font-mono text-[9px] text-white/50 uppercase tracking-wider">
                        {project.year}
                      </span>
                      <p className="font-serif text-white text-lg mt-1 leading-tight">
                        {project.title}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        color: project.color,
                        backgroundColor: `${project.color}10`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Prologue/Epilogue: large visual */}
        {!scene.category && (
          <div className="flex-1 flex items-center justify-center">
            <div
              className="w-64 h-64 rounded-full opacity-8"
              style={{
                background: `radial-gradient(circle, ${scene.color}15, transparent)`,
              }}
            />
          </div>
        )}
      </div>

      {/* Scene divider line */}
      <div
        className="absolute right-0 top-1/4 bottom-1/4 w-[1px]"
        style={{ backgroundColor: `${scene.color}12` }}
      />
    </div>
  );
}

export function FilmReel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sceneCountRef = useRef<HTMLSpanElement>(null);
  const currentScene = useRef(0);

  useGSAP(
    () => {
      if (!scrollContainerRef.current || !containerRef.current) return;

      const panels = gsap.utils.toArray<HTMLElement>(
        scrollContainerRef.current.children
      );
      const totalWidth = panels.length * window.innerWidth;

      gsap.to(scrollContainerRef.current, {
        x: -(totalWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${totalWidth}`,
          onUpdate: (self) => {
            const newScene = Math.floor(self.progress * panels.length);
            if (newScene !== currentScene.current && sceneCountRef.current) {
              currentScene.current = Math.min(newScene, panels.length - 1);
              sceneCountRef.current.textContent = String(
                currentScene.current + 1
              ).padStart(2, "0");
            }
          },
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div className="relative">
      {/* Film sprocket holes */}
      <FilmSprocketHoles side="top" />
      <FilmSprocketHoles side="bottom" />

      {/* Film grain overlay */}
      <div className="film-grain" />

      {/* Scene counter */}
      <motion.div
        className="fixed top-16 right-12 z-[70] font-mono text-xs tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span ref={sceneCountRef} className="text-foreground">
          01
        </span>
        <span className="text-foreground/50"> / {String(scenes.length).padStart(2, "0")}</span>
      </motion.div>

      {/* Nav dots */}
      <motion.div
        className="fixed right-6 top-1/2 -translate-y-1/2 z-[70] flex flex-col gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {scenes.map((scene) => (
          <div
            key={scene.id}
            className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
            style={{
              backgroundColor: scene.color,
              opacity: 0.25,
            }}
          />
        ))}
      </motion.div>

      {/* Horizontal scroll container */}
      <div ref={containerRef} className="h-screen overflow-hidden">
        <div ref={scrollContainerRef} className="flex h-full">
          {scenes.map((scene) => {
            const sceneProjects = scene.category
              ? projects.filter((p) => p.category === scene.category)
              : [];
            return (
              <SceneCard
                key={scene.id}
                scene={scene}
                sceneProjects={sceneProjects}
              />
            );
          })}
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="fixed bottom-16 left-1/2 -translate-x-1/2 z-[70]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-foreground/45"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="font-mono text-[9px] uppercase tracking-wider">
            Scroll to scrub through the reel
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2V14M8 14L3 9M8 14L13 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
