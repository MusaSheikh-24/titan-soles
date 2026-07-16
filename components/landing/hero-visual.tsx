"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Sparkles, Shield, Star, Zap, BadgeCheck } from "lucide-react";

const floatingCards = [
  { icon: Sparkles, label: "AI Match", value: "98%", position: "top-6 left-0", delay: 0 },
  { icon: Shield, label: "Verified", value: "Nike Official", position: "top-1/4 -right-2", delay: 0.15 },
  { icon: Star, label: "Rating", value: "4.9", position: "bottom-1/3 left-0", delay: 0.3 },
  { icon: BadgeCheck, label: "Quality", value: "Checked", position: "bottom-16 right-2", delay: 0.45 },
];

const particles = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${12 + (i * 6) % 76}%`,
  top: `${8 + (i * 9) % 84}%`,
  size: 2 + (i % 3),
  delay: i * 0.35,
}));

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const rotateX = useTransform(sy, [-40, 40], [6, -6]);
  const rotateY = useTransform(sx, [-40, 40], [-8, 8]);

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 80);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 80);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative mx-auto aspect-square w-full max-w-md"
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.28),transparent_65%)] animate-pulse-glow" />

      {/* AI rings */}
      <div className="absolute inset-4 rounded-full border border-primary/25 animate-ring-spin" />
      <div className="absolute inset-10 rounded-full border border-dashed border-accent/20 animate-ring-spin-reverse" />
      <div className="absolute inset-16 rounded-full border border-white/5" />

      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-particle rounded-full bg-accent/50"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {floatingCards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + card.delay }}
            className={`absolute z-20 ${card.position}`}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4 + card.delay, repeat: Infinity, ease: "easeInOut" }}
              className="glass flex items-center gap-2.5 rounded-lg px-3 py-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-primary/30 to-accent/20">
                <Icon className="h-3.5 w-3.5 text-accent" />
              </div>
              <div>
                <p className="text-[9px] font-medium uppercase tracking-wider text-slate-500">
                  {card.label}
                </p>
                <p className="text-xs font-semibold text-white">{card.value}</p>
              </div>
            </motion.div>
          </motion.div>
        );
      })}

      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className="relative z-10 animate-float"
      >
        <div className="relative mx-auto h-72 w-72 lg:h-80 lg:w-80">
          {/* Scan line */}
          <div className="pointer-events-none absolute inset-x-8 z-20 h-0.5 bg-linear-to-r from-transparent via-accent to-transparent animate-scan shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
          <Image
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=90"
            alt="Premium Nike sneaker"
            fill
            className="object-contain drop-shadow-[0_28px_50px_rgba(37,99,235,0.4)]"
            priority
            sizes="320px"
          />
        </div>
      </motion.div>

      <div className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2">
        <div className="flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 backdrop-blur-sm">
          <Zap className="h-3 w-3 text-success" />
          <span className="text-[11px] font-medium text-success">2–3 day delivery</span>
        </div>
      </div>
    </div>
  );
}
