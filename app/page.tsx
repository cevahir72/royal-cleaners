"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const heroBg =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAjS5KqwAzvUwa_S20xyklBClAV4EjiKimeTPWint1PzChtGgDkS0TLe61LidlEdT_tjNH2YmNNDdyHGPcfn3MuQhm1jWKMcn5LZ6FZU140rPCzJjNqas8VG-iuB-aHBMuQrHDXJurZbPn8zq2rFnDLpKC5PTXQi7KjEiFEnvEtjpDR6mPz3B_3brDPOiwOLqs-hMqM0r8oiPKMVfKxxzxo8Ee3yS963RJj6auTj2W-u8UPgb3V1qfgw6mBWxi1hneXOEFbboeaStQS";

const bentoBg1 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCxa_C4qtt1qMgTAO89QdhBmmPeRQx_ixIf-n2I6XbWAIylQF4_rW0adQMdBHQ-ZI0Pj87CCX6lI_dhhPaqJTFORONqTegE6o21q81PWtcEY1jCfSEzuLdk2cFeo4nSMR3DE_TWZpR--685cqsCa30QGk4tRiIgunCa93xBNfd5m9gkWWPbV0NLyg6ZXvkPG7Ne7rG48Z-OExqhNyPNoFb7Yb2mNPO_M8c9ChqJ0iGRG2qZ-mKt1_T82dtzVM6QIbtP7Bt6N-sB7KeP";

const bentoBg2 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBptfSSKhQAZ2K7Pk0penr_SECDTull61m4F-ECh0GppmehDZzIiy31fgo-zGbDVffjZfD8vxqYiseq2XkHtSeTjr80e5GwEpNkhXZXg7eeJCgCCnLcuYi0vcma5z0QJj7nAv4Cvyf75TbZjJUfQhP-JKNGvhr0tPGcgrnVedUy0jH6TmGzW075rBuF5qBKi4Y4Rp-A5qXfHYV1OrcFq2sqw7bbzWFB7u6YYr1vsS_-zZOSQ5AWpbu-rqU0Li67wB30OSwL22Safc0h";


function HeroSection() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div
          className="w-full h-full bg-cover bg-center"
          style={{ scale, backgroundImage: `url('${heroBg}')` }}
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>
      <motion.div
        className="relative z-10 max-w-container-max mx-auto px-margin-desktop text-center text-on-primary"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.p
          className="font-label-caps text-label-caps mb-4 uppercase tracking-[0.3em] text-secondary-fixed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Excellence in Care
        </motion.p>
        <motion.h1
          className="font-display text-[56px] md:text-[72px] leading-[1.1] mb-8 max-w-3xl mx-auto font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Premium Care for Your Finest Garments
        </motion.h1>
        <motion.p
          className="font-body-lg text-body-lg mb-10 max-w-xl mx-auto opacity-90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          A bespoke dry cleaning experience combining artisanal methods with
          modern precision to preserve your luxury wardrobe.
        </motion.p>
        <motion.div
          className="flex flex-col md:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <button className="bg-secondary-fixed text-on-secondary-fixed px-10 py-5 rounded-DEFAULT font-button text-button uppercase tracking-widest hover:bg-secondary-fixed-dim transition-all shadow-lg active:scale-95">
            Book a Collection
          </button>
          <Link
            href="/services"
            className="border border-on-primary text-on-primary px-10 py-5 rounded-DEFAULT font-button text-button uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95 inline-block"
          >
            View Our Services
          </Link>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="material-symbols-outlined text-on-primary text-3xl">
          expand_more
        </span>
      </motion.div>
    </section>
  );
}

function StatusSection() {
  return (
    <section className="bg-primary py-24">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-12 bg-white/5 p-12 rounded-lg border border-white/10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-left">
            <h2 className="font-headline-lg text-headline-lg text-on-primary mb-4">
              Curious about your order?
            </h2>
            <p className="font-body-md text-body-md text-on-primary/70 max-w-lg">
              Get real-time updates on your garments, from individual stain
              treatment to final hand-finished pressing.
            </p>
          </div>
          <Link
            href="/tracking"
            className="group flex items-center gap-4 bg-secondary-fixed text-on-secondary-fixed px-12 py-6 rounded-DEFAULT font-button text-button uppercase tracking-widest hover:bg-secondary-fixed-dim transition-all whitespace-nowrap shadow-xl"
          >
            Check Your Cleaning Status
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">
              arrow_forward
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

const steps = [
  {
    number: "01",
    title: "Drop off at store",
    description:
      "Visit any of our boutique locations and leave your finest items with our expert consultants for a preliminary assessment.",
  },
  {
    number: "02",
    title: "Precision Cleaning",
    description:
      "Our master cleaners handle every fiber with care. Check our live dashboard to see exactly where your garments are in the cycle.",
  },
  {
    number: "03",
    title: "Ready for Collection",
    description:
      "Receive an automated email notification once your items have passed our final quality inspection and are ready for pickup.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

function HowItWorksSection() {
  return (
    <section className="py-section-gap bg-surface">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-label-caps text-label-caps text-secondary mb-4">
            THE PROCESS
          </p>
          <h2 className="font-display text-display text-primary">
            Simplicity Redefined
          </h2>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-gutter"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              className="relative group p-10 bg-white border border-outline-variant/30 hover:border-secondary transition-colors shadow-[0_4px_30px_rgba(0,0,0,0.04)]"
              variants={stepVariants}
              whileHover={{ y: -4 }}
            >
              <div className="mb-8 w-16 h-16 flex items-center justify-center bg-primary text-secondary-fixed rounded-full text-2xl font-bold font-display">
                {step.number}
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-4">
                {step.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServicesBentoGrid() {
  return (
    <section className="py-section-gap bg-surface-container-low overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="grid grid-cols-12 grid-rows-2 gap-gutter h-auto md:h-[800px]">
          <motion.div
            className="col-span-12 md:col-span-7 row-span-2 relative rounded-lg overflow-hidden group shadow-lg"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${bentoBg1}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex flex-col justify-end p-12">
              <span className="font-label-caps text-label-caps text-secondary-fixed mb-4">
                COUTURE CARE
              </span>
              <h3 className="font-display text-headline-lg text-on-primary mb-4">
                Hand-Finished Artisanal Cleaning
              </h3>
              <p className="font-body-md text-body-md text-on-primary/80 max-w-md mb-8">
                Every delicate detail from lace to sequins is hand-treated and
                protected using our proprietary pH-neutral solutions.
              </p>
              <a
                className="text-secondary-fixed font-button text-button uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all"
                href="#"
              >
                Learn More{" "}
                <span className="material-symbols-outlined">
                  arrow_right_alt
                </span>
              </a>
            </div>
          </motion.div>
          <motion.div
            className="col-span-12 md:col-span-5 row-span-1 relative rounded-lg overflow-hidden group shadow-lg"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${bentoBg2}')` }}
            />
            <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-all flex flex-col justify-end p-8">
              <h3 className="font-headline-md text-headline-md text-on-primary mb-2">
                Corporate Attire
              </h3>
              <p className="font-body-md text-body-md text-on-primary/90">
                The standard for London&apos;s professionals.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="col-span-12 md:col-span-5 row-span-1 bg-primary p-8 flex flex-col justify-center border-l-4 border-secondary shadow-lg"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-headline-md text-headline-md text-on-primary mb-4">
              Express Tailoring
            </h3>
            <p className="font-body-md text-body-md text-on-primary/70 mb-6">
              Minor repairs and invisible mending completed within 24 hours by
              our resident master tailors.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1 border border-secondary-fixed text-secondary-fixed font-label-caps text-label-caps rounded-full">
                24HR TURNAROUND
              </span>
              <span className="px-4 py-1 border border-on-primary/30 text-on-primary font-label-caps text-label-caps rounded-full">
                MASTER TAILORS
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="py-section-gap bg-white">
      <div className="max-w-container-max mx-auto px-margin-desktop grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          className="h-[500px] bg-surface-container rounded-lg overflow-hidden relative shadow-inner"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 grayscale opacity-80 bg-surface-container" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-primary text-on-primary p-6 rounded shadow-2xl flex flex-col items-center">
              <span
                className="material-symbols-outlined text-secondary-fixed text-4xl mb-2"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                location_on
              </span>
              <p className="font-button text-button">MAYFAIR BOUTIQUE</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="font-label-caps text-label-caps text-secondary mb-4">
            VISIT US
          </p>
          <h2 className="font-display text-display text-primary mb-8">
            Our Signature Flagship
          </h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <span className="material-symbols-outlined text-primary text-3xl">
                store
              </span>
              <div>
                <h4 className="font-headline-md text-headline-md text-primary">
                  Mayfair London
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  12 Berkeley Square, Mayfair, London W1J 6BD
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <span className="material-symbols-outlined text-primary text-3xl">
                schedule
              </span>
              <div>
                <h4 className="font-headline-md text-headline-md text-primary">
                  Operating Hours
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Monday &ndash; Friday: 08:00 &ndash; 19:00
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Saturday: 10:00 &ndash; 16:00
                </p>
              </div>
            </div>
            <button className="bg-primary text-on-primary px-8 py-4 rounded-DEFAULT font-button text-button uppercase tracking-widest hover:bg-primary-container transition-all">
              Directions &amp; Other Locations
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <StatusSection />
      <HowItWorksSection />
      <ServicesBentoGrid />
      <ContactSection />
      <Footer />
    </>
  );
}
