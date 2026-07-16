"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  MessageSquare,
  Sparkles,
  ArrowRight,
  Bot,
  User,
  Mic,
  ImagePlus,
} from "lucide-react";
import { FadeUp } from "@/components/ui/fade-up";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionShell } from "@/components/ui/section-shell";
import { AI_DEMO_PRODUCTS, AI_SUGGESTIONS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

interface AISectionProps {
  onOpenAI: () => void;
}

const demoMessages = [
  { role: "user" as const, text: "I need shoes for hiking." },
  { role: "assistant" as const, text: "What's your budget?" },
  { role: "user" as const, text: "$120" },
  {
    role: "assistant" as const,
    text: "Here are the best recommendations from verified stores:",
  },
];

export function AISection({ onOpenAI }: AISectionProps) {
  return (
    <SectionShell theme="light" id="ai" className="relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 h-[420px] w-[520px] rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[320px] w-[420px] rounded-full bg-accent/5 blur-3xl" />

      <div className="container-page relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <FadeUp className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Meet Titan AI
            </div>
            <h2 className="mt-4 text-section font-bold tracking-tight text-foreground">
              Shopping that feels like a conversation
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Not a chatbot. A personal footwear expert that understands context,
              compares products, and finds the perfect match.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {AI_SUGGESTIONS.slice(0, 4).map((q) => (
                <button
                  key={q}
                  onClick={onOpenAI}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" onClick={onOpenAI} className="gap-2">
                Try Titan AI
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={onOpenAI}
                className="gap-2"
              >
                <Mic className="h-4 w-4" />
                Voice
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={onOpenAI}
                className="gap-2"
              >
                <ImagePlus className="h-4 w-4" />
                Image
              </Button>
            </div>
          </FadeUp>

          {/* Dark chat panel inside light section = mixed */}
          <FadeUp delay={0.12} className="lg:col-span-7">
            <div className="theme-dark overflow-hidden rounded-[24px] border border-white/10 bg-[#0F1E37] text-white premium-shadow">
              <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Titan AI</p>
                    <p className="text-[11px] text-[#A8B4C7]">
                      Live recommendations
                    </p>
                  </div>
                </div>
                <Badge variant="success">98% confidence</Badge>
              </div>

              <div className="space-y-3 p-4">
                {demoMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.1 }}
                    className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl ${
                        msg.role === "user"
                          ? "bg-white/10"
                          : "bg-gradient-to-br from-primary/20 to-accent/15"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <User className="h-3.5 w-3.5 text-slate-300" />
                      ) : (
                        <Bot className="h-3.5 w-3.5 text-accent" />
                      )}
                    </div>
                    <div
                      className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-white"
                          : "bg-white/5 text-slate-200"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.65 }}
                  className="grid grid-cols-3 gap-2 pt-1"
                >
                  {AI_DEMO_PRODUCTS.map((product) => (
                    <div
                      key={product.id}
                      className="overflow-hidden rounded-2xl border border-white/8 bg-[#132848]"
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="120px"
                        />
                      </div>
                      <div className="p-2">
                        <p className="truncate text-[11px] font-semibold">
                          {product.name}
                        </p>
                        <div className="mt-0.5 flex items-center justify-between">
                          <p className="text-[11px] font-bold text-accent">
                            {formatPrice(product.price)}
                          </p>
                          <span className="text-[10px] text-success">
                            {product.aiMatch}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>

                <p className="rounded-2xl border border-white/6 bg-white/[0.03] px-3 py-2 text-xs text-[#A8B4C7]">
                  <span className="font-medium text-accent">Why these?</span> Best
                  trail grip, waterproof options, and verified stock under $120.
                </p>
              </div>

              <div className="border-t border-white/8 p-3">
                <button
                  onClick={onOpenAI}
                  className="flex w-full items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-3.5 py-2.5 text-left text-sm text-[#A8B4C7] transition-colors hover:border-primary/30 hover:text-accent"
                >
                  <MessageSquare className="h-4 w-4 shrink-0 text-accent" />
                  Continue the conversation...
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </SectionShell>
  );
}
