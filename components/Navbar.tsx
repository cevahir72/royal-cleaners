"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/tracking", label: "Tracking" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`w-full top-0 sticky z-50 transition-all duration-300 ${
        scrolled
          ? "h-16 bg-white opacity-95 shadow-sm"
          : "h-20 bg-surface-container-low opacity-95 shadow-sm"
      }`}
    >
      <nav className="max-w-container-max mx-auto flex justify-between items-center px-margin-desktop h-full">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-display text-headline-md text-primary tracking-tight"
          >
            Royal Cleaners
          </Link>
          <div className="hidden md:flex gap-6 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-body-md text-body-md hover:text-secondary transition-colors duration-300 ${
                    isActive
                      ? "text-primary font-bold border-b-2 border-primary pb-1"
                      : "text-on-surface-variant font-medium"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
        <Link
          href="/tracking"
          className="bg-primary text-on-primary px-6 py-3 rounded-DEFAULT font-button text-button uppercase tracking-wider cursor-pointer transition-all active:scale-95 hover:bg-primary-container shadow-sm text-center"
        >
          Track My Order
        </Link>
      </nav>
    </header>
  );
}
