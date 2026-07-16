"use client";

import { motion } from "motion/react";
import {
  TimelineStepIcon,
  type TimelineIconName,
} from "@/components/landing/timeline-step-icon";

interface DecorativeIcon {
  step: number;
  icon: TimelineIconName;
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  opacity: number;
  delay: number;
  duration: number;
  floatY: number;
}

const DECORATIVE_ICONS: DecorativeIcon[] = [
  {
    step: 1,
    icon: "message-circle",
    size: 72,
    top: "6%",
    left: "4%",
    opacity: 0.07,
    delay: 0,
    duration: 9,
    floatY: 10,
  },
  {
    step: 2,
    icon: "search",
    size: 96,
    top: "10%",
    right: "8%",
    opacity: 0.06,
    delay: 1.2,
    duration: 11,
    floatY: 14,
  },
  {
    step: 3,
    icon: "send",
    size: 80,
    top: "4%",
    left: "38%",
    opacity: 0.08,
    delay: 0.6,
    duration: 10,
    floatY: 12,
  },
  {
    step: 4,
    icon: "shield-check",
    size: 120,
    top: "28%",
    right: "22%",
    opacity: 0.05,
    delay: 2,
    duration: 12,
    floatY: 16,
  },
  {
    step: 5,
    icon: "package",
    size: 64,
    bottom: "12%",
    left: "12%",
    opacity: 0.07,
    delay: 1.8,
    duration: 8,
    floatY: 8,
  },
  {
    step: 3,
    icon: "send",
    size: 56,
    bottom: "18%",
    right: "6%",
    opacity: 0.06,
    delay: 3,
    duration: 10,
    floatY: 10,
  },
  {
    step: 1,
    icon: "message-circle",
    size: 140,
    top: "42%",
    left: "52%",
    opacity: 0.05,
    delay: 0.4,
    duration: 13,
    floatY: 18,
  },
];

export function PartnerTimelineDecor() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {DECORATIVE_ICONS.map((item, index) => (
        <motion.div
          key={`${item.step}-${item.icon}-${index}`}
          className="absolute blur-[2px]"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
          }}
          initial={{ opacity: 0 }}
          animate={{
            y: [0, -item.floatY, 0],
            opacity: [
              item.opacity * 0.7,
              item.opacity,
              item.opacity * 0.7,
            ],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 10px 40px rgba(37, 99, 235, 0.08)",
                "0 10px 50px rgba(37, 99, 235, 0.14)",
                "0 10px 40px rgba(37, 99, 235, 0.08)",
              ],
            }}
            transition={{
              duration: item.duration * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
            className="rounded-2xl"
          >
            <TimelineStepIcon
              decorative
              step={item.step}
              icon={item.icon}
              size={item.size}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
