"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "@/lib/projects";
import { TextReveal } from "@/components/ui/text-reveal";

// Film grain overlay component
function FilmGrain() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.08] mix-blend-screen">
      <div 
        className="w-[200vw] h-[200vh] absolute -top-[50%] -left-[50%]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          animation: "noiseAnimation 0.2s infinite steps(2)",
        }}
      />
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes noiseAnimation {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
          100% { transform: translate(0, 0); }
        }
      `}} />
    </div>
  );
}

// Cinematic UI overlay (REC, Timecode, Grid lines)
function CinematicUI({ timecode }: { timecode: string }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 text-foreground/70 mix-blend-difference">
      {/* REC indicator */}
      <div className="absolute top-6 md:top-12 left-6 md:left-12 flex items-center gap-2">
        <motion.div 
          className="w-3 h-3 rounded-full bg-red-600"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <span className="font-mono text-xs tracking-widest text-red-600">REC</span>
      </div>

      {/* Frame markers */}
      <div className="absolute top-6 md:top-12 right-6 md:right-12">
        <span className="font-mono text-xs tracking-widest opacity-60">24fps</span>
      </div>

      <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12">
        <span className="font-mono text-xs tracking-widest opacity-60">
          ISO 800 // F2.8
        </span>
      </div>

      {/* Running timecode */}
      <div className="absolute bottom-6 md:bottom-12 right-6 md:right-12">
        <span className="font-mono text-xs md:text-sm tracking-widest bg-black/80 text-white px-2 py-1 rounded">
          {timecode}
        </span>
      </div>

      {/* Center crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 opacity-20">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-current -translate-y-1/2" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-current -translate-x-1/2" />
      </div>

      {/* Safe area guides */}
      <div className="absolute inset-x-12 inset-y-12 border border-current opacity-10" />
      <div className="absolute inset-x-24 inset-y-24 border border-current border-dashed opacity-10" />
    </div>
  );
}

// Storyboard Frame (Project Card)
function StoryboardFrame({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <div className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] h-full flex flex-col justify-center px-4 md:px-8">
      {/* Frame metadata */}
      <div className="flex justify-between items-end mb-4 border-b border-foreground/20 pb-2">
        <span className="font-mono text-[10px] tracking-widest uppercase opacity-60">
          SCENE {String(index + 1).padStart(2, '0')}
        </span>
        <span className="font-serif italic text-sm opacity-80">
          Dir. Notes: "{project.category}"
        </span>
      </div>

      {/* Focus Brackets and Image */}
      <div className="relative group" data-cursor="image">
        {/* Focus Brackets */}
        <div className="absolute -inset-4 border-2 border-foreground/0 group-hover:border-foreground/20 transition-colors duration-500 z-10 pointer-events-none flex justify-between flex-col">
          <div className="flex justify-between w-full h-4">
            <div className="w-4 h-full border-t-2 border-l-2 border-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-4 h-full border-t-2 border-r-2 border-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="flex justify-between w-full h-4 mt-auto">
            <div className="w-4 h-full border-b-2 border-l-2 border-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-4 h-full border-b-2 border-r-2 border-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        {/* Cinematic Letterbox Aspect Ratio (2.35:1) */}
        <div className="relative w-full aspect-[2.35/1] bg-black overflow-hidden shadow-2xl">
          {project.thumbnail.startsWith("http") ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
          ) : (
            <div
              className="w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              style={{
                background: `linear-gradient(135deg, ${project.color}15, ${project.color}45)`,
              }}
            />
          )}
          
          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
        </div>
      </div>

      {/* Handwritten Description */}
      <div className="mt-6 flex flex-col md:flex-row gap-4 justify-between items-start">
        <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-none uppercase tracking-tighter">
          {project.title}
        </h3>
        <p className="font-serif italic text-foreground/60 text-sm md:text-base max-w-sm">
          {project.description}
        </p>
      </div>
    </div>
  );
}

export function StoryboardLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [timecode, setTimecode] = useState("00:00:00:00");

  useGSAP(() => {
    // Make sure plugins are registered
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !scrollRef.current) return;

    // The total width of the horizontal scrolling section
    const totalWidth = scrollRef.current.scrollWidth - window.innerWidth;

    // Horizontal Scroll Animation
    gsap.to(scrollRef.current, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        // Make the scroll length proportional to the width
        end: () => `+=${totalWidth}`,
        onUpdate: (self) => {
          // Calculate running timecode based on scroll progress
          const totalFrames = 24 * 60 * 5; // e.g., 5 minutes of footage
          const currentFrame = Math.floor(self.progress * totalFrames);
          
          const frames = (currentFrame % 24).toString().padStart(2, '0');
          const seconds = (Math.floor(currentFrame / 24) % 60).toString().padStart(2, '0');
          const minutes = (Math.floor(currentFrame / (24 * 60)) % 60).toString().padStart(2, '0');
          const hours = Math.floor(currentFrame / (24 * 60 * 60)).toString().padStart(2, '0');
          
          setTimecode(`${hours}:${minutes}:${seconds}:${frames}`);
        }
      },
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, { scope: containerRef });

  return (
    <div className="bg-[#0f0f0f] text-[#f2f2f2] min-h-screen selection:bg-red-600 selection:text-white font-sans">
      <FilmGrain />
      <CinematicUI timecode={timecode} />

      {/* Main pinned container */}
      <div ref={containerRef} className="h-screen w-full overflow-hidden flex items-center">
        
        {/* Horizontal scroll track */}
        <div ref={scrollRef} className="flex h-full items-center px-[10vw]">
          
          {/* Title Scene */}
          <div className="flex-shrink-0 w-[80vw] flex flex-col justify-center pr-20">
            <TextReveal 
              text="THE" 
              as="span" 
              className="font-mono text-sm tracking-[0.5em] text-red-600 mb-4" 
            />
            <TextReveal 
              text="STORYBOARD" 
              as="h1" 
              className="font-serif text-7xl md:text-[120px] leading-[0.8] tracking-[-0.04em] uppercase" 
            />
            <motion.p 
              className="mt-8 font-serif italic text-xl md:text-2xl text-white/50 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
            >
              "Every frame is a deliberate choice. A moment frozen in time to tell a story bigger than itself."
            </motion.p>
          </div>

          {/* Project Frames */}
          {projects.map((project, idx) => (
            <StoryboardFrame key={project.id} project={project} index={idx} />
          ))}

          {/* End Scene */}
          <div className="flex-shrink-0 w-[100vw] flex flex-col justify-center items-center">
            <div className="w-[200px] h-[200px] rounded-full bg-black border border-white/10 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
              <span className="font-serif text-3xl italic">Cut.</span>
            </div>
            <p className="mt-8 font-mono text-xs tracking-widest uppercase opacity-50">
              End of Reel
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}