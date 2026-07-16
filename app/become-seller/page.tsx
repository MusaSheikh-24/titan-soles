"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
    ArrowRight,
    Check,
    Store,
    TrendingUp,
    Package,
    ShoppingCart,
    DollarSign,
    ShieldCheck,
    BarChart3,
    Users,
    Globe,
    Headphones,
    Zap,
    Sparkles,
    Settings,
    Camera,
    Upload,
    Wallet,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TopNotificationBar } from "@/components/layout/top-notification-bar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/ui/fade-up";
import { AIChatDialog } from "@/features/ai-assistant/ai-chat-dialog";

const BENEFITS = [
    {
        icon: Zap,
        title: "AI-Powered Discovery",
        description: "Your products get matched to shoppers by Titan AI — the smartest search in footwear.",
    },
    {
        icon: ShieldCheck,
        title: "Verified Trust Badge",
        description: "Earn the verified badge and build instant credibility with millions of buyers.",
    },
    {
        icon: BarChart3,
        title: "Real-Time Analytics",
        description: "Track revenue, orders, views, and trends with a live dashboard.",
    },
    {
        icon: Globe,
        title: "Global Reach",
        description: "Sell to sneaker enthusiasts worldwide with zero cross-border complexity.",
    },
    {
        icon: Wallet,
        title: "Low Commission",
        description: "Keep more of what you earn. Competitive rates with no hidden fees.",
    },
    {
        icon: Headphones,
        title: "Dedicated Support",
        description: "Priority support from your first listing with a dedicated account manager.",
    },
];

const HOW_IT_WORKS = [
    {
        step: 1,
        title: "Apply",
        description: "Submit your business details for verification. We'll review within 48 hours.",
        icon: Settings,
    },
    {
        step: 2,
        title: "Upload Inventory",
        description: "Add your products with photos, descriptions, and pricing — bulk upload supported.",
        icon: Upload,
    },
    {
        step: 3,
        title: "Get Verified",
        description: "Pass our authenticity and quality review. Your verified badge goes live.",
        icon: ShieldCheck,
    },
    {
        step: 4,
        title: "Start Selling",
        description: "Your store is live on Titan Soles with AI-driven traffic and insights.",
        icon: TrendingUp,
    },
];

const PLANS = [
    {
        name: "Starter",
        price: "Free",
        description: "Perfect for small boutiques testing the marketplace.",
        features: [
            "Up to 50 products",
            "Basic analytics",
            "Standard listing",
            "Email support",
            "2% commission per sale",
        ],
        cta: "Get Started",
        popular: false,
    },
    {
        name: "Pro",
        price: "$29",
        period: "/month",
        description: "For growing stores ready to scale.",
        features: [
            "Up to 500 products",
            "Advanced analytics & insights",
            "Verified badge eligibility",
            "Priority support",
            "1.5% commission per sale",
            "Bulk inventory upload",
            "Promoted listing slots",
        ],
        cta: "Start Free Trial",
        popular: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "For large retailers and multi-brand stores.",
        features: [
            "Unlimited products",
            "Custom analytics dashboard",
            "Dedicated account manager",
            "API integration",
            "Negotiable commission rates",
            "VIP support 24/7",
            "Exclusive placement",
            "Multi-store management",
        ],
        cta: "Contact Sales",
        popular: false,
    },
];

const FAQS = [
    {
        q: "How long does verification take?",
        a: "Most stores are verified within 24–48 hours. We review your business registration, inventory authenticity, and quality standards.",
    },
    {
        q: "What are the commission rates?",
        a: "Starter plans begin at 2% per sale. Pro stores pay 1.5%, and Enterprise plans have negotiable rates. There are no listing fees.",
    },
    {
        q: "Can I sell internationally?",
        a: "Yes! Titan Soles handles cross-border logistics, payments, and currency conversion so you can focus on selling.",
    },
    {
        q: "How does AI match my products?",
        a: "Titan AI analyzes product descriptions, images, and customer preferences to match shoppers with the right products instantly.",
    },
    {
        q: "What support do I get?",
        a: "Starter gets email support, Pro has priority support, and Enterprise includes a dedicated account manager available 24/7.",
    },
    {
        q: "Can I migrate from another platform?",
        a: "Absolutely. We offer bulk product import, API integration, and migration assistance for Enterprise accounts.",
    },
];

const dashboardStats = [
    { icon: DollarSign, label: "Revenue", value: "$48.2K", change: "+12%" },
    { icon: ShoppingCart, label: "Orders", value: "847", change: "+8%" },
    { icon: Package, label: "Products", value: "156", change: "+3" },
    { icon: TrendingUp, label: "Views", value: "12.4K", change: "+24%" },
];

export default function BecomeSellerPage() {
    const [aiOpen, setAiOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            <TopNotificationBar />
            <Navbar onOpenAI={() => setAiOpen(true)} />
            <main className="min-h-screen bg-[#061221]">
                {/* ===== HERO ===== */}
                <section className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.04)_1px,transparent_1px)] bg-size-[64px_64px]" />
                        <motion.div
                            animate={{ x: [0, 80, 0], y: [0, -40, 0], scale: [1, 1.3, 1] }}
                            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-10 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
                        />
                        <motion.div
                            animate={{ x: [0, -60, 0], y: [0, 50, 0], scale: [1.1, 1, 1.1] }}
                            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-20 left-20 w-80 h-80 bg-cyan-600/15 rounded-full blur-3xl"
                        />
                        {mounted && [...Array(10)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, opacity: 0 }}
                                animate={{ y: [null, -120, 0], opacity: [0, 0.5, 0] }}
                                transition={{ duration: 5 + Math.random() * 4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                            />
                        ))}
                    </div>

                    <div className="container-page relative z-10">
                        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                            <FadeUp>
                                <div>
                                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/30 px-4 py-1.5 mb-6">
                                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-xs font-medium text-blue-300">Partner Program</span>
                                    </div>
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                                        Turn Your Stock Into{" "}
                                        <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                            Sales
                                        </span>
                                    </h1>
                                    <p className="mt-4 text-base md:text-lg text-slate-400 leading-relaxed max-w-lg">
                                        Join the AI-powered marketplace that connects your footwear with shoppers
                                        who are ready to buy. Low commissions, powerful insights, and global reach.
                                    </p>
                                    <div className="mt-8 flex flex-wrap gap-3">
                                        <Button size="lg" className="gap-2 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/30">
                                            Apply as a Seller
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                        <Button size="lg" variant="outline" className="border-white/10 text-slate-300 hover:text-white hover:bg-white/5">
                                            View Dashboard Demo
                                        </Button>
                                    </div>
                                    <div className="mt-8 flex items-center gap-6 text-xs text-slate-500">
                                        <span className="flex items-center gap-1.5">
                                            <Store className="w-3.5 h-3.5 text-accent" /> 250+ Stores
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Package className="w-3.5 h-3.5 text-accent" /> 5K+ Products
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Users className="w-3.5 h-3.5 text-accent" /> 15K+ Buyers
                                        </span>
                                    </div>
                                </div>
                            </FadeUp>

                            {/* Dashboard Preview */}
                            <FadeUp delay={0.2}>
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    className="relative"
                                >
                                    <div className="glass-dark rounded-[20px] p-5 shadow-2xl shadow-black/40 border border-white/8">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-cyan-600">
                                                    <Store className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-400">Store Dashboard</p>
                                                    <p className="text-lg font-bold text-white">Premium Soles Co.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-1">
                                                <div className="h-1.5 w-1.5 rounded-full bg-success" />
                                                <span className="text-[11px] font-medium text-success">Verified</span>
                                            </div>
                                        </div>
                                        <div className="mt-5 grid grid-cols-2 gap-2.5">
                                            {dashboardStats.map((stat) => {
                                                const Icon = stat.icon;
                                                return (
                                                    <div key={stat.label} className="rounded-2xl border border-white/8 bg-white/3 p-3.5">
                                                        <div className="flex items-center gap-1.5 text-slate-400">
                                                            <Icon className="w-3.5 h-3.5" />
                                                            <span className="text-[11px]">{stat.label}</span>
                                                        </div>
                                                        <p className="mt-1.5 text-lg font-bold text-white">{stat.value}</p>
                                                        <p className="text-[11px] font-medium text-success">{stat.change}</p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="mt-3 h-20 rounded-2xl border border-white/8 bg-linear-to-r from-primary/10 to-accent/10 p-3">
                                            <p className="text-[11px] text-slate-400">Weekly Analytics</p>
                                            <div className="mt-2 flex h-8 items-end gap-1">
                                                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                                    <div key={i} className="flex-1 rounded-sm bg-linear-to-t from-blue-600 to-cyan-400" style={{ height: `${h}%` }} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </FadeUp>
                        </div>
                    </div>
                </section>

                {/* ===== HOW IT WORKS ===== */}
                <section className="section-padding bg-white text-gray-900">
                    <div className="container-page">
                        <FadeUp>
                            <div className="text-center max-w-2xl mx-auto">
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600 mb-3">
                                    Getting Started
                                </p>
                                <h2 className="text-section font-bold tracking-tight">
                                    How It Works
                                </h2>
                                <p className="mt-3 text-base text-gray-500 leading-relaxed">
                                    From application to your first sale in four simple steps.
                                </p>
                            </div>
                        </FadeUp>

                        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {HOW_IT_WORKS.map((step, i) => (
                                <FadeUp key={step.title} delay={0.1 * i}>
                                    <div className="group relative rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white text-sm font-bold mb-4">
                                            {step.step}
                                        </div>
                                        <step.icon className="w-5 h-5 text-blue-600 mb-3" />
                                        <h3 className="text-lg font-bold text-gray-900 mb-1.5">{step.title}</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                                    </div>
                                </FadeUp>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== BENEFITS ===== */}
                <section className="section-padding bg-[#061221] text-white">
                    <div className="container-page">
                        <FadeUp>
                            <div className="text-center max-w-2xl mx-auto">
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-400 mb-3">
                                    Why Titan Soles
                                </p>
                                <h2 className="text-section font-bold tracking-tight">
                                    Built for Sellers
                                </h2>
                                <p className="mt-3 text-base text-slate-400 leading-relaxed">
                                    Everything you need to grow your footwear business in one platform.
                                </p>
                            </div>
                        </FadeUp>

                        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {BENEFITS.map((benefit, i) => (
                                <FadeUp key={benefit.title} delay={0.08 * i}>
                                    <div className="group rounded-3xl border border-white/8 bg-white/3 p-6 hover:bg-white/5 hover:-translate-y-1 transition-all duration-300">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600/20 mb-4">
                                            <benefit.icon className="w-5 h-5 text-cyan-400" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-1.5">{benefit.title}</h3>
                                        <p className="text-sm text-slate-400 leading-relaxed">{benefit.description}</p>
                                    </div>
                                </FadeUp>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== FEATURED PARTNER CTA (reuse PartnerCTA pattern inline) ===== */}
                <section className="section-padding bg-white text-gray-900">
                    <div className="container-page">
                        <FadeUp>
                            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 p-6 sm:p-10 lg:p-12">
                                <div className="pointer-events-none absolute inset-0 z-0">
                                    <div className="absolute top-0 right-0 h-100 w-100 rounded-full bg-blue-600/10 blur-3xl" />
                                    <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
                                </div>

                                <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
                                            Verified Store Program
                                        </p>
                                        <h2 className="mt-3 text-section font-bold tracking-tight text-gray-900">
                                            Become a Verified Store
                                        </h2>
                                        <p className="mt-3 text-base leading-relaxed text-gray-500">
                                            Join the future of footwear retail. Reach AI-powered shoppers
                                            and grow with premium placement on Titan Soles.
                                        </p>

                                        <ul className="mt-6 space-y-2.5">
                                            {[
                                                "Reach millions of AI-powered shoppers",
                                                "Verified seller badge & premium placement",
                                                "Full analytics dashboard with real-time insights",
                                                "Low commission, maximum visibility",
                                                "AI-driven product discovery engine",
                                            ].map((benefit) => (
                                                <li key={benefit} className="flex items-center gap-2.5">
                                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-green-100">
                                                        <Check className="h-3.5 w-3.5 text-green-600" />
                                                    </div>
                                                    <span className="text-sm text-gray-600">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-6 grid grid-cols-2 gap-2">
                                            {[
                                                "Business verification",
                                                "Inventory authenticity check",
                                                "Quality standards review",
                                                "Dashboard onboarding",
                                            ].map((item) => (
                                                <div key={item} className="rounded-2xl border border-gray-200 bg-white px-3 py-2.5 text-xs text-gray-500 shadow-sm">
                                                    <Check className="mb-1.5 h-3.5 w-3.5 text-blue-600" />
                                                    {item}
                                                </div>
                                            ))}
                                        </div>

                                        <Button size="lg" className="mt-8 gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                                            Become a Verified Store
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    <div className="relative hidden lg:block">
                                        <motion.div
                                            animate={{ y: [0, -8, 0] }}
                                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <div className="rounded-[20px] bg-white p-5 shadow-xl border border-gray-200">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-cyan-600">
                                                            <Store className="w-6 h-6 text-white" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-400">Store Dashboard</p>
                                                            <p className="text-lg font-bold text-gray-900">Premium Soles Co.</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                                        <span className="text-[11px] font-medium text-green-700">Top Rated</span>
                                                    </div>
                                                </div>
                                                <div className="mt-5 grid grid-cols-2 gap-2.5">
                                                    {dashboardStats.map((stat) => {
                                                        const Icon = stat.icon;
                                                        return (
                                                            <div key={stat.label} className="rounded-2xl border border-gray-100 bg-gray-50 p-3.5">
                                                                <div className="flex items-center gap-1.5 text-gray-400">
                                                                    <Icon className="w-3.5 h-3.5" />
                                                                    <span className="text-[11px]">{stat.label}</span>
                                                                </div>
                                                                <p className="mt-1.5 text-lg font-bold text-gray-900">{stat.value}</p>
                                                                <p className="text-[11px] font-medium text-green-600">{stat.change}</p>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <div className="mt-3 h-20 rounded-2xl border border-gray-100 bg-linear-to-r from-blue-50 to-cyan-50 p-3">
                                                    <p className="text-[11px] text-gray-400">Weekly Analytics</p>
                                                    <div className="mt-2 flex h-8 items-end gap-1">
                                                        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                                            <div key={i} className="flex-1 rounded-sm bg-linear-to-t from-blue-600 to-cyan-400" style={{ height: `${h}%` }} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </FadeUp>
                    </div>
                </section>

                {/* ===== PRICING ===== */}
                <section className="section-padding bg-[#061221] text-white">
                    <div className="container-page">
                        <FadeUp>
                            <div className="text-center max-w-2xl mx-auto">
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-400 mb-3">
                                    Pricing
                                </p>
                                <h2 className="text-section font-bold tracking-tight">
                                    Choose Your Plan
                                </h2>
                                <p className="mt-3 text-base text-slate-400 leading-relaxed">
                                    Start free and scale with your business. No hidden fees.
                                </p>
                            </div>
                        </FadeUp>

                        <div className="mt-12 grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
                            {PLANS.map((plan, i) => (
                                <FadeUp key={plan.name} delay={0.12 * i}>
                                    <div className={`relative rounded-3xl p-6 border transition-all duration-300 ${plan.popular
                                        ? "border-blue-500/40 bg-blue-600/5 shadow-xl shadow-blue-500/10 scale-105"
                                        : "border-white/8 bg-white/3 hover:bg-white/5"
                                        }`}>
                                        {plan.popular && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-linear-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                                                Most Popular
                                            </div>
                                        )}
                                        <div className="mt-2">
                                            <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                                            <div className="mt-2 flex items-baseline gap-1">
                                                <span className="text-3xl font-bold text-white">{plan.price}</span>
                                                {plan.period && <span className="text-sm text-slate-400">{plan.period}</span>}
                                            </div>
                                            <p className="mt-1.5 text-xs text-slate-400">{plan.description}</p>
                                        </div>
                                        <ul className="mt-5 space-y-2.5">
                                            {plan.features.map((feature) => (
                                                <li key={feature} className="flex items-start gap-2">
                                                    <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${plan.popular ? "text-cyan-400" : "text-slate-500"}`} />
                                                    <span className="text-xs text-slate-300">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <Button
                                            className={`w-full mt-6 ${plan.popular
                                                ? "bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                                                : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                                                }`}
                                        >
                                            {plan.cta}
                                        </Button>
                                    </div>
                                </FadeUp>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== FAQ ===== */}
                <section className="section-padding bg-white text-gray-900">
                    <div className="container-page max-w-3xl">
                        <FadeUp>
                            <div className="text-center max-w-2xl mx-auto mb-12">
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600 mb-3">
                                    FAQ
                                </p>
                                <h2 className="text-section font-bold tracking-tight">
                                    Frequently Asked Questions
                                </h2>
                            </div>
                        </FadeUp>

                        <div className="space-y-3">
                            {FAQS.map((faq, i) => (
                                <FadeUp key={faq.q} delay={0.05 * i}>
                                    <div className="rounded-2xl border border-gray-200 overflow-hidden">
                                        <button
                                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                            className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
                                        >
                                            {faq.q}
                                            <motion.svg
                                                animate={{ rotate: openFaq === i ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="w-4 h-4 text-gray-400 shrink-0 ml-4"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="m6 9 6 6 6-6" />
                                            </motion.svg>
                                        </button>
                                        <motion.div
                                            initial={false}
                                            animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                                            transition={{ duration: 0.25, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    </div>
                                </FadeUp>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== FINAL CTA ===== */}
                <section className="section-padding bg-[#061221] text-white">
                    <div className="container-page">
                        <FadeUp>
                            <div className="relative overflow-hidden rounded-3xl bg-[#040b16] border border-white/8 p-8 sm:p-12 lg:p-16 text-center">
                                <div className="absolute inset-0 pointer-events-none">
                                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
                                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-600/15 rounded-full blur-3xl" />
                                </div>
                                <div className="relative z-10 max-w-2xl mx-auto">
                                    <Sparkles className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                                        Ready to Grow Your Footwear Business?
                                    </h2>
                                    <p className="mt-3 text-base text-slate-400 leading-relaxed max-w-lg mx-auto">
                                        Join 250+ verified stores already selling on Titan Soles.
                                        Start your application today — it&apos;s free.
                                    </p>
                                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                                        <Button size="lg" className="gap-2 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/30">
                                            Apply as a Seller
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                        <Button size="lg" variant="outline" className="border-white/10 text-slate-300 hover:text-white hover:bg-white/5" asChild>
                                            <Link href="/signup">Create an Account</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </FadeUp>
                    </div>
                </section>
            </main>
            <Footer />
            <MobileNav onOpenAI={() => setAiOpen(true)} />
            <AIChatDialog open={aiOpen} onOpenChange={setAiOpen} />
        </>
    );
}
