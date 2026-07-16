"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import {
  Globe,
  Palette,
  Bell,
  Save,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Settings {
  marketplaceName: string;
  supportEmail: string;
  tagline: string;
  aiModel: string;
  maxRecommendations: string;
  toggles: Record<string, boolean>;
}

const defaults: Settings = {
  marketplaceName: "Titan Soles",
  supportEmail: "support@titansoles.com",
  tagline: "AI-Powered Footwear Marketplace",
  aiModel: "Claude 4 Sonnet",
  maxRecommendations: "12",
  toggles: {
    "New order notifications": true,
    "Low stock alerts": true,
    "New seller registrations": true,
    "Weekly analytics report": false,
  },
};

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings>(defaults);
  const [saved, setSaved] = useState(false);

  const update = useCallback((key: keyof Settings, value: unknown) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleNotification = useCallback((label: string) => {
    setSettings((prev) => ({
      ...prev,
      toggles: { ...prev.toggles, [label]: !prev.toggles[label] },
    }));
  }, []);

  const onSave = useCallback(() => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, []);

  const onReset = useCallback(() => {
    setSettings(defaults);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted">Configure your marketplace preferences</p>
      </div>

      <div className="grid gap-6">
        {/* General */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                  <Globe className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Basic marketplace configuration</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Marketplace Name</label>
                  <Input
                    value={settings.marketplaceName}
                    onChange={(e) => update("marketplaceName", e.target.value)}
                    className="h-10 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Support Email</label>
                  <Input
                    value={settings.supportEmail}
                    onChange={(e) => update("supportEmail", e.target.value)}
                    className="h-10 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tagline</label>
                <Input
                  value={settings.tagline}
                  onChange={(e) => update("tagline", e.target.value)}
                  className="h-10 text-sm"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Configuration */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10">
                  <Palette className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <CardTitle>Titan AI Configuration</CardTitle>
                  <CardDescription>AI recommendation and search settings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">AI Model</label>
                  <Input
                    value={settings.aiModel}
                    onChange={(e) => update("aiModel", e.target.value)}
                    className="h-10 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Max Recommendations</label>
                  <Input
                    value={settings.maxRecommendations}
                    onChange={(e) => update("maxRecommendations", e.target.value)}
                    className="h-10 text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-success/10">
                  <Bell className="h-4 w-4 text-success" />
                </div>
                <div>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Email and push notification preferences</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(settings.toggles).map(([label, isOn]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-2xl border border-border bg-white/[0.02] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{label}</p>
                    <p className="text-xs text-muted">
                      {
                        {
                          "New order notifications": "Get notified when a new order is placed",
                          "Low stock alerts": "Receive alerts when products run low on stock",
                          "New seller registrations": "Be notified about new seller applications",
                          "Weekly analytics report": "Receive a weekly performance summary",
                        }[label]
                      }
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleNotification(label)}
                    className={cn(
                      "relative h-6 w-10 rounded-full transition-colors",
                      isOn ? "bg-primary" : "bg-white/10"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
                        isOn ? "right-1" : "left-1"
                      )}
                    />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex items-center justify-end gap-3"
        >
          <Button variant="outline" size="sm" className="gap-1.5" onClick={onReset}>
            <RotateCcw className="h-4 w-4" />
            Reset to Defaults
          </Button>
          <Button size="sm" className="gap-2" onClick={onSave}>
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
        </motion.div>
      </div>
    </div>
  );
}
