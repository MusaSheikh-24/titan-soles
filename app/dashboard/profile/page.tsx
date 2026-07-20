"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { useAuth } from "@/lib/auth-context";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Camera,
  Save,
  ShieldCheck,
  BadgeCheck,
  Pencil,
} from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [location, setLocation] = useState("New York, USA");
  const [bio, setBio] = useState("Sneaker enthusiast since 2010. Love collecting rare colorways and limited editions.");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Profile</h1>
        <p className="text-sm text-gray-500">Manage your personal information and preferences.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ── Profile Card ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="shadow-sm border-gray-200 rounded-2xl overflow-hidden">
            <div className="h-20 bg-gradient-to-r from-blue-600 to-sky-400" />
            <CardContent className="flex flex-col items-center -mt-12 pb-6">
              <div className="relative mb-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-400 text-2xl font-bold text-white shadow-lg ring-4 ring-white">
                  {user?.name?.split(" ").map((n) => n[0]).join("") ?? "U"}
                </div>
                <button className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-white text-gray-400 shadow-sm transition-all hover:bg-blue-50 hover:text-blue-600">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{user?.name ?? "User"}</h3>
              <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                <BadgeCheck className="h-4 w-4 text-blue-600" />
                <span>Verified Account</span>
              </div>

              <div className="mt-6 w-full space-y-3.5 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-3.5 text-sm group">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                    <Mail className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-gray-700 font-medium">{user?.email ?? "user@email.com"}</span>
                </div>
                <div className="flex items-center gap-3.5 text-sm group">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                    <Calendar className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-gray-700 font-medium">Member since June 2026</span>
                </div>
                <div className="flex items-center gap-3.5 text-sm group">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-emerald-700 font-medium">Identity Verified</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── Edit Form ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-2">
          <Card className="shadow-sm border-gray-200 rounded-2xl">
            <CardHeader className="bg-gradient-to-r from-gray-50/80 to-white border-b border-gray-100">
              <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <Pencil className="h-4 w-4 text-blue-600" />
                Edit Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input value={name} onChange={(e) => setName(e.target.value)} className="h-11 pl-10 border-gray-200 bg-white rounded-xl focus:ring-blue-500/20" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 pl-10 border-gray-200 bg-white rounded-xl focus:ring-blue-500/20" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="h-11 pl-10 border-gray-200 bg-white rounded-xl focus:ring-blue-500/20" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input value={location} onChange={(e) => setLocation(e.target.value)} className="h-11 pl-10 border-gray-200 bg-white rounded-xl focus:ring-blue-500/20" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
                <Button variant="outline" size="sm" className="rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50">
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave} className="gap-1.5 rounded-xl shadow-sm">
                  <Save className="h-4 w-4" />
                  {saved ? "Saved!" : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
