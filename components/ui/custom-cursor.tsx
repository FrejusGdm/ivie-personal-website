"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

type CursorVariant = "default" | "text" | "image" | "video" | "link" | "drag";

const cursorConfig: Record<
  CursorVariant,
  { size: number; label?: string; dotColor?: string; ringColor?: string }
> = {
  default: { size: 8, dotColor: "#0A0A0A" },
  text: { size: 72, label: "Read", dotColor: "#0A0A0A", ringColor: "#0A0A0A" },
  image: { size: 72, label: "View", dotColor: "#0A0A0A", ringColor: "#0A0A0A" },
  video: { size: 72, label: "Play", dotColor: "#0A0A0A", ringColor: "#0A0A0A" },
  link: { size: 36, dotColor: "#0A0A0A", ringColor: "#0A0A0A" },
  drag: { size: 72, label: "Drag", dotColor: "#0A0A0A", ringColor: "#0A0A0A" },
};

export function CustomCursor() {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Tight dot
  const dotX = useSpring(cursorX, { damping: 40, stiffness: 400, mass: 0.2 });
  const dotY = useSpring(cursorY, { damping: 40, stiffness: 400, mass: 0.2 });

  // Loose ring
  const ringX = useSpring(cursorX, { damping: 20, stiffness: 180, mass: 0.5 });
  const ringY = useSpring(cursorY, { damping: 20, stiffness: 180, mass: 0.5 });

  const bindElements = useCallback(() => {
    document.querySelectorAll("[data-cursor]").forEach((el) => {
      const htmlEl = el as HTMLElement;
      if (htmlEl.dataset.cursorBound) return;
      htmlEl.dataset.cursorBound = "true";

      htmlEl.addEventListener("mouseenter", () => {
        setVariant((htmlEl.dataset.cursor as CursorVariant) || "link");
      });
      htmlEl.addEventListener("mouseleave", () => {
        setVariant("default");
      });
    });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && "ontouchstart" in window) {
      setIsTouch(true);
      return;
    }

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const leave = () => setIsVisible(false);
    const enter = () => setIsVisible(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    const observer = new MutationObserver(bindElements);
    observer.observe(document.body, { childList: true, subtree: true });
    bindElements();

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible, bindElements]);

  if (isTouch) return null;

  const config = cursorConfig[variant];
  const isExpanded = variant !== "default";

  return (
    <>
      {/* Inner dot — crisp, fast */}
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isExpanded ? config.size : 8,
          height: isExpanded ? config.size : 8,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div
          className="w-full h-full rounded-full flex items-center justify-center transition-colors duration-200"
          style={{
            backgroundColor: isExpanded ? `${config.dotColor}15` : config.dotColor,
            backdropFilter: isExpanded ? "blur(8px)" : undefined,
            border: isExpanded ? `1px solid ${config.dotColor}30` : undefined,
          }}
        >
          <AnimatePresence mode="wait">
            {config.label && (
              <motion.span
                key={config.label}
                initial={{ opacity: 0, scale: 0.7, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.7, filter: "blur(4px)" }}
                transition={{ duration: 0.2 }}
                className="font-mono text-[9px] font-medium uppercase tracking-[0.15em]"
                style={{ color: config.dotColor }}
              >
                {config.label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Outer ring — laggy, organic */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isExpanded ? config.size + 16 : 32,
          height: isExpanded ? config.size + 16 : 32,
          opacity: isVisible ? (isExpanded ? 0.4 : 0.15) : 0,
        }}
        transition={{ type: "spring", damping: 18, stiffness: 200 }}
      >
        <div
          className="w-full h-full rounded-full transition-colors duration-300"
          style={{
            border: `1px solid ${config.ringColor || config.dotColor}`,
          }}
        />
      </motion.div>
    </>
  );
}
