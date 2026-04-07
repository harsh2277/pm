"use client";

import React, { useState } from "react";
import Link from "next/link";
import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import { Mail, CheckCircle2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSuccess(true);
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-[var(--background)] rounded-[16px]">
      <div className="w-full max-w-[500px] p-6 lg:p-12">
        {!success ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-3 tracking-tight text-neutral-900 dark:text-white">
                Reset your password
              </h1>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base">
                Enter your email and we'll send you a link to reset your password.
              </p>
            </div>

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <InputField
                label="Email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={Mail}
                required
              />

              <Button type="submit" variant="primary" className="w-full font-bold py-3.5">
                Send reset link
              </Button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-10">
            <div className="w-16 h-16 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mb-6">
              <Mail className="w-8 h-8 text-success-600 dark:text-success-500" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight text-neutral-900 dark:text-white">
              Check your email
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base mb-8">
              We've sent a password reset link to <br />
              <span className="font-bold text-neutral-800 dark:text-neutral-200">{email}</span>
            </p>

            <Button type="button" variant="primary" className="w-full font-bold py-3.5 mb-4" onClick={() => setSuccess(false)}>
              Back to log in
            </Button>

            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Didn't receive the email? <button onClick={() => { }} className="text-primary-600 hover:text-primary-500 hover:underline transition-colors font-semibold">Click to resend</button>
            </p>
          </div>
        )}

        {!success && (
          <div className="mt-8 flex justify-center">
            <Link
              href="/login"
              className="flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              Back to log in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
