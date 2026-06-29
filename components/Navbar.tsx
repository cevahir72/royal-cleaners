"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/tracking", label: "Tracking" },
  { href: "/contact", label: "Contact" },
];

const itemVariants: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, [0, 60], [0, 0.98]);
  const headerBg = useTransform(bgOpacity, (v) => `rgba(246,243,242,${v})`);
  const headerHeight = useTransform(scrollY, [0, 60], ["80px", "60px"]);
  const borderOpacity = useTransform(scrollY, [0, 60], [0, 1]);
  const borderStyle = useTransform(
    borderOpacity,
    (v) => `1px solid rgba(0,0,0,${v * 0.08})`
  );

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
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link
              href="/"
              className="font-display text-headline-md text-primary tracking-tight"
            >
              Royal Cleaners
            </Link>
          </motion.div>
          <motion.div
            className="hidden md:flex gap-6 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <motion.div key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    className={`font-body-md text-body-md hover:text-secondary transition-colors duration-300 ${
                      isActive
                        ? "text-primary font-bold border-b-2 border-primary pb-1"
                        : "text-on-surface-variant font-medium"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <Link
            href="/tracking"
            className="bg-primary text-on-primary px-6 py-3 rounded-DEFAULT font-button text-button uppercase tracking-wider cursor-pointer transition-all active:scale-95 hover:bg-primary-container shadow-sm text-center"
          >
            Track My Order
          </Link>
        </motion.div>
      </nav>
    </motion.header>
  );
}
