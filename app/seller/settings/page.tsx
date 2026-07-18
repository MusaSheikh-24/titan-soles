"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth-context";
import { Save, Store, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";

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
    <div className="space-y-8">
      {/* Store Information */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
              <Store className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Store Information</CardTitle>
              <p className="text-sm text-muted mt-0.5">Update your store details and public information.</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Store Name</label>
                <Input
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="h-11 rounded-2xl border-white/5 bg-white/[0.04]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Store Email</label>
                <Input
                  value={storeEmail}
                  onChange={(e) => setStoreEmail(e.target.value)}
                  className="h-11 rounded-2xl border-white/5 bg-white/[0.04]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Store Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Phone Number</label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-11 rounded-2xl border-white/5 bg-white/[0.04]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Address</label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-11 rounded-2xl border-white/5 bg-white/[0.04]"
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button size="sm" className="gap-1.5" onClick={handleSaveStore}>
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
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Change Password</CardTitle>
              <p className="text-sm text-muted mt-0.5">Update your account password regularly to stay secure.</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 max-w-md">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Current Password</label>
              <div className="relative">
                <Input
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="h-11 rounded-2xl border-white/5 bg-white/[0.04] pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                >
                  {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">New Password</label>
              <div className="relative">
                <Input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-11 rounded-2xl border-white/5 bg-white/[0.04] pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                >
                  {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Confirm New Password</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-11 rounded-2xl border-white/5 bg-white/[0.04]"
                placeholder="••••••••"
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button
                size="sm"
                className="gap-1.5"
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
  );
}
