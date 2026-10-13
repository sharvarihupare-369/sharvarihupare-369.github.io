"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check,
  Sparkles,
  ArrowUpRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
  RotateCcw,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export function ContactSection() {
  const { personal } = portfolioData;

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleInputChange = (field: "name" | "email" | "subject" | "message", value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error as user types
    if (fieldErrors[field as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    // If there was a general error message displayed, reset status to idle
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const validateForm = () => {
    const errors: { name?: string; email?: string; message?: string } = {};

    if (!formState.name.trim()) {
      errors.name = "Please enter your name.";
    }

    if (!formState.email.trim()) {
      errors.email = "Please enter your email address.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formState.email.trim())) {
        errors.email = "Please enter a valid email address (e.g. name@example.com).";
      }
    }

    if (!formState.message.trim()) {
      errors.message = "Please enter your message.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    if (!validateForm()) {
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim();
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim();
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim();

    const isConfigured =
      Boolean(serviceId) &&
      Boolean(templateId) &&
      Boolean(publicKey) &&
      serviceId !== "your_service_id" &&
      templateId !== "your_template_id" &&
      publicKey !== "your_public_key";

    if (!isConfigured) {
      setStatus("error");
      setErrorMessage(
        "EmailJS credentials are not configured yet in .env.local. Please check your service keys."
      );
      return;
    }

    try {
      setStatus("sending");
      setErrorMessage("");

      const templateParams = {
        name: formState.name,
        from_name: formState.name,
        email: formState.email,
        from_email: formState.email,
        reply_to: formState.email,
        to_name: personal.name,
        to_email: personal.email,
        subject: formState.subject || `Message from ${formState.name} via Portfolio`,
        message: formState.message,
      };

      await emailjs.send(serviceId!, templateId!, templateParams, {
        publicKey: publicKey!,
      });

      // Trigger celebration confetti on success
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#d85827", "#e76735", "#c67d1f", "#fdfbf7"],
        });
      } catch {
        // Ignore if confetti canvas is not supported
      }

      setStatus("success");
      setFieldErrors({});
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Clear success state after 6 seconds
      setTimeout(() => {
        setStatus((prev) => (prev === "success" ? "idle" : prev));
      }, 6000);
    } catch (err: unknown) {
      // Gracefully handle errors without console.error (which triggers Next.js dev overlay)
      setStatus("error");

      let userFriendlyMsg =
        "Something went wrong while sending your message. Please try again or reach out directly.";

      if (typeof err === "object" && err !== null) {
        const text =
          "text" in err && typeof (err as { text: unknown }).text === "string"
            ? (err as { text: string }).text
            : err instanceof Error
            ? err.message
            : "";

        if (text) {
          const lower = text.toLowerCase();
          if (lower.includes("public key") || lower.includes("user_id")) {
            userFriendlyMsg =
              "EmailJS Public Key is invalid. Please verify your EmailJS credentials in .env.local.";
          } else if (lower.includes("service")) {
            userFriendlyMsg =
              "EmailJS Service ID was not found. Please verify the Service ID in .env.local.";
          } else if (lower.includes("template")) {
            userFriendlyMsg =
              "EmailJS Template ID was not found. Please verify the Template ID in .env.local.";
          } else if (lower.includes("network") || lower.includes("failed to fetch")) {
            userFriendlyMsg =
              "Network error. Please check your internet connection and try again.";
          } else {
            userFriendlyMsg = text;
          }
        }
      }

      setErrorMessage(userFriendlyMsg);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center"
    >
      {/* Header */}
      <div className="mb-14 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c67d1f]/20 border border-[#c67d1f]/40 text-[#f5c07b] text-xs font-mono uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Get In Touch
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Let&apos;s Build Something <br className="hidden sm:block" />
          <span className="text-gradient-cinematic">Remarkable Together</span>
        </h2>
        <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
          Whether you&apos;re looking to scale payment infrastructure, build production digital health tools, or architect generative AI workflows—I&apos;d love to connect.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Direct Contact & Social Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Quick Copy Email Card */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 hover:border-[#d85827]/40 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#d85827]/15 border border-[#d85827]/30 flex items-center justify-center text-[#f0834c]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-stone-400 uppercase">
                    Email Address
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-white">
                    {personal.email}
                  </div>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(personal.email, "email")}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-[#d85827]/20 text-stone-300 hover:text-[#f0834c] transition-colors cursor-pointer"
                title="Copy Email"
                aria-label="Copy Email"
              >
                {copiedField === "email" ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            {copiedField === "email" && (
              <div className="text-xs text-[#f5ab79] font-mono mt-1">
                Copied to clipboard!
              </div>
            )}
          </div>

          {/* Quick Copy Phone Card */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 hover:border-[#c67d1f]/40 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#c67d1f]/15 border border-[#c67d1f]/30 flex items-center justify-center text-[#f5c07b]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-stone-400 uppercase">
                    Phone / WhatsApp
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-white font-mono">
                    {personal.phone}
                  </div>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(personal.phone, "phone")}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-[#c67d1f]/20 text-stone-300 hover:text-[#f5c07b] transition-colors cursor-pointer"
                title="Copy Phone"
                aria-label="Copy Phone"
              >
                {copiedField === "phone" ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            {copiedField === "phone" && (
              <div className="text-xs text-[#f5c07b] font-mono mt-1">
                Copied to clipboard!
              </div>
            )}
          </div>

          {/* Location Card */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#24130c] border border-white/15 flex items-center justify-center text-[#f5ab79]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-stone-400 uppercase">
                  Location
                </div>
                <div className="text-sm sm:text-base font-semibold text-white">
                  {personal.location}
                </div>
              </div>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href={personal.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel rounded-2xl p-4 flex items-center justify-between border border-white/10 hover:border-[#d85827]/40 hover:bg-white/5 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <LinkedinIcon className="w-5 h-5 text-[#f0834c]" />
                <span className="text-xs font-semibold text-white">LinkedIn</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-[#f0834c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            <a
              href={personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel rounded-2xl p-4 flex items-center justify-between border border-white/10 hover:border-[#c67d1f]/40 hover:bg-white/5 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <GithubIcon className="w-5 h-5 text-[#f5c07b]" />
                <span className="text-xs font-semibold text-white">GitHub</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-[#f5c07b] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>
        </div>

        {/* Interactive Direct Message Form (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white">
              Send a Direct Message
            </h3>
            {/* <span className="text-[11px] font-mono text-[#f5c07b]/80 bg-[#c67d1f]/15 px-2.5 py-0.5 rounded-full border border-[#c67d1f]/30">
              via EmailJS
            </span> */}
          </div>
          <p className="text-xs sm:text-sm text-stone-300 mb-6">
            Have an open role, collaboration idea, or question? Send a note directly to my inbox.
          </p>

          {/* Status Messages */}
          {status === "success" && (
            <div className="mb-5 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                <div className="text-xs sm:text-sm">
                  <p className="font-semibold text-emerald-200">Message sent successfully!</p>
                  <p className="text-emerald-300/90 mt-0.5">
                    Thank you for reaching out. I&apos;ve received your message and will get back to you shortly.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="p-1 rounded-lg text-emerald-300/60 hover:text-white hover:bg-emerald-900/30 transition-colors cursor-pointer shrink-0"
                title="Dismiss message"
                aria-label="Dismiss message"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {status === "error" && (
            <div className="mb-5 p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-300 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
                <div className="text-xs sm:text-sm">
                  <p className="font-semibold text-rose-200">Unable to send message</p>
                  <p className="text-rose-300/90 mt-0.5">
                    {errorMessage ||
                      "Something went wrong while delivering your message. Please try again or reach out directly."}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setErrorMessage("");
                }}
                className="p-1 rounded-lg text-rose-300/60 hover:text-white hover:bg-rose-900/30 transition-colors cursor-pointer shrink-0"
                title="Dismiss message"
                aria-label="Dismiss message"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  disabled={status === "sending"}
                  value={formState.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#24130c]/90 border text-sm text-white placeholder-stone-500 focus:outline-none transition-all disabled:opacity-60 ${
                    fieldErrors.name
                      ? "border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/30"
                      : "border-white/15 focus:border-[#d85827]/70 focus:ring-1 focus:ring-[#d85827]/40"
                  }`}
                />
                {fieldErrors.name && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1.5 font-mono">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{fieldErrors.name}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5">
                  Your Email *
                </label>
                <input
                  type="email"
                  disabled={status === "sending"}
                  value={formState.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="alex@company.com"
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#24130c]/90 border text-sm text-white placeholder-stone-500 focus:outline-none transition-all disabled:opacity-60 ${
                    fieldErrors.email
                      ? "border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/30"
                      : "border-white/15 focus:border-[#d85827]/70 focus:ring-1 focus:ring-[#d85827]/40"
                  }`}
                />
                {fieldErrors.email && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1.5 font-mono">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{fieldErrors.email}</span>
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5">
                Subject
              </label>
              <input
                type="text"
                disabled={status === "sending"}
                value={formState.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                placeholder="Software Development Engineer opportunity"
                className="w-full px-4 py-2.5 rounded-xl bg-[#24130c]/90 border border-white/15 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#d85827]/70 focus:ring-1 focus:ring-[#d85827]/40 disabled:opacity-60 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5">
                Message *
              </label>
              <textarea
                rows={4}
                disabled={status === "sending"}
                value={formState.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Hi Sharvari, we saw your work on payment integrations and ClinicPilot..."
                className={`w-full px-4 py-2.5 rounded-xl bg-[#24130c]/90 border text-sm text-white placeholder-stone-500 focus:outline-none transition-all resize-none disabled:opacity-60 ${
                  fieldErrors.message
                    ? "border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/30"
                    : "border-white/15 focus:border-[#d85827]/70 focus:ring-1 focus:ring-[#d85827]/40"
                }`}
              />
              {fieldErrors.message && (
                <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1.5 font-mono">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{fieldErrors.message}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-[#d85827] to-[#e76735] hover:from-[#c24b1d] hover:to-[#d85827] disabled:opacity-75 disabled:cursor-wait text-white font-semibold text-sm shadow-xl shadow-[#d85827]/30 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Sending via EmailJS...</span>
                </>
              ) : status === "success" ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Sent Successfully!</span>
                </>
              ) : status === "error" ? (
                <>
                  <RotateCcw className="w-4 h-4 text-white" />
                  <span>Try Again</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-stone-400 font-mono pt-1">
              Protected delivery directly to {personal.email}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
