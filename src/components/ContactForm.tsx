"use client";

import React, { useState } from "react";
import { sendEmail } from "@/app/actions/email";
import { motion } from "framer-motion";
import { Terminal, Send, CheckCircle2, AlertCircle } from "lucide-react";

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
    "w-full bg-bg-void border border-white/10 px-6 py-5 text-text-primary outline-none focus:border-accent-glitch/50 transition-all font-mono text-sm placeholder:text-white/5";

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label
            htmlFor="contact-name"
            className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-accent-glitch flex items-center gap-2"
          >
            <Terminal className="w-3 h-3" />
            FIELD: FULL_NAME
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            required
            disabled={isPending}
            className={inputClasses}
            placeholder="NAME_REQUIRED"
          />
        </div>
        <div className="space-y-4">
          <label
            htmlFor="contact-email"
            className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-accent-glitch flex items-center gap-2"
          >
            <Terminal className="w-3 h-3" />
            FIELD: EMAIL_ADDRESS
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            required
            disabled={isPending}
            className={inputClasses}
            placeholder="ADDRESS_REQUIRED"
          />
        </div>
      </div>

      <div className="space-y-4">
        <label
          htmlFor="contact-message"
          className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-accent-glitch flex items-center gap-2"
        >
          <Terminal className="w-3 h-3" />
          FIELD: MESSAGE_PAYLOAD
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          disabled={isPending}
          className={`${inputClasses} h-48 resize-none`}
          placeholder="ENTER_DATA_HERE..."
        ></textarea>
      </div>

      {status.message && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          role="alert"
          className={`p-6 border font-mono text-[10px] uppercase tracking-widest flex items-center gap-4 ${
            status.type === "success"
              ? "border-accent-glitch/30 bg-accent-glitch/5 text-accent-glitch"
              : "border-red-500/30 bg-red-500/5 text-red-500"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          {status.message}
        </motion.div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="group relative inline-flex items-center gap-4 bg-accent-glitch text-black px-12 py-5 font-black text-xs uppercase tracking-[0.3em] active:scale-95 transition-all disabled:opacity-50 overflow-hidden"
      >
        <span className="relative z-10">
          {isPending ? "TRANSMITTING..." : "SUBMIT_SIGNAL"}
        </span>
        <Send className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </form>
  );
}
