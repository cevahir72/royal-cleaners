"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";

type FormErrors = {
  email?: string;
  password?: string;
};

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [serverError, setServerError] = useState("");

  const params = useParams();
  const router = useRouter();
  const dashboardPath = `/${params.adminSlug}/admin/dashboard`;

  function validate(): FormErrors {
    const errs: FormErrors = {};

    if (!email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Enter a valid email address.";
    }

    if (!password.trim()) {
      errs.password = "Password is required.";
    } else if (password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }

    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(() => router.push(dashboardPath), 800);
      } else {
        const body = await res.json().catch(() => ({}));
        setStatus("error");
        setServerError(body.error || "Invalid email or password. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerError("Could not connect to the server. Please try again later.");
    }
  }

  function getSubmitContent() {
    switch (status) {
      case "loading":
        return (
          <>
            <span className="material-symbols-outlined animate-spin">progress_activity</span>
          </>
        );
      case "success":
        return (
          <>
            <span className="material-symbols-outlined">check_circle</span>
            <span>Success</span>
          </>
        );
      default:
        return (
          <>
            <span>Sign In</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </>
        );
    }
  }

  const isSuccess = status === "success";

  return (
    <main className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center px-margin-mobile md:px-margin-desktop py-section-gap">
        <div className="w-full max-w-[440px] flex flex-col items-center">
          {/* Branding */}
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center justify-center mb-4">
              <span
                className="material-symbols-outlined text-[40px] text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                laundry
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md font-bold text-primary tracking-tight">
              Royal Cleaners
            </h1>
            <p className="font-label-caps text-label-caps text-secondary mt-1">
              EST. 2024 &middot; PREMIUM CARE
            </p>
          </motion.div>

          {/* Login Card */}
          <motion.div
            className="bg-surface-container-lowest w-full p-10 rounded-lg border border-outline-variant/30"
            style={{
              boxShadow:
                "0 10px 40px rgba(0,0,0,0.04), 0 2px 10px rgba(0,0,0,0.02)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div className="mb-8">
              <h2 className="font-headline-md text-headline-md text-primary-container font-semibold mb-2">
                Admin Login
              </h2>
              <p className="font-body-md text-on-surface-variant text-sm">
                Enter your credentials to access the admin panel.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Server Error */}
              {status === "error" && (
                <motion.div
                  className="bg-error-container text-on-error-container p-4 rounded-DEFAULT flex items-start gap-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <span className="material-symbols-outlined text-[20px] mt-0.5">error</span>
                  <p className="font-body-md text-body-md text-sm">{serverError}</p>
                </motion.div>
              )}

              {/* Success Message */}
              {isSuccess && (
                <motion.div
                  className="bg-[#e9c176]/20 text-secondary p-4 rounded-DEFAULT flex items-start gap-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <span className="material-symbols-outlined text-[20px] mt-0.5">check_circle</span>
                  <p className="font-body-md text-body-md text-sm">
                    Login successful! Redirecting to the admin panel...
                  </p>
                </motion.div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  className="font-label-caps text-label-caps text-primary uppercase tracking-widest"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-secondary transition-colors pointer-events-none">
                    alternate_email
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="yourname@royalcleaners.co.uk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSuccess}
                    className={`w-full pl-12 pr-4 py-4 bg-transparent border rounded-DEFAULT font-body-md outline-none transition-all placeholder:text-outline-variant ${
                      errors.email
                        ? "border-error"
                        : "border-outline-variant focus:border-secondary focus:shadow-[0_0_0_3px_rgba(119,90,25,0.1)]"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="font-body-md text-body-md text-error text-xs flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label
                    className="font-label-caps text-label-caps text-primary uppercase tracking-widest"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="font-label-caps text-label-caps text-primary hover:text-secondary transition-colors underline-offset-4 hover:underline"
                  >
                    Forgot Password
                  </a>
                </div>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-secondary transition-colors pointer-events-none">
                    lock
                  </span>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSuccess}
                    className={`w-full pl-12 pr-4 py-4 bg-transparent border rounded-DEFAULT font-body-md outline-none transition-all placeholder:text-outline-variant ${
                      errors.password
                        ? "border-error"
                        : "border-outline-variant focus:border-secondary focus:shadow-[0_0_0_3px_rgba(119,90,25,0.1)]"
                    }`}
                  />
                </div>
                {errors.password && (
                  <p className="font-body-md text-body-md text-error text-xs flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading" || isSuccess}
                className={`w-full py-5 rounded-DEFAULT font-button text-button uppercase tracking-widest transition-all flex items-center justify-center gap-2 mt-4 ${
                  isSuccess
                    ? "bg-green-600 text-white cursor-not-allowed"
                    : status === "loading"
                      ? "bg-secondary/70 text-primary-fixed-dim cursor-not-allowed"
                      : "bg-secondary text-primary-fixed-dim hover:brightness-90 hover:-translate-y-[1px] active:brightness-75"
                }`}
              >
                {getSubmitContent()}
              </button>
            </form>

            {/* Security Info */}
            <div className="mt-10 pt-8 border-t border-outline-variant/20 flex items-start gap-3 text-on-surface-variant">
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
              <p className="text-[12px] font-body-md italic leading-tight">
                This login page is protected by 256-bit encryption and is intended for authorized personnel only.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 text-center px-margin-mobile border-t border-outline-variant/10">
        <p className="font-label-caps text-label-caps text-on-surface-variant">
          &copy; 2024 Royal Cleaners. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
