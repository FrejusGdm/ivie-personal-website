"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HoverPreviewProps {
  title: string;
  subtitle?: string;
  previewImage: string;
  href: string;
  index: number;
  color?: string;
  onClick?: () => void;
}

export function HoverPreview({
  title,
  subtitle,
  previewImage,
  index,
  color = "var(--green)",
  onClick,
}: HoverPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={itemRef}
      className="relative border-b border-foreground/10 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      data-cursor="image"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between py-6 md:py-8 px-4 transition-colors duration-300 hover:bg-foreground/[0.02]">
        <div className="flex items-center gap-6">
          <span
            className="font-mono text-sm opacity-40 w-8"
            style={{ color: isHovered ? color : undefined }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className="font-serif text-2xl md:text-4xl transition-colors duration-300"
            style={{ color: isHovered ? color : undefined }}
          >
            {title}
          </h3>
        </div>
        {subtitle && (
          <span className="font-mono text-xs uppercase tracking-wider opacity-50 hidden md:block">
            {subtitle}
          </span>
        )}
        <motion.div
          className="w-5 h-5 flex items-center justify-center"
          animate={{ x: isHovered ? 5 : 0 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8H13M13 8L8 3M13 8L8 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      {/* Floating preview image */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="fixed pointer-events-none z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              left: mousePos.x + (itemRef.current?.getBoundingClientRect().left || 0),
              top: mousePos.y + (itemRef.current?.getBoundingClientRect().top || 0) - 150,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="w-[300px] h-[200px] md:w-[400px] md:h-[280px] rounded-lg overflow-hidden shadow-2xl"
              style={{ border: `2px solid ${color}20` }}
            >
              {/* Placeholder gradient when no real image */}
              <div
                className="w-full h-full flex items-center justify-center text-white font-serif text-lg"
                style={{
                  background: `linear-gradient(135deg, ${color}40, ${color}90)`,
                }}
              >
                {title}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
