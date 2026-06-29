"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorVariant = "default" | "link" | "expand" | "light";

const springConfig = { stiffness: 400, damping: 28 };

export default function CursorFollower() {
  const [variant, setVariant] = useState<CursorVariant>("default");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const expand = target.closest("[data-cursor='expand']");
      const link = target.closest("button, a, [role='button']");
      const light = target.closest("[data-cursor='light']");

      if (expand) {
        setVariant("expand");
      } else if (link) {
        setVariant("link");
      } else if (light) {
        setVariant("light");
      } else {
        setVariant("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = "";
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
      style={{
        x: springX,
        y: springY,
        translate: "-50% -50%",
      }}
      animate={{
        width: variant === "default" ? 12 : variant === "light" ? 12 : variant === "link" ? 32 : 64,
        height: variant === "default" ? 12 : variant === "light" ? 12 : variant === "link" ? 32 : 64,
        backgroundColor:
          variant === "default"
            ? "#002045"
            : variant === "light"
              ? "#f5f0eb"
              : variant === "link"
                ? "#ffffff"
                : "transparent",
        borderWidth: variant === "expand" ? 2 : 0,
        borderStyle: variant === "expand" ? "solid" : "none",
        borderColor:
          variant === "expand" ? "rgba(255,255,255,0.7)" : "transparent",
        mixBlendMode: variant === "link" ? "difference" : "normal",
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 28,
      }}
    />
  );
}
