"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import {
  Bell,
  Shield,
  EyeOff,
  LogOut,
  ChevronRight,
  Save,
  Palette,
  Smartphone,
  Mail,
  CheckCircle2,
  User,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { logout } = useAuth();
  const router = useRouter();
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSms, setNotifSms] = useState(false);
  const [notifPush, setNotifPush] = useState(true);
  const [language, setLanguage] = useState("en");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  function Toggle({ enabled, onClick }: { enabled: boolean; onClick: () => void }) {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={onClick}
        className={`group relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 ${enabled ? "bg-blue-600" : "bg-gray-300"
          }`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white shadow-md transition-all duration-300 ${enabled ? "translate-x-6" : "translate-x-1"
            }`}
        />
      </button>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">Manage your account preferences and notifications.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* ── Notifications ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="shadow-sm border-gray-200 rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-gray-100 bg-linear-to-r from-gray-50/80 to-white">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-900">
                <Bell className="h-4 w-4 text-blue-600" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="p-1">
              <div className="flex items-center justify-between px-4 py-3.5 transition-colors hover:bg-gray-50 border-b border-gray-100 last:border-0 rounded-lg m-1 last:mb-1">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                    <p className="text-xs text-gray-500 mt-0.5">Receive updates and alerts via email</p>
                  </div>
                </div>
                <Toggle enabled={notifEmail} onClick={() => setNotifEmail(!notifEmail)} />
              </div>
              <div className="flex items-center justify-between px-4 py-3.5 transition-colors hover:bg-gray-50 border-b border-gray-100 last:border-0 rounded-lg m-1">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <Smartphone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">SMS Notifications</p>
                    <p className="text-xs text-gray-500 mt-0.5">Get text message alerts for urgent updates</p>
                  </div>
                </div>
                <Toggle enabled={notifSms} onClick={() => setNotifSms(!notifSms)} />
              </div>
              <div className="flex items-center justify-between px-4 py-3.5 transition-colors hover:bg-gray-50 rounded-lg m-1">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Push Notifications</p>
                    <p className="text-xs text-gray-500 mt-0.5">Browser push alerts for real-time updates</p>
                  </div>
                </div>
                <Toggle enabled={notifPush} onClick={() => setNotifPush(!notifPush)} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── Preferences ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="shadow-sm border-gray-200 rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-gray-100 bg-linear-to-r from-gray-50/80 to-white">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-900">
                <Palette className="h-4 w-4 text-purple-600" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="p-1">
              <div className="flex items-center justify-between px-4 py-3.5 transition-colors hover:bg-gray-50 border-b border-gray-100 last:border-0 rounded-lg m-1">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                    <Palette className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Dark Mode</p>
                    <p className="text-xs text-gray-500 mt-0.5">Toggle dark theme</p>
                  </div>
                </div>
                <Toggle enabled={false} onClick={() => { }} />
              </div>
              <div className="px-4 py-3.5 rounded-lg m-1">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-gray-900">Language</p>
                    <p className="text-xs text-gray-500">Choose your preferred language</p>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="mt-1.5 w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all hover:border-gray-300"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── Account ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="shadow-sm border-gray-200 rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-gray-100 bg-linear-to-r from-gray-50/80 to-white">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-900">
                <Shield className="h-4 w-4 text-emerald-600" />
                Account
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 space-y-2">
              <Button variant="outline" className="w-full justify-between h-12 border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 rounded-xl" asChild>
                <a href="/dashboard/profile">
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                      <User className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-medium">Manage Profile</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-300" />
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-between h-12 border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                    <Shield className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-medium">Change Password</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-300" />
              </Button>
              <Button variant="outline" className="w-full justify-between h-12 border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                    <EyeOff className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-medium">Privacy Settings</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-300" />
              </Button>
              <div className="pt-2 border-t border-gray-100">
                <Button variant="outline" className="w-full justify-start gap-3 h-12 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  <span className="font-medium">Sign Out</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── Danger Zone ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card className="shadow-sm border-red-200 rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-red-100 bg-linear
            
            -to-r from-red-50/80 to-white">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-red-600">
                <EyeOff className="h-4 w-4" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 space-y-2">
              <p className="px-1 text-xs text-gray-500 pb-1">Irreversible actions for your account. Proceed with caution.</p>
              <Button variant="outline" className="w-full justify-start gap-3 h-12 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl">
                <EyeOff className="h-4 w-4" />
                <span className="font-medium">Deactivate Account</span>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl">
                <LogOut className="h-4 w-4" />
                <span className="font-medium">Delete Account</span>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* ── Save bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
      >
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <span>Changes are saved automatically</span>
        </div>
        <Button size="sm" onClick={handleSave} className={`gap-1.5 rounded-xl shadow-sm transition-all ${saved ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}>
          {saved ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save All Settings
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}
