"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const curtainEase = [0.76, 0, 0.24, 1] as const;

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isTracking = pathname === "/tracking";

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div key={pathname}>
        {!isTracking && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-[#002045] pointer-events-none"
              initial={{ y: "100%" }}
              animate={{ y: "100%" }}
              exit={{ y: "0%" }}
              transition={{ duration: 0.45, ease: curtainEase }}
            />

            <motion.div
              className="fixed inset-0 z-50 bg-[#002045] pointer-events-none"
              initial={{ y: "0%" }}
              animate={{ y: "-100%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.45, ease: curtainEase }}
            />
          </>
        )}

        <motion.div
          initial={{ opacity: 0, y: isTracking ? 0 : 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: isTracking
              ? { duration: 0.25 }
              : { delay: 0.75, duration: 0.15 },
          }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
