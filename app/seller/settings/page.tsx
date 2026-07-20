"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import { Save, Store, Lock, Eye, EyeOff, CheckCircle2, Palette } from "lucide-react";

export default function SellerSettings() {
  const { user } = useAuth();
  const [storeName, setStoreName] = useState("Premium Soles Co.");
  const [storeEmail, setStoreEmail] = useState(user?.email ?? "store@example.com");
  const [description, setDescription] = useState("Premium footwear since 2024. We curate the best sneakers, running shoes, and lifestyle footwear from top brands.");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [address, setAddress] = useState("123 Fashion Ave, New York, NY 10001");
  const [saved, setSaved] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

  const handleSaveStore = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSavePassword = () => {
    setPasswordSaved(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Store Settings</h1>
        <p className="text-sm text-gray-500">Manage your store information and account security.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Store Information */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card className="shadow-sm border-gray-200 rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50/80 to-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <Store className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold text-gray-900">Store Information</CardTitle>
                  <p className="text-xs text-gray-500 mt-0.5">Update your store details and public information.</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">Store Name</label>
                  <Input value={storeName} onChange={(e) => setStoreName(e.target.value)} className="h-11 border-gray-200 bg-white rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">Store Email</label>
                  <Input value={storeEmail} onChange={(e) => setStoreEmail(e.target.value)} className="h-11 border-gray-200 bg-white rounded-xl" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">Store Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-all"
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">Phone Number</label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="h-11 border-gray-200 bg-white rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">Address</label>
                  <Input value={address} onChange={(e) => setAddress(e.target.value)} className="h-11 border-gray-200 bg-white rounded-xl" />
                </div>
              </div>
              <div className="flex justify-end pt-2 border-t border-gray-100">
                <Button size="sm" className="gap-1.5 rounded-xl shadow-sm" onClick={handleSaveStore}>
                  {saved ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Change Password */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="shadow-sm border-gray-200 rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50/80 to-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
                  <Lock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold text-gray-900">Change Password</CardTitle>
                  <p className="text-xs text-gray-500 mt-0.5">Update your account password regularly to stay secure.</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">Current Password</label>
                <div className="relative">
                  <Input
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="h-11 border-gray-200 bg-white rounded-xl pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">New Password</label>
                <div className="relative">
                  <Input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-11 border-gray-200 bg-white rounded-xl pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">Confirm New Password</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-11 border-gray-200 bg-white rounded-xl"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex justify-end pt-2 border-t border-gray-100">
                <Button
                  size="sm"
                  className="gap-1.5 rounded-xl shadow-sm"
                  onClick={handleSavePassword}
                  disabled={!currentPassword || !newPassword || !confirmPassword}
                >
                  {passwordSaved ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Password Updated
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Update Password
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
