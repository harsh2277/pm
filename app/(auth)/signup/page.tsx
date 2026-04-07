"use client";

import React, { useState } from "react";
import Link from "next/link";
import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import { Mail, Check, Eye } from "lucide-react";

export default function SignUpPage() {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full h-full flex items-center justify-center bg-[var(--background)] rounded-[16px]">
      <div className="w-full max-w-[500px] p-6 lg:p-12">

        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-bold mb-2 tracking-tight text-neutral-900 dark:text-white">
            Create an account
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary-600 hover:text-primary-500 font-semibold hover:underline underline-offset-4 transition-all">
              Log in
            </Link>
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-1">
            <InputField
              label="Full name"
              type="text"
              placeholder="John Doe"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <InputField
            label="Email"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightIcon={Eye}
            required
          />

          <div className="flex items-center my-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-background transition-colors cursor-pointer"
                required
              />
              <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-white transition-colors">
                I agree to the <a href="#" className="text-primary-600 hover:underline">Terms & Conditions</a>
              </span>
            </label>
          </div>

          <Button type="submit" variant="primary" className="w-full mt-2 font-bold py-3.5 shadow-md shadow-primary-500/20">
            Create account
          </Button>

          <div className="flex items-center my-5">
            <div className="flex-1 border-t border-neutral-200 dark:border-neutral-800"></div>
            <span className="px-4 text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              Or register with
            </span>
            <div className="flex-1 border-t border-neutral-200 dark:border-neutral-800"></div>
          </div>

          <div className="w-full">
            <Button type="button" variant="line" className="w-full py-3 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 dark:border-neutral-800 font-semibold text-neutral-700 dark:text-neutral-300 border-neutral-200 flex items-center justify-center gap-[8px]">
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>Google</span>
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
}
