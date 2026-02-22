"use client";

import { motion } from "framer-motion";

interface AdirePatternProps {
  className?: string;
  opacity?: number;
  color?: string;
  animate?: boolean;
}

export function AdirePattern({
  className = "",
  opacity = 0.04,
  color = "#0A0A0A",
  animate = false,
}: AdirePatternProps) {
  const patternSvg = `
    <svg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
      <g fill='none' stroke='${color}' stroke-width='0.4'>
        <path d='M50 5 L95 50 L50 95 L5 50 Z'/>
        <path d='M50 20 L80 50 L50 80 L20 50 Z'/>
        <path d='M50 35 L65 50 L50 65 L35 50 Z'/>
        <line x1='50' y1='0' x2='50' y2='100'/>
        <line x1='0' y1='50' x2='100' y2='50'/>
        <circle cx='50' cy='50' r='2' fill='${color}' opacity='0.3'/>
        <circle cx='5' cy='5' r='1' fill='${color}' opacity='0.2'/>
        <circle cx='95' cy='5' r='1' fill='${color}' opacity='0.2'/>
        <circle cx='5' cy='95' r='1' fill='${color}' opacity='0.2'/>
        <circle cx='95' cy='95' r='1' fill='${color}' opacity='0.2'/>
      </g>
    </svg>
  `;

  const encodedSvg = `data:image/svg+xml,${encodeURIComponent(patternSvg.trim())}`;
  const style = {
    backgroundImage: `url("${encodedSvg}")`,
    backgroundRepeat: "repeat" as const,
    backgroundSize: "100px 100px",
    opacity,
  };

  if (animate) {
    return (
      <motion.div
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={style}
        initial={{ opacity: 0 }}
        animate={{ opacity }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      />
    );
  }

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={style}
    />
  );
}

export function AdireBorder({
  className = "",
  color = "#0A0A0A",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 800 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      {Array.from({ length: 50 }).map((_, i) => (
        <path
          key={i}
          d={`M${i * 16} 8 L${i * 16 + 8} 0 L${i * 16 + 16} 8 L${i * 16 + 8} 16 Z`}
          stroke={color}
          strokeWidth="0.4"
          fill="none"
          opacity="0.25"
        />
      ))}
    </svg>
  );
}
