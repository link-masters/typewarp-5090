"use client";

import React, { useState } from "react";
import { sendEmail } from "@/app/actions/email";

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

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        <div className="space-y-3">
          <label
            htmlFor="contact-name"
            className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500"
          >
            Full Name
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            required
            disabled={isPending}
            className="w-full bg-white dark:bg-[var(--card-bg)] border border-zinc-200 dark:border-[var(--card-border)] rounded-xl px-6 py-5 text-[var(--foreground)] outline-none focus:border-red-500/50 transition-all font-bold placeholder:text-zinc-500 shadow-sm dark:shadow-none"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-3">
          <label
            htmlFor="contact-email"
            className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500"
          >
            Email Address
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            required
            disabled={isPending}
            className="w-full bg-white dark:bg-[var(--card-bg)] border border-zinc-200 dark:border-[var(--card-border)] rounded-xl px-6 py-5 text-[var(--foreground)] outline-none focus:border-red-500/50 transition-all font-bold placeholder:text-zinc-500 shadow-sm dark:shadow-none"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label
          htmlFor="contact-message"
          className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500"
        >
          Message Details
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          disabled={isPending}
          className="w-full bg-white dark:bg-[var(--card-bg)] border border-zinc-200 dark:border-[var(--card-border)] rounded-xl px-6 py-5 text-[var(--foreground)] outline-none focus:border-red-500/50 transition-all font-bold placeholder:text-zinc-500 h-48 resize-none shadow-sm dark:shadow-none"
          placeholder="What do you have in mind?"
        ></textarea>
      </div>

      {status.message && (
        <div
          role="alert"
          className={`p-6 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
            status.type === "success"
              ? "bg-emerald-500/10 text-emerald-500"
              : "bg-red-500/10 text-red-500"
          }`}
        >
          {status.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-4 bg-[var(--foreground)] text-[var(--background)] px-10 py-5 rounded-xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-lg dark:shadow-none"
      >
        <span>{isPending ? "Sending..." : "Submit Inquiry"}</span>
        <svg
          className="w-5 h-5 translate-y-[-1px]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button>
    </form>
  );
}
