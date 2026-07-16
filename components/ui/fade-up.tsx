"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

interface FadeUpProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  blur?: boolean;
}

export function FadeUp({
  children,
  className,
  delay = 0,
  duration = 0.6,
  blur = false,
  ...props
}: FadeUpProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 32,
        filter: blur ? "blur(8px)" : "blur(0px)",
      }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : {
              opacity: 0,
              y: 32,
              filter: blur ? "blur(8px)" : "blur(0px)",
            }
      }
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
