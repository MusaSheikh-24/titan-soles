"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    Sparkles,
    Shield,
    Zap,
    Star,
    ShoppingBag,
    Store,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function SignInPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [role, setRole] = useState<"user" | "seller">("user");
    const [isLoading, setIsLoading] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        return () => {
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.width = "";
        };
    }, []);

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {};
        if (!email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please enter a valid email";
        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Must be at least 6 characters";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            await login(email, password, role);
            setIsLoading(false);
            router.push(role === "seller" ? "/become-seller" : "/");
        }
    };

    const handleSocialLogin = (provider: string) => {
        console.log(`Login with ${provider}`);
    };

    const perks = [
        { icon: Zap, text: "AI-powered sneaker discovery" },
        { icon: Shield, text: "Buy & sell with confidence" },
        { icon: Star, text: "Access to limited editions" },
    ];

    return (
        <div className="h-dvh w-screen overflow-hidden flex relative">
            {/* ===== LEFT: Brand Panel ===== */}
            <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="hidden lg:flex lg:w-[45%] xl:w-[42%] bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden flex-col justify-between p-10 xl:p-14"
            >
                {/* Animated BG */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.04)_1px,transparent_1px)] bg-size-[64px_64px]" />
                    <motion.div
                        animate={{ x: [0, 60, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-20 -right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{ x: [0, -40, 0], y: [0, 50, 0], scale: [1.1, 1, 1.1] }}
                        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-600/15 rounded-full blur-3xl"
                    />
                    {mounted && [...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: Math.random() * 600, y: Math.random() * 700, opacity: 0 }}
                            animate={{ y: [null, -80, 0], opacity: [0, 0.5, 0] }}
                            transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
                            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                        />
                    ))}
                </div>

                {/* Top: Back Home + Logo */}
                <div className="relative z-10 flex items-start justify-between">
                    <Link href="/" className="inline-flex items-center gap-2.5 group">
                        <motion.div
                            whileHover={{ rotate: 180, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className="w-10 h-10 bg-linear-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/40"
                        >
                            <Sparkles className="w-5 h-5 text-white" />
                        </motion.div>
                        <span className="text-xl font-bold text-white tracking-tight">
                            Titan<span className="text-cyan-400">Soles</span>
                        </span>
                    </Link>
                </div>

                {/* Center: Hero copy */}
                <div className="relative z-10 space-y-5">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight tracking-tight">
                            Welcome back to<br />
                            <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                the sneaker hub
                            </span>
                        </h2>
                        <p className="mt-3 text-sm text-gray-400 leading-relaxed max-w-md">
                            Sign in to pick up where you left off. Your collection, your
                            marketplace, your community.
                        </p>
                    </motion.div>

                    {/* Perk list */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="space-y-2.5"
                    >
                        {perks.map((perk, i) => (
                            <motion.div
                                key={perk.text}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + i * 0.12 }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-7 h-7 rounded-lg bg-blue-600/20 flex items-center justify-center shrink-0">
                                    <perk.icon className="w-3.5 h-3.5 text-cyan-400" />
                                </div>
                                <span className="text-sm text-gray-300">{perk.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom: Quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="relative z-10"
                >
                    <div className="border-l-2 border-blue-600/50 pl-4">
                        <p className="text-sm text-gray-500 italic">
                            &ldquo;The best marketplace for sneakerheads. The AI matching is uncanny.&rdquo;
                        </p>
                        <p className="text-xs text-gray-600 mt-1.5 font-medium">
                            — Marcus J., Verified Collector
                        </p>
                    </div>
                </motion.div>
            </motion.div>

            {/* ===== RIGHT: Form Panel ===== */}
            <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full lg:w-[55%] xl:w-[58%] bg-white flex items-center justify-center p-8 md:p-12 overflow-hidden"
            >
                <div className="w-full max-w-md flex flex-col justify-center">
                    {/* Back Home (desktop top) */}
                    <div className="hidden lg:flex mb-4">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Back to Home
                        </Link>
                    </div>

                    {/* Mobile Logo + Back (shown on small screens only) */}
                    <div className="lg:hidden text-center mb-5">
                        <Link href="/" className="inline-flex items-center gap-2.5 group cursor-pointer">
                            <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/40">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 tracking-tight">
                                Titan<span className="text-cyan-600">Soles</span>
                            </span>
                        </Link>
                        <div className="mt-2">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                            >
                                <ArrowLeft className="w-3 h-3" />
                                Back to Home
                            </Link>
                        </div>
                    </div>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="mb-5"
                    >
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                            Welcome Back
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Sign in to continue your journey.
                        </p>
                    </motion.div>

                    {/* Account Type Selector */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-4"
                    >
                        <label className="block text-xs font-semibold text-gray-700 mb-2">
                            Sign in as a
                        </label>
                        <div className="grid grid-cols-2 gap-2.5">
                            <button
                                type="button"
                                onClick={() => setRole("user")}
                                className={`flex items-center gap-2.5 px-3.5 py-3 rounded-lg border-2 transition-all cursor-pointer ${
                                    role === "user"
                                        ? "border-blue-500 bg-blue-50/50"
                                        : "border-gray-200 bg-white hover:border-gray-300"
                                }`}
                            >
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                                    role === "user"
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 text-gray-400"
                                }`}>
                                    <User className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                    <p className={`text-xs font-semibold ${
                                        role === "user" ? "text-blue-600" : "text-gray-900"
                                    }`}>
                                        User
                                    </p>
                                    <p className="text-[10px] text-gray-400 leading-tight">
                                        Browse & discover
                                    </p>
                                </div>
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole("seller")}
                                className={`flex items-center gap-2.5 px-3.5 py-3 rounded-lg border-2 transition-all cursor-pointer ${
                                    role === "seller"
                                        ? "border-blue-500 bg-blue-50/50"
                                        : "border-gray-200 bg-white hover:border-gray-300"
                                }`}
                            >
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                                    role === "seller"
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 text-gray-400"
                                }`}>
                                    <Store className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                    <p className={`text-xs font-semibold ${
                                        role === "seller" ? "text-blue-600" : "text-gray-900"
                                    }`}>
                                        Seller
                                    </p>
                                    <p className="text-[10px] text-gray-400 leading-tight">
                                        List & sell products
                                    </p>
                                </div>
                            </button>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        onSubmit={handleSubmit}
                        className="space-y-3"
                    >
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 transition-colors ${focusedField === "email" ? "text-blue-600" : "text-gray-400"}`} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setFocusedField("email")}
                                    onBlur={() => setFocusedField(null)}
                                    className={`w-full pl-9 pr-3.5 py-2 bg-gray-50 border ${errors.email ? "border-red-400" : "border-gray-200 focus:border-blue-500"} rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all`}
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="flex items-center gap-1 mt-0.5 text-red-500 text-xs">
                                    <AlertCircle className="w-3 h-3" /> {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 transition-colors ${focusedField === "password" ? "text-blue-600" : "text-gray-400"}`} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocusedField("password")}
                                    onBlur={() => setFocusedField(null)}
                                    className={`w-full pl-9 pr-9 py-2 bg-gray-50 border ${errors.password ? "border-red-400" : "border-gray-200 focus:border-blue-500"} rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="flex items-center gap-1 mt-0.5 text-red-500 text-xs">
                                    <AlertCircle className="w-3 h-3" /> {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className={`w-3.5 h-3.5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${rememberMe ? "bg-blue-600 border-blue-600" : "border-gray-300 bg-white group-hover:border-gray-400"}`}>
                                    {rememberMe && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}
                                </div>
                                <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">
                                    Remember me
                                </span>
                            </label>
                            <Link
                                href="/forgot-password"
                                className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {isLoading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                />
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </>
                            )}
                        </button>
                    </motion.form>

                    {/* Divider */}
                    <div className="relative my-3.5">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
                            <span className="bg-white px-3 text-gray-400">Or continue with</span>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="grid grid-cols-2 gap-2.5">
                        <button
                            onClick={() => handleSocialLogin("google")}
                            className="flex items-center justify-center gap-2 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-gray-700 text-xs font-medium transition-all cursor-pointer"
                        >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </button>
                        <button
                            onClick={() => handleSocialLogin("github")}
                            className="flex items-center justify-center gap-2 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-gray-700 text-xs font-medium transition-all cursor-pointer"
                        >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                            GitHub
                        </button>
                    </div>

                    {/* Sign up link */}
                    <p className="text-center text-xs text-gray-500 mt-4">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                            Sign up for free
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
