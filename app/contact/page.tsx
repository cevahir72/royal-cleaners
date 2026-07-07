"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { motion, useAnimation, useScroll } from "framer-motion";
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
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://api.centernex.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-surface-container-lowest p-10 rounded-xl soft-shadow border border-surface-container">
      <iframe
        src="https://api.centernex.com/widget/form/U1iUFwJe4xFKleXYMkIA"
        style={{ width: "100%", height: "750px", border: "none", borderRadius: "3px" }}
        id="inline-U1iUFwJe4xFKleXYMkIA"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="A2P Form"
        data-height="816"
        data-layout-iframe-id="inline-U1iUFwJe4xFKleXYMkIA"
        data-form-id="U1iUFwJe4xFKleXYMkIA"
        title="A2P Form"
      />
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
