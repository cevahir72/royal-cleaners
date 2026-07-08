"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

export default function AdminHeader() {
  const params = useParams();
  const router = useRouter();
  const { scrollY } = useScroll();
  const [loggingOut, setLoggingOut] = useState(false);

  const bgOpacity = useTransform(scrollY, [0, 60], [0, 0.98]);
  const headerBg = useTransform(bgOpacity, (v) => `rgba(246,243,242,${v})`);
  const headerHeight = useTransform(scrollY, [0, 60], ["80px", "60px"]);
  const borderOpacity = useTransform(scrollY, [0, 60], [0, 1]);
  const borderStyle = useTransform(borderOpacity, (v) => `1px solid rgba(0,0,0,${v * 0.08})`);

  const loginPath = `/${params.adminSlug}/admin`;

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // proceed regardless
    }
    router.push(loginPath);
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        backgroundColor: headerBg,
        height: headerHeight,
        borderBottom: borderStyle,
      }}
      className="w-full top-0 sticky z-50 shadow-sm"
    >
      <nav className="max-w-container-max mx-auto flex justify-between items-center px-margin-desktop h-full">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-display text-headline-md text-primary tracking-tight"
          >
            Royal Cleaners
          </Link>
          <span className="font-label-caps text-label-caps text-secondary tracking-[0.2em] uppercase">
            Admin Panel
          </span>
        </div>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-DEFAULT font-button text-button uppercase tracking-wider cursor-pointer transition-all active:scale-95 hover:bg-primary-container shadow-sm disabled:opacity-60"
        >
          {loggingOut ? (
            <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
          ) : (
            <span className="material-symbols-outlined text-[18px]">logout</span>
          )}
          <span>Logout</span>
        </button>
      </nav>
    </motion.header>
  );
}
