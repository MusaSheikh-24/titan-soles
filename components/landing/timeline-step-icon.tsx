"use client";

import type { LucideIcon } from "lucide-react";
import {
  MessageCircle,
  Search,
  Send,
  ShieldCheck,
  Package,
  Sparkles,
  GitCompare,
  Target,
  ShoppingBag,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const TIMELINE_ICON_MAP = {
  "message-circle": MessageCircle,
  search: Search,
  send: Send,
  "shield-check": ShieldCheck,
  package: Package,
  sparkles: Sparkles,
  "git-compare": GitCompare,
  target: Target,
  "shopping-bag": ShoppingBag,
} as const;

export type TimelineIconName = keyof typeof TIMELINE_ICON_MAP;

interface TimelineStepIconProps {
  step: number;
  icon: TimelineIconName;
  size?: number;
  decorative?: boolean;
  className?: string;
}

export function TimelineStepIcon({
  step,
  icon,
  size = 56,
  decorative = false,
  className,
}: TimelineStepIconProps) {
  const Icon = TIMELINE_ICON_MAP[icon] as LucideIcon;
  const scale = size / 56;
  const iconSize = 24 * scale;
  const badgeSize = 20 * scale;
  const badgeFontSize = 10 * scale;
  const badgeOffset = 6 * scale;
  const ringWidth = 2 * scale;

  const iconElement = (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-[18px] bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/25",
        className
      )}
      style={{ width: size, height: size }}
    >
      <Icon style={{ width: iconSize, height: iconSize }} strokeWidth={1.75} />
      <span
        className="absolute flex items-center justify-center rounded-full bg-dark font-bold text-white"
        style={{
          top: -badgeOffset,
          right: -badgeOffset,
          width: badgeSize,
          height: badgeSize,
          fontSize: badgeFontSize,
          boxShadow: `0 0 0 ${ringWidth}px #071426`,
        }}
      >
        {step}
      </span>
    </div>
  );

  if (decorative) return iconElement;

  return (
    <motion.div whileHover={{ scale: 1.05 }} className="relative z-10">
      {iconElement}
    </motion.div>
  );
}
