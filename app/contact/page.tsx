"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";

const mapImg =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBgbWhPwTb9QSXj1SR2NALtRBsPyeBaFUbgwdUPT0nGdvThWg-kQ9gNIgOMAHeJZDjUYQxRWUeTRVzV3kv-55cnTuTudwAVBhLJxqotmoI6nS-Ff6X-9rO0qlv-fQEfoi0KAnJSJFK-f1IXaZLKHhvdmoOP8mspaHnKYOOfGNYC165wrNo6Yx-y8BvIPo7A2yVefQz6D6LTePjbjbeLEWf_8QKhEZbePHd6n1YmpsUkFGHE9NLoUkFpiCziFp70HYe1iQ62T3GCuj-M";


function HeroSection() {
  return (
    <section className="pt-24 pb-12 px-margin-desktop max-w-container-max mx-auto text-center">
      <motion.span
        className="font-label-caps text-label-caps text-secondary tracking-[0.2em] uppercase mb-4 block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Immaculate Service
      </motion.span>
      <motion.h1
        className="font-display text-display text-primary mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Contact Our Mayfair Atelier
      </motion.h1>
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
          Mayfair Boutique
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
          Concierge Collection
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

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSending(true);
      setTimeout(() => {
        setSending(false);
        setSent(true);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setSent(false), 3000);
      }, 1500);
    },
    []
  );

  return (
    <div className="bg-surface-container-lowest p-10 rounded-xl soft-shadow border border-surface-container">
      <h2 className="font-headline-lg text-headline-lg text-primary mb-2">
        General Inquiries
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
            <input
              className="w-full bg-surface border border-outline-variant focus:border-secondary focus:ring-0 rounded-DEFAULT px-4 py-3 font-body-md text-primary transition-colors outline-none"
              placeholder="Johnathan Sterling"
              type="text"
            />
          </div>
          <div className="space-y-2">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase ml-1">
              Email Address
            </label>
            <input
              className="w-full bg-surface border border-outline-variant focus:border-secondary focus:ring-0 rounded-DEFAULT px-4 py-3 font-body-md text-primary transition-colors outline-none"
              placeholder="j.sterling@example.com"
              type="email"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="font-label-caps text-label-caps text-on-surface-variant uppercase ml-1">
            Your Message
          </label>
          <textarea
            className="w-full bg-surface border border-outline-variant focus:border-secondary focus:ring-0 rounded-DEFAULT px-4 py-3 font-body-md text-primary transition-colors outline-none resize-none"
            placeholder="How may we assist you today?"
            rows={4}
          />
        </div>
        <motion.button
          className="brushed-gold-gradient w-full py-4 text-on-secondary font-button text-button rounded-DEFAULT shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          type="submit"
          disabled={sending || sent}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {sending ? (
            "SENDING..."
          ) : sent ? (
            <>
              <span className="material-symbols-outlined text-[18px]">
                check_circle
              </span>
              SENT SUCCESSFULLY
            </>
          ) : (
            <>
              SEND MESSAGE{" "}
              <span className="material-symbols-outlined text-[18px]">
                send
              </span>
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}

function MapSection() {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden soft-shadow group">
      <div className="w-full h-full grayscale-[0.5] contrast-[1.1] hover:grayscale-0 transition-all duration-700">
        <img className="w-full h-full object-cover" src={mapImg} alt="" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center animate-ping opacity-30" />
          <div className="w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg absolute" />
        </div>
      </div>
    </div>
  );
}

function BottomBanner() {
  return (
    <motion.section
      className="w-full py-16 bg-surface-container-low border-y border-surface-container-high"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="flex-1">
          <h3 className="font-headline-md text-headline-md text-primary mb-2">
            Visiting us for the first time?
          </h3>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Just bring your garments to our store, leave your email at the
            counter, and track everything live online.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white/50 p-6 rounded-xl border border-white">
          <div className="w-12 h-12 rounded-full brushed-gold-gradient flex items-center justify-center text-white">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              qr_code_2
            </span>
          </div>
          <div>
            <p className="font-label-caps text-label-caps text-secondary">
              INSTANT ONBOARDING
            </p>
            <p className="font-body-md text-body-md font-medium text-primary">
              No paperwork required
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}


export default function ContactPage() {
  return (
    <>
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
