"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function MotionShell({
  children,
  enabled = true,
}: {
  children: ReactNode;
  enabled?: boolean;
}) {
  return <MotionShellBase enabled={enabled}>{children}</MotionShellBase>;
}

function MotionShellBase({
  children,
  enabled = true,
}: {
  children: ReactNode;
  enabled?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion || !enabled ? false : { opacity: 0, y: 14 }}
      animate={shouldReduceMotion || !enabled ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function MotionStack({
  children,
  delay = 0,
  enabled = true,
}: {
  children: ReactNode;
  delay?: number;
  enabled?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion || !enabled ? false : "hidden"}
      animate={shouldReduceMotion || !enabled ? undefined : "show"}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.07,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({
  children,
  className,
  delay = 0,
  enabled = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  enabled?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 18, scale: 0.985 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay },
        },
      }}
      initial={shouldReduceMotion || !enabled ? false : "hidden"}
      animate={shouldReduceMotion || !enabled ? undefined : "show"}
    >
      {children}
    </motion.div>
  );
}

export function FloatingOrbs({ enabled = true }: { enabled?: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const active = enabled && !shouldReduceMotion;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -right-12 top-6 h-40 w-40 rounded-full bg-black/[0.05] blur-3xl"
        animate={active ? { y: [0, 10, 0], x: [0, -8, 0] } : undefined}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-0 top-28 h-56 w-56 rounded-full bg-white/60 blur-3xl"
        animate={active ? { y: [0, -12, 0], x: [0, 8, 0] } : undefined}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/3 h-32 w-32 rounded-full bg-black/[0.04] blur-3xl"
        animate={active ? { y: [0, 8, 0], x: [0, 10, 0] } : undefined}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
