"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects, categories } from "@/lib/projects";
import { TextReveal, TextRevealOnScroll } from "@/components/ui/text-reveal";

// A subtle paper texture overlay
function PaperTexture() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-multiply">
      <svg className="h-full w-full">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}

// Table of Contents Item
function TOCItem({ title, page, color }: { title: string; page: string; color?: string }) {
  return (
    <div className="group flex w-full items-baseline gap-2 py-1" data-cursor="link">
      <span className="font-serif text-xl md:text-2xl transition-colors duration-300 group-hover:text-foreground">
        {title}
      </span>
      <div className="flex-1 border-b border-dotted border-foreground/30 opacity-50 group-hover:border-foreground/60 transition-opacity duration-300" />
      <span className="font-mono text-sm tracking-widest text-foreground/60 group-hover:text-foreground transition-colors duration-300">
        {page}
      </span>
    </div>
  );
}

// Asymmetrical Project Grid Item
function ProjectGridItem({
  project,
  index,
  className = "",
}: {
  project: (typeof projects)[0];
  index: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`group relative flex flex-col gap-3 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div className="overflow-hidden bg-foreground/5 relative" data-cursor="image">
        {project.thumbnail.startsWith("http") ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              aspectRatio: index % 3 === 0 ? "3/4" : index % 2 === 0 ? "4/3" : "1/1",
            }}
          />
        ) : (
          <div
            className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${project.color}15, ${project.color}45)`,
              aspectRatio: index % 3 === 0 ? "3/4" : index % 2 === 0 ? "4/3" : "1/1",
            }}
          />
        )}
      </div>
      <div>
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/40 mb-1">
          {project.category} // {project.year}
        </p>
        <h3 className="font-serif text-xl md:text-2xl leading-tight text-foreground/90 group-hover:text-foreground transition-colors">
          {project.title}
        </h3>
      </div>
    </motion.div>
  );
}

export function EditorialLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Use a subset of projects for the masonry grid to make it look curated
  const featuredProjects = projects.slice(0, 7);

  return (
    <div ref={containerRef} className="relative bg-[#faf9f6] text-[#1a1a1a] min-h-screen selection:bg-black selection:text-[#faf9f6]">
      <PaperTexture />
      
      {/* ─── HERO: MAGAZINE COVER ────────────────────────────────────────── */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col justify-between p-6 md:p-12">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {projects[0]?.thumbnail.startsWith("http") ? (
            <img
              src={projects[0].thumbnail}
              alt="Cover Image"
              className="w-full h-full object-cover object-center opacity-80"
            />
          ) : (
            <div className="w-full h-full bg-foreground/10" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f6]/20 via-transparent to-[#faf9f6]" />
        </motion.div>

        {/* Masthead */}
        <div className="relative z-10 flex justify-between items-start w-full">
          <div className="flex flex-col">
            <span className="font-mono text-xs uppercase tracking-[0.3em] font-semibold">Issue N° 01</span>
            <span className="font-mono text-[9px] uppercase tracking-widest opacity-60 mt-1">Feb 2026</span>
          </div>
          <div className="text-right">
            <span className="font-mono text-xs uppercase tracking-[0.3em] font-semibold">Ivie Aiwuyo</span>
            <span className="font-mono text-[9px] uppercase tracking-widest opacity-60 mt-1 block">Dartmouth College</span>
          </div>
        </div>

        {/* Title */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center -mt-16">
          <TextReveal
            text="THE"
            as="span"
            className="font-mono text-sm tracking-[0.5em] uppercase mb-4 opacity-70"
          />
          <TextReveal
            text="PORTFOLIO"
            as="h1"
            className="font-serif text-[12vw] leading-[0.8] tracking-[-0.04em] uppercase"
          />
          <TextReveal
            text="EDITION"
            as="span"
            className="font-serif text-[4vw] italic leading-none opacity-80 mt-2"
          />
        </div>

        {/* Footer info of Cover */}
        <div className="relative z-10 flex justify-between items-end w-full">
          <div className="max-w-[200px]">
            <p className="font-serif text-sm italic opacity-80">
              A collection of visual stories exploring culture, identity, and the spaces between.
            </p>
          </div>
          <div className="flex gap-4">
            <span className="font-mono text-[10px] uppercase tracking-wider">Film</span>
            <span className="font-mono text-[10px] uppercase tracking-wider">Photo</span>
            <span className="font-mono text-[10px] uppercase tracking-wider">Design</span>
          </div>
        </div>
      </section>

      {/* ─── INTRODUCTION & TABLE OF CONTENTS ───────────────────────────── */}
      <section className="relative px-6 py-24 md:px-12 md:py-32 lg:px-24 max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32">
        {/* Intro Text */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase opacity-50 mb-8 block">
              Editor's Note
            </span>
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.4] text-foreground/80">
              <span className="float-left text-7xl md:text-8xl lg:text-[140px] leading-[0.7] mr-4 md:mr-6 font-serif opacity-90">
                I
              </span>
              believe in the power of visual media to transcend boundaries. Growing up surrounded by vibrant cultures across Chicago, Dartmouth, and Lagos, every frame I capture is a testament to the stories that shape us.
            </p>
          </motion.div>

          <motion.div
            className="mt-16 pl-0 md:pl-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <p className="font-serif text-3xl md:text-4xl italic text-foreground/40 border-l-2 border-foreground/20 pl-6 py-2">
              "We tell the stories we need to see."
            </p>
          </motion.div>
        </div>

        {/* TOC */}
        <motion.div 
          className="lg:w-1/2 flex flex-col justify-center"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase opacity-50 mb-8 block">
            Contents
          </span>
          <div className="flex flex-col gap-4">
            <TOCItem title="The Roots: Documentary" page="04" />
            <TOCItem title="Cultural Heritage: Branding" page="12" />
            <TOCItem title="Action & Stillness: Photography" page="28" />
            <TOCItem title="Institutional Identity: Design" page="45" />
            <TOCItem title="Epilogue: Contact" page="60" />
          </div>
        </motion.div>
      </section>

      {/* ─── ASYMMETRICAL GRID SHOWCASE ─────────────────────────────────── */}
      <section className="relative px-6 pb-24 md:px-12 md:pb-32 lg:px-24 max-w-screen-2xl mx-auto">
        <TextRevealOnScroll 
          text="Selected Works" 
          as="h2" 
          className="font-serif text-5xl md:text-7xl mb-16 lg:mb-24 uppercase tracking-tighter" 
        />

        {/* CSS Grid for asymmetrical layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16">
          {/* Item 1 - Large, spans 8 cols */}
          {featuredProjects[0] && (
            <ProjectGridItem 
              project={featuredProjects[0]} 
              index={0} 
              className="md:col-span-8" 
            />
          )}

          {/* Item 2 - Smaller, spans 4 cols */}
          {featuredProjects[1] && (
            <ProjectGridItem 
              project={featuredProjects[1]} 
              index={1} 
              className="md:col-span-4 md:mt-32" 
            />
          )}

          {/* Item 3 - Spans 6 cols, centeredish */}
          {featuredProjects[2] && (
            <ProjectGridItem 
              project={featuredProjects[2]} 
              index={2} 
              className="md:col-span-6 md:col-start-4 lg:mt-16" 
            />
          )}

          {/* Item 4 & 5 - Half and Half */}
          {featuredProjects[3] && (
            <ProjectGridItem 
              project={featuredProjects[3]} 
              index={3} 
              className="md:col-span-5 lg:mt-24" 
            />
          )}
          {featuredProjects[4] && (
            <ProjectGridItem 
              project={featuredProjects[4]} 
              index={4} 
              className="md:col-span-5 md:col-start-8" 
            />
          )}

          {/* Pull Quote Interruption */}
          <motion.div 
            className="md:col-span-12 py-16 lg:py-32 flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="font-serif text-4xl md:text-5xl lg:text-7xl text-center leading-[1.1] max-w-4xl opacity-80 italic">
              A careful curation of light, space, and the human element.
            </p>
          </motion.div>

          {/* Item 6 & 7 - Full width span and offset */}
          {featuredProjects[5] && (
            <ProjectGridItem 
              project={featuredProjects[5]} 
              index={5} 
              className="md:col-span-7" 
            />
          )}
          {featuredProjects[6] && (
            <ProjectGridItem 
              project={featuredProjects[6]} 
              index={6} 
              className="md:col-span-4 md:col-start-9 md:mt-48" 
            />
          )}
        </div>
      </section>

      {/* ─── FOOTER (BACK COVER) ────────────────────────────────────────── */}
      <footer className="relative bg-[#1a1a1a] text-[#faf9f6] py-16 px-6 md:px-12 lg:px-24 flex flex-col items-center text-center">
        <TextRevealOnScroll 
          text="FIN" 
          as="h2" 
          className="font-serif text-8xl md:text-[150px] leading-none mb-8 opacity-90" 
        />
        <div className="flex flex-col md:flex-row justify-between w-full max-w-screen-2xl border-t border-[#faf9f6]/20 pt-8 mt-16 gap-8">
          <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">
            &copy; {new Date().getFullYear()} Ivie Aiwuyo. All rights reserved.
          </p>
          <a href="mailto:ivie.aiwuyo@dartmouth.edu" className="font-mono text-[10px] uppercase tracking-widest hover:opacity-100 opacity-60 transition-opacity">
            ivie.aiwuyo@dartmouth.edu
          </a>
        </div>
      </footer>
    </div>
  );
}
