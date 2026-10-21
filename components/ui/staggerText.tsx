'use client'
import React from "react";
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const;

const container = (stagger: number, delay: number) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

// Starts below the mask, which is padded past the line box (see below).
const item = {
  hidden: { y: "130%" },
  show: {
    y: "0%",
    transition: { duration: 0.6, ease: EASE },
  },
};

const TextAnimation = ({
  children,
  delay = 0,
  divideBy = "word",
}: {
  children: React.ReactNode;
  delay?: number;
  divideBy?: "word" | "letter";
}) => {
  const reduce = useReducedMotion();
  if (typeof children !== "string") {
    if (typeof children === "number" || typeof children === "boolean") {
      children = String(children);
    } else {
      console.warn("TextAnimation only supports plain text/string children.");
      return <>{children}</>;
    }
  }

  const text = children as string;
  if (reduce) return <>{text}</>;
  const parts =
    divideBy === "letter" ? text.split("") : text.split(" ");
  const stagger = divideBy === "letter" ? 0.02 : 0.05;

  return (
    <motion.span
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      style={{ display: "inline-block" }}
    >
      {parts.map((part, i) => (
        <span
          key={i}
          // The padding gives descenders (g, y, p) room inside the mask on
          // tight display leading; the negative margin keeps the layout.
          className="relative -mb-[0.15em] inline-block overflow-hidden pb-[0.15em]"
          style={{ verticalAlign: "top" }}
        >
          <motion.span
            variants={item}
            className="inline-block will-change-transform"
          >
            {divideBy === "letter"
              ? part === " "
                ? "\u00A0"
                : part
              : part + "\u00A0"}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default TextAnimation;
