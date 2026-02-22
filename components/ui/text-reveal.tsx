"use client";

import { motion } from "framer-motion";
import { letterReveal } from "@/lib/framer-variants";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
}

export function TextReveal({ text, className = "", as: Tag = "h1", delay = 0 }: TextRevealProps) {
  const words = text.split(" ");

  return (
    <Tag className={`overflow-hidden ${className}`}>
      <motion.span
        initial="hidden"
        animate="visible"
        className="inline-flex flex-wrap"
      >
        {words.map((word, wi) => (
          <span key={wi} className="inline-flex overflow-hidden mr-[0.3em]">
            {word.split("").map((char, ci) => (
              <motion.span
                key={ci}
                custom={wi * 4 + ci + delay * 10}
                variants={letterReveal}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

export function TextRevealOnScroll({ text, className = "", as: Tag = "h2" }: TextRevealProps) {
  const words = text.split(" ");

  return (
    <Tag className={`overflow-hidden ${className}`}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="inline-flex flex-wrap"
      >
        {words.map((word, wi) => (
          <span key={wi} className="inline-flex overflow-hidden mr-[0.3em]">
            {word.split("").map((char, ci) => (
              <motion.span
                key={ci}
                custom={wi * 4 + ci}
                variants={letterReveal}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
