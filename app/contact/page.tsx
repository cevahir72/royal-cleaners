"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useCallback, useEffect } from "react";
import { motion, useAnimation, useAnimate, useScroll } from "framer-motion";
import RevealText from "@/components/RevealText";

const mapImg =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBgbWhPwTb9QSXj1SR2NALtRBsPyeBaFUbgwdUPT0nGdvThWg-kQ9gNIgOMAHeJZDjUYQxRWUeTRVzV3kv-55cnTuTudwAVBhLJxqotmoI6nS-Ff6X-9rO0qlv-fQEfoi0KAnJSJFK-f1IXaZLKHhvdmoOP8mspaHnKYOOfGNYC165wrNo6Yx-y8BvIPo7A2yVefQz6D6LTePjbjbeLEWf_8QKhEZbePHd6n1YmpsUkFGHE9NLoUkFpiCziFp70HYe1iQ62T3GCuj-M";


function HeroSection() {
  return (
    <section className="pt-24 pb-12 px-margin-desktop max-w-container-max mx-auto text-center">
      <span className="font-label-caps text-label-caps text-secondary tracking-[0.2em] uppercase mb-4 block">
        <RevealText>Immaculate Service</RevealText>
      </span>
      <h1 className="font-display text-display text-primary mb-6">
        <RevealText>Contact Our Mayfair Atelier</RevealText>
      </h1>
      <motion.p
        className="max-w-2xl mx-auto text-on-surface-variant font-body-lg text-body-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Precision garment care is just a visit away. Our flagship location in
        the heart of London provides personal consultations and expedited care
        for your finest wardrobe pieces.
      </motion.p>
    </section>
  );
}

function StoreDetails() {
  return (
    <div className="md:col-span-5 flex flex-col gap-12">
      <motion.div
        className="bg-surface-container-lowest p-10 rounded-xl soft-shadow border border-surface-container"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-headline-lg text-headline-lg text-primary mb-8">
          <RevealText>Mayfair Boutique</RevealText>
        </h2>
        <ul className="space-y-10">
          <li className="flex items-start gap-5">
            <div className="w-12 h-12 flex items-center justify-center bg-surface-container rounded-full text-secondary">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <div>
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase">
                Physical Address
              </p>
              <p className="font-body-lg text-body-lg text-primary font-medium">
                12 Berkeley Square
                <br />
                Mayfair, London W1J 6BD
              </p>
            </div>
          </li>
          <li className="flex items-start gap-5">
            <div className="w-12 h-12 flex items-center justify-center bg-surface-container rounded-full text-secondary">
              <span className="material-symbols-outlined">call</span>
            </div>
            <div>
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase">
                Direct Line
              </p>
              <a
                className="font-body-lg text-body-lg text-primary font-medium hover:text-secondary transition-colors"
                href="tel:+442071234567"
              >
                +44 20 7123 4567
              </a>
            </div>
          </li>
          <li className="flex items-start gap-5">
            <div className="w-12 h-12 flex items-center justify-center bg-surface-container rounded-full text-secondary">
              <span className="material-symbols-outlined">schedule</span>
            </div>
            <div>
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase">
                Opening Hours
              </p>
              <div className="font-body-lg text-body-lg text-primary space-y-1">
                <div className="flex justify-between w-64">
                  <span className="font-medium">Monday - Saturday</span>
                  <span>8:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between w-64 text-on-surface-variant opacity-60">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </motion.div>
      <motion.div
        className="bg-primary p-10 rounded-xl text-on-primary"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="font-headline-md text-headline-md mb-4">
          <RevealText>Concierge Collection</RevealText>
        </h3>
        <p className="font-body-md text-body-md opacity-80 mb-6">
          Unable to visit us in person? Our private valets provide white-glove
          collection and delivery services throughout Zone 1 and 2.
        </p>
        <button className="flex items-center gap-2 font-button text-button text-secondary-fixed hover:gap-4 transition-all">
          BOOK COLLECTION{" "}
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </motion.div>
    </div>
  );
}

function ContactForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  type FieldName = "name" | "email" | "message";
  const [fields, setFields] = useState<Record<FieldName, { value: string; touched: boolean }>>({
    name: { value: "", touched: false },
    email: { value: "", touched: false },
    message: { value: "", touched: false },
  });
  const [scope, animate] = useAnimate();

  const validators: Record<FieldName, (v: string) => boolean> = {
    name: (v: string) => v.trim().length >= 2,
    email: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    message: (v: string) => v.trim().length >= 10,
  };

  const isValid = (name: FieldName) => validators[name](fields[name].value);

  const handleBlur = (name: FieldName) => {
    setFields((prev) => ({ ...prev, [name]: { ...prev[name], touched: true } }));
    if (!validators[name](fields[name].value)) {
      animate(`#field-${name}`, { x: [0, -8, 8, -8, 0] }, { duration: 0.35 });
    }
  };

  const handleChange = (name: FieldName, value: string) => {
    setFields((prev) => ({ ...prev, [name]: { ...prev[name], value } }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;
    (Object.keys(validators) as FieldName[]).forEach((key) => {
      if (!validators[key](fields[key].value)) {
        animate(`#field-${key}`, { x: [0, -8, 8, -8, 0] }, { duration: 0.35 });
        setFields((prev) => ({ ...prev, [key]: { ...prev[key], touched: true } }));
        hasError = true;
      }
    });
    if (hasError) return;

    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      (e.target as HTMLFormElement).reset();
      setFields({
        name: { value: "", touched: false },
        email: { value: "", touched: false },
        message: { value: "", touched: false },
      });
      setTimeout(() => setSent(false), 3000);
    }, 1500);
  };

  const fieldBorder = (name: FieldName) => {
    const f = fields[name];
    if (!f.touched) return "border-outline-variant";
    return isValid(name) ? "border-green-500" : "border-red-400";
  };

  return (
    <div ref={scope} className="bg-surface-container-lowest p-10 rounded-xl soft-shadow border border-surface-container">
      <h2 className="font-headline-lg text-headline-lg text-primary mb-2">
        <RevealText>General Inquiries</RevealText>
      </h2>
      <p className="text-on-surface-variant font-body-md mb-8">
        Send us a message and our wardrobe consultants will be in touch within
        the hour.
      </p>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase ml-1">
              Your Name
            </label>
            <div id="field-name" className="relative">
              <input
                className={`w-full bg-surface border ${fieldBorder("name")} focus:ring-0 rounded-DEFAULT px-4 py-3 font-body-md text-primary outline-none transition-colors pr-10`}
                placeholder="Johnathan Sterling"
                type="text"
                value={fields.name.value}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
              />
              {fields.name.touched && isValid("name") && (
                <motion.span
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </motion.span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase ml-1">
              Email Address
            </label>
            <div id="field-email" className="relative">
              <input
                className={`w-full bg-surface border ${fieldBorder("email")} focus:ring-0 rounded-DEFAULT px-4 py-3 font-body-md text-primary outline-none transition-colors pr-10`}
                placeholder="j.sterling@example.com"
                type="email"
                value={fields.email.value}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
              />
              {fields.email.touched && isValid("email") && (
                <motion.span
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </motion.span>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="font-label-caps text-label-caps text-on-surface-variant uppercase ml-1">
            Your Message
          </label>
          <div id="field-message" className="relative">
            <textarea
              className={`w-full bg-surface border ${fieldBorder("message")} focus:ring-0 rounded-DEFAULT px-4 py-3 font-body-md text-primary outline-none transition-colors resize-none pr-10`}
              placeholder="How may we assist you today?"
              rows={4}
              value={fields.message.value}
              onChange={(e) => handleChange("message", e.target.value)}
              onBlur={() => handleBlur("message")}
            />
            {fields.message.touched && isValid("message") && (
              <motion.span
                className="absolute right-3 top-6 text-green-500"
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </motion.span>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <motion.button
            layout
            type="submit"
            disabled={sending || sent}
            className="brushed-gold-gradient text-on-secondary font-button text-button shadow-md flex items-center justify-center disabled:cursor-not-allowed overflow-hidden"
            animate={{
              width: sending ? 48 : "100%",
              height: sending ? 48 : undefined,
              borderRadius: sending ? "50%" : undefined,
              padding: sending ? 0 : undefined,
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            whileHover={!sending && !sent ? { scale: 1.01 } : {}}
            whileTap={!sending && !sent ? { scale: 0.99 } : {}}
          >
            {sending ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </span>
            ) : sent ? (
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 6 L8 15 L4 10" />
                </svg>
                SENT SUCCESSFULLY
              </span>
            ) : (
              <span className="flex items-center gap-2">
                SEND MESSAGE{" "}
                <span className="material-symbols-outlined text-[18px]">send</span>
              </span>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
}

function MapSection() {
  const [isHovered, setIsHovered] = useState(false);
  const ringLarge = useAnimation();
  const ringMedium = useAnimation();

  useEffect(() => {
    if (isHovered) {
      ringLarge.stop();
      ringMedium.stop();
      return;
    }

    ringLarge.start({
      scale: [1, 2.5],
      opacity: [0.6, 0],
      transition: { repeat: Infinity, duration: 1.8, ease: "easeOut" },
    });
    ringMedium.start({
      scale: [1, 2.5],
      opacity: [0.6, 0],
      transition: { repeat: Infinity, duration: 1.8, ease: "easeOut", delay: 0.6 },
    });

    return () => {
      ringLarge.stop();
      ringMedium.stop();
    };
  }, [isHovered, ringLarge, ringMedium]);

  return (
    <div
      className="relative w-full aspect-video rounded-xl overflow-hidden soft-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.img
        className="w-full h-full object-cover"
        src={mapImg}
        alt=""
        initial={{ scale: 1.15, filter: "grayscale(1)" }}
        whileInView={{ scale: 1, filter: "grayscale(0.3)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="absolute w-8 h-8 bg-primary/20 rounded-full"
          animate={ringLarge}
        />
        <motion.div
          className="absolute w-8 h-8 bg-primary/20 rounded-full"
          animate={ringMedium}
        />
        <motion.div
          className="absolute w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg z-10 cursor-pointer"
          animate={{ scale: isHovered ? 1.3 : 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function BottomBanner() {
  return (
    <motion.section
      className="w-full py-16 bg-surface-container-low border-y border-surface-container-high"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
      }}
    >
      <div className="px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <motion.div
          className="flex-1"
          variants={{
            hidden: { opacity: 0, y: 60 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          <h3 className="font-headline-md text-headline-md text-primary mb-2">
            <RevealText>Visiting us for the first time?</RevealText>
          </h3>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Just bring your garments to our store, leave your email at the
            counter, and track everything live online.
          </p>
        </motion.div>
        <motion.div
          className="flex items-center gap-4 bg-white/50 p-6 rounded-xl border border-white"
          variants={{
            hidden: { opacity: 0, y: 60 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          <motion.div
            className="w-12 h-12 rounded-full brushed-gold-gradient flex items-center justify-center text-white cursor-pointer"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              qr_code_2
            </span>
          </motion.div>
          <div>
            <p className="font-label-caps text-label-caps text-secondary">
              <RevealText>INSTANT ONBOARDING</RevealText>
            </p>
            <p className="font-body-md text-body-md font-medium text-primary">
              No paperwork required
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}


export default function ContactPage() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#e9c176] z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
      />
      <Navbar />
      <main className="bg-surface text-on-surface font-body-md">
        <HeroSection />
        <section className="px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter mb-section-gap">
          <StoreDetails />
          <div className="md:col-span-7 flex flex-col gap-gutter">
            <MapSection />
            <ContactForm />
          </div>
        </section>
        <BottomBanner />
      </main>
      <Footer />
    </>
  );
}
