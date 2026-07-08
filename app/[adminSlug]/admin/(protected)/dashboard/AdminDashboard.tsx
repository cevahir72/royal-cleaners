"use client";

import { useEffect, useRef, useState } from "react";
import AdminHeader from "@/components/AdminHeader";
import { motion, useScroll } from "framer-motion";

export default function AdminDashboard() {
  const { scrollYProgress } = useScroll();
  const [lastOrderNumber, setLastOrderNumber] = useState<string | null>(null);
  const [loadingReceipt, setLoadingReceipt] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const formScriptRef = useRef(false);

  const fetchLastReceipt = useRef<() => void>();

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const res = await fetch(
          "https://royal-cleaners-backend.vercel.app/api/order/last-receipt"
        );
        const data = await res.json();
        if (!cancelled) {
          setLastOrderNumber(data?.receipt_id ?? JSON.stringify(data));
        }
      } catch {
        if (!cancelled) {
          setLastOrderNumber("--");
        }
      } finally {
        if (!cancelled) setLoadingReceipt(false);
      }
    }

    fetchLastReceipt.current = () => {
      setLoadingReceipt(true);
      fetchData();
    };

    fetchLastReceipt.current();

    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (formScriptRef.current) return;
    const script = document.createElement("script");
    script.src = "https://api.centernex.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    formScriptRef.current = true;
  }, []);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const data = event.data;
      if (!data || typeof data !== "object") return;

      const type =
        data.type ?? data.event ?? data.messageType ?? "";

      if (
        type === "form-submitted" ||
        type === "form_submitted" ||
        type === "submitted" ||
        type === "thankyou" ||
        type === "thankyou-page" ||
        /submit/i.test(type)
      ) {
        setFormSubmitted(true);
        fetchLastReceipt.current?.();
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#e9c176] z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
      />
      <AdminHeader />
      <main className="bg-surface text-on-surface font-body-md min-h-screen">
        {/* Banner */}
        <section className="w-full bg-primary py-16">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="font-label-caps text-label-caps text-on-primary/70 tracking-[0.2em] uppercase block mb-2">
                Welcome Back
              </span>
              <h1 className="font-display text-display text-on-primary font-bold tracking-tight">
                Admin Panel
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Last Order Number */}
        <section className="w-full bg-surface-container-lowest border-b border-surface-container">
          <div className="max-w-container-max mx-auto px-margin-desktop py-6">
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              <span className="material-symbols-outlined text-[32px] text-secondary">
                receipt_long
              </span>
              <span className="font-headline-md text-headline-md text-primary font-semibold">
                The Last Order Number:
              </span>
              {loadingReceipt ? (
                <span className="material-symbols-outlined animate-spin text-[24px] text-secondary">
                  progress_activity
                </span>
              ) : (
                <span className="font-display text-display text-secondary font-bold tracking-tight">
                  {lastOrderNumber}
                </span>
              )}
            </motion.div>
          </div>
        </section>

        {/* Order Form Widget */}
        <section className="w-full bg-surface px-margin-desktop py-8">
          <div className="max-w-container-max mx-auto min-h-[600px]">
            {formSubmitted ? (
              <motion.div
                className="flex flex-col items-center justify-center w-full min-h-[500px] bg-surface-container-lowest rounded-xl soft-shadow border border-surface-container"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <span
                  className="material-symbols-outlined text-[72px] text-green-500"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <h2 className="font-headline-md text-headline-md text-primary font-semibold mt-4">
                  Order Submitted Successfully
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 mb-8">
                  Your order has been received and is being processed.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormKey((k) => k + 1);
                  }}
                  className="flex items-center gap-2 bg-secondary text-primary-fixed-dim px-8 py-4 rounded-DEFAULT font-button text-button uppercase tracking-wider transition-all hover:brightness-90 active:brightness-75 active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">add_circle</span>
                  <span>Click for New Order</span>
                </button>
                <button
                  onClick={() => fetchLastReceipt.current?.()}
                  className="flex items-center gap-2 mt-4 text-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer bg-transparent border-none underline-offset-2 hover:underline"
                >
                  <span className="material-symbols-outlined text-[16px]">refresh</span>
                  <span>Refresh page data</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={formKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <iframe
                  src="https://api.centernex.com/widget/form/Uy60PujPBPDaFJCOVnMI"
                  style={{ width: "100%", height: "1896px", border: "none", borderRadius: "8px" }}
                  id="inline-Uy60PujPBPDaFJCOVnMI"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="New Order Form"
                  data-height="1896"
                  data-layout-iframe-id="inline-Uy60PujPBPDaFJCOVnMI"
                  data-form-id="Uy60PujPBPDaFJCOVnMI"
                  title="New Order Form"
                  className="w-full"
                />
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
