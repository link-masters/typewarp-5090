"use client";

import React, { useState } from "react";
import { sendEmail } from "@/app/actions/email";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string | null;
  }>({ type: null, message: null });
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setStatus({ type: null, message: null });

    const formData = new FormData(event.currentTarget);
    const result = await sendEmail(formData);

    if (result.error) {
      setStatus({ type: "error", message: result.error });
    } else if (result.success) {
      setStatus({ type: "success", message: result.success });
      (event.target as HTMLFormElement).reset();
    }
    setIsPending(false);
  }

  const inputClasses =
    "w-full bg-bg-void/40 border border-white/10 px-3.5 py-2.5 md:px-4 md:py-3 text-xs md:text-sm text-text-primary outline-none focus:border-accent-glitch/50 transition-all placeholder:text-white/20 rounded-xl";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
      <div className="space-y-4 md:space-y-5">
        <div className="text-left">
          <label
            htmlFor="contact-name"
            className="text-[10px] text-text-muted mb-1.5 block font-mono uppercase tracking-wider font-bold"
          >
            First Name
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            required
            disabled={isPending}
            className={inputClasses}
            placeholder="John"
          />
        </div>

        <div className="text-left">
          <label
            htmlFor="contact-email"
            className="text-[10px] text-text-muted mb-1.5 block font-mono uppercase tracking-wider font-bold"
          >
            Email Address
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            required
            disabled={isPending}
            className={inputClasses}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="text-left">
        <label
          htmlFor="contact-message"
          className="text-[10px] text-text-muted mb-1.5 block font-mono uppercase tracking-wider font-bold"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          disabled={isPending}
          rows={5}
          className={`${inputClasses} resize-none`}
          placeholder="How can we help?"
        ></textarea>
      </div>

      {status.message && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl text-xs flex items-center gap-3 ${
            status.type === "success"
              ? "bg-accent-glitch/10 text-accent-glitch border border-accent-glitch/20"
              : "bg-red-500/10 text-red-500 border border-red-500/20"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
          )}
          <span>{status.message}</span>
        </motion.div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto h-12 flex items-center justify-center gap-3 bg-accent-glitch text-black px-8 text-xs font-bold uppercase tracking-widest rounded-xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent-glitch/10"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
