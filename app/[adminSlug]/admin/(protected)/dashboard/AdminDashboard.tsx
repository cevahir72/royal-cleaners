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

  const fetchLastReceipt = useRef<() => void>(() => {});

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
    if (formSubmitted) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [formSubmitted]);

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
        {/* Sticky Success Bar */}
        {formSubmitted && (
          <motion.div
            className="sticky top-0 z-40 w-full bg-surface-container-lowest border-b border-secondary/20 shadow-md"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="max-w-container-max mx-auto px-margin-desktop py-4">
              <div className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-[36px] text-green-500"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <div className="flex-1">
                  <p className="font-headline-sm text-headline-sm text-primary font-semibold">
                    Order Submitted Successfully
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Last Order:{" "}
                    <span className="font-semibold text-secondary">
                      {lastOrderNumber ?? "..."}
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 flex items-center gap-2 bg-secondary text-primary-fixed-dim px-6 py-3 rounded-DEFAULT font-button text-button uppercase tracking-wider transition-all hover:brightness-90 active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  refresh
                </span>
                <span>Refresh Page</span>
              </button>
            </div>
          </motion.div>
        )}
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
                className="flex flex-col items-center justify-center w-full min-h-[300px] bg-surface-container-lowest rounded-xl soft-shadow border border-surface-container"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <span
                  className="material-symbols-outlined text-[48px] text-green-500"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 mb-6">
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
