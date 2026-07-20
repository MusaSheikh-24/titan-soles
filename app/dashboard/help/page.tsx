"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import {
  HelpCircle,
  MessageSquare,
  FileText,
  Mail,
  ChevronRight,
  Search,
  ArrowUpRight,
  Zap,
  Shield,
  Star,
  ExternalLink,
  LifeBuoy,
} from "lucide-react";

const faqs = [
  { q: "How do I request a product from a seller?", a: "Browse the marketplace, find a product you like, and click 'Request a Seller' on the product card. The seller will be notified and can accept, negotiate, or decline your request." },
  { q: "How does shipping work?", a: "Shipping is handled directly between you and the seller. Each seller sets their own shipping rates and timelines. You'll discuss shipping details during the request process." },
  { q: "Can I return a product?", a: "Returns are handled by the seller. Titan Soles requires all sellers to accept returns within 14 days for unworn items in original packaging. Check the seller's return policy before purchasing." },
  { q: "How do I know a seller is verified?", a: "Verified sellers have a blue checkmark badge on their store profile. All sellers on Titan Soles undergo a verification process before they can list products." },
  { q: "What is the negotiation process?", a: "When you request a product, the seller can accept your request, send a counter offer, or decline. You can negotiate pricing and shipping directly through the request chat." },
  { q: "How do I contact support?", a: "You can reach our support team via email at support@titansoles.com, through the live chat, or by submitting a ticket below." },
];

const guides = [
  { icon: Zap, title: "Getting Started", description: "Learn the basics of browsing, requesting, and buying on Titan Soles.", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: Shield, title: "Safety & Security", description: "Tips for safe transactions and how to spot verified sellers.", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Star, title: "Pro Tips", description: "Advanced strategies for finding the best deals and limited editions.", color: "text-amber-600", bg: "bg-amber-50" },
  { icon: LifeBuoy, title: "FAQ", description: "Answers to the most common questions from our community.", color: "text-purple-600", bg: "bg-purple-50" },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Help & Support</h1>
        <p className="text-sm text-gray-500">Find answers, guides, and ways to get in touch with us.</p>
      </div>

      {/* Search */}
      <div className="relative mx-auto max-w-xl">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search for help articles, FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-12 pl-11 text-sm border-gray-200 bg-white shadow-sm rounded-xl focus:ring-blue-500/20"
        />
      </div>

      {/* Quick guides */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {guides.map((guide, i) => {
          const Icon = guide.icon;
          return (
            <motion.div
              key={guide.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="h-full cursor-pointer border-gray-200 shadow-sm rounded-2xl transition-all hover:shadow-md hover:-translate-y-0.5">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${guide.bg} mb-4`}>
                    <Icon className={`h-5 w-5 ${guide.color}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900">{guide.title}</h3>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">{guide.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* FAQ */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="shadow-sm border-gray-200 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50/80 to-white border-b border-gray-100">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-900">
                <HelpCircle className="h-4 w-4 text-blue-600" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {filteredFaqs.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-sm text-gray-500">No results found for &ldquo;{searchQuery}&rdquo;</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredFaqs.map((faq, i) => (
                    <div key={i}>
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                        className="flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left transition-colors hover:bg-gray-50 group"
                      >
                        <span className="text-sm font-medium text-gray-900 pr-4 group-hover:text-blue-600 transition-colors">{faq.q}</span>
                        <ChevronRight
                          className={`h-4 w-4 shrink-0 text-gray-400 transition-all ${
                            expandedFaq === i ? "rotate-90 text-blue-600" : "group-hover:text-gray-600"
                          }`}
                        />
                      </button>
                      {expandedFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          className="border-t border-gray-100 bg-gradient-to-r from-gray-50/80 to-white px-6 py-4"
                        >
                          <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card className="h-full shadow-sm border-gray-200 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50/80 to-white border-b border-gray-100">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-900">
                <Mail className="h-4 w-4 text-emerald-600" />
                Get in Touch
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-5">
              <div className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-sm hover:border-gray-300">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Live Chat</p>
                    <p className="mt-0.5 text-xs text-gray-500">Chat with our support team in real-time.</p>
                    <Button variant="link" size="sm" className="mt-1 h-auto p-0 text-xs text-blue-600 font-semibold">
                      Start chat <ArrowUpRight className="h-3 w-3 ml-0.5" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-sm hover:border-gray-300">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Email Support</p>
                    <p className="mt-0.5 text-xs text-gray-500">We typically respond within 24 hours.</p>
                    <a href="mailto:support@titansoles.com" className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700">
                      support@titansoles.com <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-sm hover:border-gray-300">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Submit a Ticket</p>
                    <p className="mt-0.5 text-xs text-gray-500">For complex issues, submit a detailed ticket.</p>
                    <Button variant="link" size="sm" className="mt-1 h-auto p-0 text-xs text-blue-600 font-semibold">
                      Create ticket <ArrowUpRight className="h-3 w-3 ml-0.5" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50 p-4">
                <p className="text-xs font-semibold text-gray-900">Response Time</p>
                <p className="mt-1 text-xs text-gray-600 leading-relaxed">
                  Our team typically responds within <strong className="text-gray-900">2-4 hours</strong> during business hours (Mon-Fri, 9AM-6PM EST).
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
