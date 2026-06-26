"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";

const fabricThumbs = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAXgay2m3kSm9eJWUmTA2kN9ddb-lmqH1fEMp2JfJWiJeNPvLH4re4GcSCMNhoLMxg22UTj7XsFQbNvvzZIzbCUaT6EyYJb9-KSv74qwX6RpYXFvm0XU03O2IncZ2yRWKOslGqfWhnVVcPgtjWnK_5EbIPESc7b3KkOtqLn9qqIfR3ifs-OyNhV9j7E8OAgSTWJyb3pIVdjHDUrVtwN0sb70eMABBCn0FDYZn4J53CWkxRRaoPhcLv7miw8mM3GsbdKg4GjSD5vNMmW",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD46uoNUUD2JhdS6MBxzVncDpxQFUA_CzPMw7CmpAq8aggRPF7rqVy5Fvnpp5DK83Ool11VJuzUE_Z1Xy0IY4MjuLXhoTaTJ_7h5MPOkjkYb4sRzLJRgYnrJT7k7UiPOx30CemTBIc5eLfndAnw5KpeFyZOQvYuTCPOSNbfHmR2pirgIyQ_zaLJJCtuBg7Ny4wY_xCHbxE4WIpsliBmDAZ1F7enJPPRqxwMDCeB0m6MBsxYQwrB7WOu-dKguMS3RHiBXb4EZTPpUjS0",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAYNe6snZpkF2ZdbYqh_Jl0MB-BOD4NyrxLTP6I2pEW2LBwOkJ6awCn-s67pa1fQXAxlR1HmiS1bpP01ju9iLcYjh5iiIQ14FPUt9N5V21bTBHRZJSp_JM-MvWj5bw-DeJFQYBfl77chT78SkxxaqE2wc02z9zZSPZhQIeeMQbX2DQvy9lmMe7DDxnBPHUSjtQx-kRYkVlBhGynRpjvT7hoCd2xpOW7D7CZeggtcCoLW_02ystQYBTdMudSOoEqzUh387zC1nQ-O2D_",
];

const stages = [
  { label: "PENDING", icon: "receipt" },
  { label: "IN PROCESS", icon: "iron" },
  { label: "READY", icon: "auto_awesome" },
];


function TrackingForm() {
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSearching(true);
      setResult(null);
      setTimeout(() => {
        setSearching(false);
        setResult(
          "Order RC-1024 found. Status: Your garments are currently being meticulously inspected."
        );
      }, 1500);
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xAxis = (rect.width / 2 - x) / 40;
      const yAxis = (rect.height / 2 - y) / 40;
      cardRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-white/70 backdrop-blur-md w-full p-8 md:p-12 rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.06)] border border-white/40 transition-transform duration-200 ease-out"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="font-label-caps text-label-caps text-on-surface-variant">
              EMAIL ADDRESS
            </label>
            <input
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-colors py-3 px-0 font-body-md text-on-surface placeholder:text-on-surface-variant/50 outline-none"
              placeholder="name@example.com"
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <label className="font-label-caps text-label-caps text-on-surface-variant">
              RECEIPT NUMBER / ORDER ID
            </label>
            <input
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-colors py-3 px-0 font-body-md text-on-surface uppercase placeholder:text-on-surface-variant/50 outline-none"
              placeholder="RC-1024"
              required
              type="text"
            />
          </div>
        </div>
        <motion.button
          className="w-full bg-secondary text-white py-5 font-button text-button tracking-[0.1em] hover:bg-on-secondary-container transition-all duration-300 shadow-md mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
          type="submit"
          disabled={searching}
          whileTap={{ scale: 0.98 }}
        >
          {searching ? "SEARCHING..." : "TRACK STATUS"}
        </motion.button>
      </form>

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

      <div className="mt-16 border-t border-outline-variant/30 pt-12">
        <div className="flex items-start justify-between relative w-full">
          {stages.map((stage, i) => (
            <div key={stage.label} className="flex flex-col items-center z-10 w-1/3">
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-transform ${
                  i === 0
                    ? "bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(26,54,93,0.3)]"
                    : "bg-surface-container-high text-outline"
                }`}
                whileHover={{ scale: 1.1 }}
              >
                <span
                  className="material-symbols-outlined"
                  style={i === 0 ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {stage.icon}
                </span>
              </motion.div>
              <span
                className={`font-label-caps text-[10px] text-center ${
                  i === 0 ? "text-primary" : "text-on-surface-variant opacity-60"
                }`}
              >
                {stage.label}
              </span>
              {i < stages.length - 1 && (
                <div
                  className={`stepper-line ${i === 0 ? "active" : ""}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-12 text-center text-on-surface-variant opacity-70 font-body-md text-[14px] italic">
        Your status is updated in real-time. You will also receive an email
        notification when your clothes are ready.
      </p>
    </div>
  );
}

function FabricRow() {
  return (
    <motion.div
      className="mt-16 grid grid-cols-3 gap-8 w-full max-w-lg opacity-40 grayscale hover:grayscale-0 transition-all duration-500 mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {fabricThumbs.map((src, i) => (
        <img
          key={i}
          className="w-full h-12 object-cover rounded-sm"
          src={src}
          alt=""
        />
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
                PREMIUM CARE
              </span>
              <h1 className="font-display text-display text-primary mb-4">
                Track Your Garments
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
