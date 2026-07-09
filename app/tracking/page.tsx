"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useCallback, useRef, Fragment } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import RevealText from "@/components/RevealText";

const fabricThumbs = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAXgay2m3kSm9eJWUmTA2kN9ddb-lmqH1fEMp2JfJWiJeNPvLH4re4GcSCMNhoLMxg22UTj7XsFQbNvvzZIzbCUaT6EyYJb9-KSv74qwX6RpYXFvm0XU03O2IncZ2yRWKOslGqfWhnVVcPgtjWnK_5EbIPESc7b3KkOtqLn9qqIfR3ifs-OyNhV9j7E8OAgSTWJyb3pIVdjHDUrVtwN0sb70eMABBCn0FDYZn4J53CWkxRRaoPhcLv7miw8mM3GsbdKg4GjSD5vNMmW",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD46uoNUUD2JhdS6MBxzVncDpxQFUA_CzPMw7CmpAq8aggRPF7rqVy5Fvnpp5DK83Ool11VJuzUE_Z1Xy0IY4MjuLXhoTaTJ_7h5MPOkjkYb4sRzLJRgYnrJT7k7UiPOx30CemTBIc5eLfndAnw5KpeFyZOQvYuTCPOSNbfHmR2pirgIyQ_zaLJJCtuBg7Ny4wY_xCHbxE4WIpsliBmDAZ1F7enJPPRqxwMDCeB0m6MBsxYQwrB7WOu-dKguMS3RHiBXb4EZTPpUjS0",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAYNe6snZpkF2ZdbYqh_Jl0MB-BOD4NyrxLTP6I2pEW2LBwOkJ6awCn-s67pa1fQXAxlR1HmiS1bpP01ju9iLcYjh5iiIQ14FPUt9N5V21bTBHRZJSp_JM-MvWj5bw-DeJFQYBfl77chT78SkxxaqE2wc02z9zZSPZhQIeeMQbX2DQvy9lmMe7DDxnBPHUSjtQx-kRYkVlBhGynRpjvT7hoCd2xpOW7D7CZeggtcCoLW_02ystQYBTdMudSOoEqzUh387zC1nQ-O2D_",
];
const fabricLabels = ["Premium Wool", "Silk Satin", "Cotton Linen"];

const stages = [
  { label: "Order Received", icon: "receipt" },
  { label: "On Process", icon: "iron" },
  { label: "Ready for Pickup", icon: "auto_awesome" },
];

const stageColors = [
  { bg: "#ef4444", light: "#fecaca", ring: "rgba(239,68,68,0.35)" },
  { bg: "#f97316", light: "#fed7aa", ring: "rgba(249,115,22,0.35)" },
  { bg: "#22c55e", light: "#bbf7d0", ring: "rgba(34,197,94,0.35)" },
];

function mapStatusToStage(status: string): number {
  const s = status.toLowerCase().trim();
  if (s.includes("received")) return 0;
  if (s.includes("progress") || s.includes("process")) return 1;
  if (s.includes("ready") || s.includes("pickup")) return 2;
  return 1;
}

interface ConfettiParticle {
  size: number;
  color: string;
  isCircle: boolean;
  x: number;
  y: number;
  trajectoryX: number;
  trajectoryY: number;
  rotation: number;
  duration: number;
}

function generateConfetti(originX: number, originY: number): ConfettiParticle[] {
  const colors = ["#e9c176", "#d4a853", "#002045", "#1a365d"];
  return Array.from({ length: 30 }, () => ({
    size: Math.random() * 8 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    isCircle: Math.random() > 0.5,
    x: originX,
    y: originY,
    trajectoryX: (Math.random() - 0.5) * 500,
    trajectoryY: Math.random() * 600 + 200,
    rotation: Math.random() * 720,
    duration: Math.random() * 1.5 + 1.2,
  }));
}

function TrackingForm() {
  const [searching, setSearching] = useState(false);
  const [queryDone, setQueryDone] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeStage, setActiveStage] = useState(-1);
  const [confetti, setConfetti] = useState<ConfettiParticle[] | null>(null);
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(smoothY, [-1, 1], [8, -8]);
  const rotateY = useTransform(smoothX, [-1, 1], [-8, 8]);

  const sheenX = useTransform(smoothX, [-1, 1], ["-100%", "100%"]);

  const isCompleted = (i: number) => i < activeStage;
  const isCurrent = (i: number) => i === activeStage;

  const handleNewQuery = useCallback(() => {
    setQueryDone(false);
    setResult(null);
    setError(null);
    setActiveStage(-1);
    setConfetti(null);
    setEmail("");
    setOrderId("");
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const trimmedEmail = email.trim();
      const trimmedId = orderId.trim().toUpperCase();

      if (!trimmedEmail || !trimmedId) return;

      setSearching(true);
      setResult(null);
      setError(null);
      setActiveStage(-1);
      setConfetti(null);
      setQueryDone(false);

      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_ORDER_STATUS_URL!,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: trimmedEmail, receiptId: trimmedId }),
          }
        );

        const data = await res.json();

        if (!res.ok || data.error) {
          setError("Order not found. Please check your details and try again.");
          setSearching(false);
          setQueryDone(true);
          return;
        }

        const stageIndex = mapStatusToStage(data.status);
        setResult(`Order ${data.receiptId} — ${stages[stageIndex].label}`);
        setActiveStage(stageIndex);

        if (buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect();
          setConfetti(
            generateConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2)
          );
          setTimeout(() => setConfetti(null), 4000);
        }
      } catch {
        setError("Unable to connect. Please check your connection and try again.");
      } finally {
        setSearching(false);
        setQueryDone(true);
      }
    },
    [email, orderId]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x * 2 - 1);
      mouseY.set(y * 2 - 1);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      className="relative bg-white/70 backdrop-blur-md w-full p-8 md:p-12 rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.06)] border border-white/40 overflow-hidden"
      style={{ transformPerspective: 1000, rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.15) 55%, transparent 70%)",
          x: sheenX,
        }}
      />
      <form className="space-y-8" onSubmit={handleSubmit}>
        <motion.div
          animate={{
            filter: searching ? "blur(4px)" : "blur(0px)",
            scale: searching ? 0.97 : 1,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant">
                EMAIL ADDRESS
              </label>
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-colors py-3 px-0 font-body-md text-on-surface placeholder:text-on-surface-variant/50 outline-none"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                disabled={searching}
              />
            </div>
            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant">
                RECEIPT NUMBER
              </label>
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-colors py-3 px-0 font-body-md text-on-surface uppercase placeholder:text-on-surface-variant/50 outline-none"
                placeholder="RC-10009"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
                type="text"
                disabled={searching}
              />
            </div>
          </div>
        </motion.div>
        <motion.button
          ref={buttonRef}
          layout
          className="w-full bg-secondary text-white py-5 font-button text-button tracking-[0.1em] hover:bg-on-secondary-container transition-all duration-300 shadow-md mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
          type="submit"
          disabled={searching}
          whileTap={{ scale: 0.98 }}
        >
          <AnimatePresence mode="wait">
            {searching ? (
              <motion.span
                key="loading"
                className="flex items-center justify-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <motion.circle
                    cx="12" cy="12" r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="62.8"
                    animate={{ strokeDashoffset: [62.8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.svg>
                SEARCHING...
              </motion.span>
            ) : queryDone && !error ? (
              <motion.span
                key="success"
                className="flex items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 6 L8 15 L4 10" />
                </svg>
                TRACKED
              </motion.span>
            ) : (
              <motion.span
                key="text"
                className="block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                TRACK STATUS
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </form>

      <AnimatePresence>
        {(activeStage >= 0 || error) && (
          <motion.div
            key="result-section"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {error ? (
              <motion.div
                className="mt-8 p-4 bg-error-container/40 rounded-lg border border-error/20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>
                    error
                  </span>
                  <p className="font-body-md text-body-md text-on-surface">
                    {error}
                  </p>
                </div>
              </motion.div>
            ) : (
              <>
                <div className="mt-16 border-t border-outline-variant/30 pt-12">
                  <div className="flex items-start w-full">
                    {stages.map((stage, i) => (
                      <Fragment key={stage.label}>
                        <div className="flex flex-col items-center flex-[0_0_auto]">
                          <motion.div
                            className="w-12 h-12 rounded-full flex items-center justify-center relative z-10"
                            style={{
                              backgroundColor:
                                isCompleted(i)
                                  ? stageColors[i].light
                                  : isCurrent(i)
                                    ? stageColors[i].bg
                                    : "var(--color-surface-container-high, #eae9e8)",
                              color:
                                isCompleted(i)
                                  ? stageColors[i].bg
                                  : isCurrent(i)
                                    ? "#ffffff"
                                    : "var(--color-outline, #857b76)",
                            }}
                            animate={
                              isCurrent(i)
                                ? {
                                    scale: [1, 1.15, 1],
                                    boxShadow: [
                                      `0 0 8px ${stageColors[i].ring}`,
                                      `0 0 20px ${stageColors[i].ring}`,
                                      `0 0 8px ${stageColors[i].ring}`,
                                    ],
                                  }
                                : isCompleted(i)
                                  ? { boxShadow: `0 0 8px ${stageColors[i].ring}` }
                                  : {}
                            }
                            transition={
                              isCurrent(i)
                                ? {
                                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                                    boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                                  }
                                : { duration: 0.4 }
                            }
                          >
                            <span
                              className="material-symbols-outlined"
                              style={
                                isCurrent(i) || isCompleted(i)
                                  ? { fontVariationSettings: "'FILL' 1" }
                                  : undefined
                              }
                            >
                              {isCompleted(i) ? "check" : stage.icon}
                            </span>
                          </motion.div>
                          <span
                            className={`font-label-caps text-[10px] text-center mt-3 max-w-[80px] leading-tight ${
                              isCurrent(i) || isCompleted(i)
                                ? "text-primary"
                                : "text-on-surface-variant opacity-60"
                            }`}
                          >
                            {stage.label}
                          </span>
                        </div>
                        {i < stages.length - 1 && (
                          <div
                            className="flex-1 h-[2px] relative mx-4"
                            style={{ marginTop: "22px" }}
                          >
                            <div className="absolute inset-0 bg-outline-variant" />
                            <motion.div
                              className="absolute inset-y-0 left-0"
                              style={{ backgroundColor: stageColors[i].bg }}
                              animate={{ width: isCompleted(i) ? "100%" : "0%" }}
                              transition={{ duration: 0.6, ease: "easeInOut" }}
                            />
                          </div>
                        )}
                      </Fragment>
                    ))}
                  </div>
                </div>

                {result && (
                  <motion.div
                    className="mt-8 p-4 bg-secondary-container/30 rounded-lg border border-secondary-fixed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="font-body-md text-body-md text-on-secondary-container">
                      {result}
                    </p>
                  </motion.div>
                )}

                <p className="mt-12 text-center text-on-surface-variant opacity-70 font-body-md text-[14px] italic">
                  Your status is updated in real-time. You will also receive an email
                  notification when your clothes are ready.
                </p>
              </>
            )}

            <AnimatePresence>
              {queryDone && (
                <motion.div
                  className="mt-8 flex justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <motion.button
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary font-button text-button tracking-[0.08em] hover:bg-primary-container transition-colors duration-300 shadow-md"
                    onClick={handleNewQuery}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      refresh
                    </span>
                    NEW QUERY
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confetti && confetti.map((p, i) => (
          <motion.div
            key={i}
            className="fixed pointer-events-none z-50"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.isCircle ? "50%" : "2px",
              left: p.x,
              top: p.y,
            }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{
              x: p.trajectoryX,
              y: p.trajectoryY,
              opacity: 0,
              rotate: p.rotation,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: p.duration,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

function FabricRow() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      className="mt-16 w-full max-w-lg mx-auto flex gap-4 items-stretch"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {fabricThumbs.map((src, i) => (
        <motion.div
          key={i}
          layout
          className="relative rounded-sm overflow-hidden cursor-pointer bg-surface-container-high"
          style={{
            flex: i === hoveredIndex ? 3 : hoveredIndex === null ? 1 : 0.3,
          }}
          onMouseEnter={() => setHoveredIndex(i)}
          animate={{
            height: i === hoveredIndex ? 280 : hoveredIndex === null ? 48 : 40,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={src}
            alt=""
          />
          <AnimatePresence>
            {hoveredIndex === i && (
              <motion.div
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <span className="text-white text-sm font-medium">
                  {fabricLabels[i]}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function TrackingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col relative overflow-hidden bg-surface-bright text-on-surface">
        <section className="relative z-10 flex-grow flex items-center justify-center py-section-gap px-margin-mobile">
          <div className="w-full max-w-2xl flex flex-col items-center">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="font-label-caps text-label-caps text-secondary tracking-[0.2em] mb-4 block">
                <RevealText>PREMIUM CARE</RevealText>
              </span>
              <h1 className="font-display text-display text-primary mb-4">
                <RevealText>Track Your Garments</RevealText>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mx-auto">
                Enter your details to view the real-time status of your
                professional cleaning order.
              </p>
            </motion.div>
            <TrackingForm />
            <FabricRow />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
