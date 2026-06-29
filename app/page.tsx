"use client";

import { useRef, useState, useCallback, useEffect, Fragment } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
  animate,
  useAnimation,
} from "framer-motion";
import RevealText from "@/components/RevealText";

const heroBg =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAjS5KqwAzvUwa_S20xyklBClAV4EjiKimeTPWint1PzChtGgDkS0TLe61LidlEdT_tjNH2YmNNDdyHGPcfn3MuQhm1jWKMcn5LZ6FZU140rPCzJjNqas8VG-iuB-aHBMuQrHDXJurZbPn8zq2rFnDLpKC5PTXQi7KjEiFEnvEtjpDR6mPz3B_3brDPOiwOLqs-hMqM0r8oiPKMVfKxxzxo8Ee3yS963RJj6auTj2W-u8UPgb3V1qfgw6mBWxi1hneXOEFbboeaStQS";

const bentoBg1 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCxa_C4qtt1qMgTAO89QdhBmmPeRQx_ixIf-n2I6XbWAIylQF4_rW0adQMdBHQ-ZI0Pj87CCX6lI_dhhPaqJTFORONqTegE6o21q81PWtcEY1jCfSEzuLdk2cFeo4nSMR3DE_TWZpR--685cqsCa30QGk4tRiIgunCa93xBNfd5m9gkWWPbV0NLyg6ZXvkPG7Ne7rG48Z-OExqhNyPNoFb7Yb2mNPO_M8c9ChqJ0iGRG2qZ-mKt1_T82dtzVM6QIbtP7Bt6N-sB7KeP";

const bentoBg2 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBptfSSKhQAZ2K7Pk0penr_SECDTull61m4F-ECh0GppmehDZzIiy31fgo-zGbDVffjZfD8vxqYiseq2XkHtSeTjr80e5GwEpNkhXZXg7eeJCgCCnLcuYi0vcma5z0QJj7nAv4Cvyf75TbZjJUfQhP-JKNGvhr0tPGcgrnVedUy0jH6TmGzW075rBuF5qBKi4Y4Rp-A5qXfHYV1OrcFq2sqw7bbzWFB7u6YYr1vsS_-zZOSQ5AWpbu-rqU0Li67wB30OSwL22Safc0h";


const heroWords = "Premium Care for Your Finest Garments".split(" ");

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [37.5, -37.5]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      ref={sectionRef}
      data-cursor="expand"
      className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('${heroBg}')` }}
        />
        <div className="absolute inset-0 hero-gradient" />
      </motion.div>
      <div className="relative z-10 max-w-container-max mx-auto px-margin-desktop text-center text-on-primary">
        <motion.div style={{ y: headlineY }}>
          <motion.p
            className="font-label-caps text-label-caps mb-4 uppercase tracking-[0.3em] text-secondary-fixed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Excellence in Care
          </motion.p>
          <h1 className="font-display text-[56px] md:text-[72px] leading-[1.1] mb-8 max-w-3xl mx-auto font-extrabold tracking-tight">
            {heroWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                >
                  {word}
                  {i < heroWords.length - 1 && "\u00A0"}
                </motion.span>
              </span>
            ))}
          </h1>
        </motion.div>
        <motion.p
          className="font-body-lg text-body-lg mb-10 max-w-xl mx-auto opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          A bespoke dry cleaning experience combining artisanal methods with
          modern precision to preserve your luxury wardrobe.
        </motion.p>
        <motion.div
          style={{ y: ctaY }}
        >
          <motion.div
            className="flex flex-col md:flex-row gap-4 justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.85,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
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
      </div>
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
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: { ease: "linear", duration: 18, repeat: Infinity },
    });
  }, [controls]);

  const slowMarquee = useCallback(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: { ease: "linear", duration: 40, repeat: Infinity },
    });
  }, [controls]);

  const resumeMarquee = useCallback(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: { ease: "linear", duration: 18, repeat: Infinity },
    });
  }, [controls]);

  const tickerText =
    "GreenEarth Certified \u2022 24hr Express \u2022 Mayfair Flagship \u2022 30 Years of Mastery \u2022 ";

  return (
    <section
      className="bg-primary py-section-gap overflow-hidden"
      onMouseEnter={slowMarquee}
      onMouseLeave={resumeMarquee}
      data-cursor="light"
    >
      <div className="max-w-container-max mx-auto px-margin-desktop mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-primary mb-4">
              <RevealText>Curious about your order?</RevealText>
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
        </div>
      </div>
      <div className="border-t border-white/10 pt-8">
        <motion.div
          className="flex whitespace-nowrap"
          animate={controls}
        >
          <span className="inline-block font-display text-display-sm text-on-primary/20 uppercase tracking-widest px-8">
            {tickerText}
          </span>
          <span className="inline-block font-display text-display-sm text-on-primary/20 uppercase tracking-widest px-8">
            {tickerText}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

const steps = [
  {
    number: "01",
    icon: "store",
    title: "Drop off at store",
    description:
      "Visit any of our boutique locations and leave your finest items with our expert consultants for a preliminary assessment.",
  },
  {
    number: "02",
    icon: "local_laundry_service",
    title: "Precision Cleaning",
    description:
      "Our master cleaners handle every fiber with care. Check our live dashboard to see exactly where your garments are in the cycle.",
  },
  {
    number: "03",
    icon: "check_circle",
    title: "Ready for Collection",
    description:
      "Receive an automated email notification once your items have passed our final quality inspection and are ready for pickup.",
  },
];

function StepCard({
  step,
  onActive,
}: {
  step: (typeof steps)[0];
  onActive: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const hasTriggered = useRef(false);

  const count = useMotionValue(0);
  const displayValue = useTransform(count, (v) =>
    String(Math.round(v)).padStart(2, "0"),
  );

  useEffect(() => {
    if (isInView && !hasTriggered.current) {
      hasTriggered.current = true;
      onActive();
      const target = parseInt(step.number);
      const controls = animate(count, target, {
        duration: 0.8,
        ease: "easeOut",
      });
      return () => controls.stop();
    }
  }, [isInView, onActive, count, step.number]);

  return (
    <motion.div
      ref={ref}
      className="relative p-10 bg-white shadow-[0_4px_30px_rgba(0,0,0,0.04)] overflow-hidden"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.rect
          width="100%"
          height="100%"
          fill="none"
          stroke="#e9c176"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </svg>

      <div className="mb-8 w-16 h-16 flex items-center justify-center bg-primary rounded-full overflow-hidden">
        <motion.div
          className="flex items-center justify-center w-full h-full"
          initial={{ rotate: 0 }}
          animate={isInView ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span
            className="text-secondary-fixed text-2xl font-bold font-display"
            style={{ position: "absolute" }}
          >
            {displayValue}
          </motion.span>
          <span
            className="material-symbols-outlined text-secondary-fixed text-2xl opacity-0"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {step.icon}
          </span>
        </motion.div>
      </div>

      <h3 className="font-headline-md text-headline-md text-primary mb-4">
        <RevealText>{step.title}</RevealText>
      </h3>
      <p className="font-body-md text-body-md text-on-surface-variant">
        {step.description}
      </p>
    </motion.div>
  );
}

function ConnectorLine({ active }: { active: boolean }) {
  return (
    <div className="flex items-center justify-center md:pt-[72px] px-4 md:px-0">
      <div className="w-1 md:w-full h-16 md:h-[2px] bg-outline-variant relative overflow-hidden rounded-full">
        <motion.div
          className="absolute inset-0 bg-secondary-fixed rounded-full"
          initial={{ x: "-100%" }}
          animate={active ? { x: "0%" } : { x: "-100%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function HowItWorksSection() {
  const [activeSteps, setActiveSteps] = useState<Set<number>>(new Set());

  const handleStepActive = useCallback((index: number) => {
    setActiveSteps((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, []);

  return (
    <section className="py-section-gap bg-surface">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="text-center mb-24">
          <p className="font-label-caps text-label-caps text-secondary mb-4">
            <RevealText>THE PROCESS</RevealText>
          </p>
          <h2 className="font-display text-display text-primary">
            <RevealText>Simplicity Redefined</RevealText>
          </h2>
        </div>
        <div className="hidden md:flex items-start">
          {steps.map((step, i) => (
            <Fragment key={step.number}>
              <div className="flex-1">
                <StepCard
                  step={step}
                  onActive={() => handleStepActive(i)}
                />
              </div>
              {i < steps.length - 1 && (
                <div className="w-16 flex items-center justify-center md:pt-[72px]">
                  <ConnectorLine active={activeSteps.has(i)} />
                </div>
              )}
            </Fragment>
          ))}
        </div>
        <div className="md:hidden flex flex-col gap-gutter">
          {steps.map((step, i) => (
            <Fragment key={step.number}>
              <StepCard
                step={step}
                onActive={() => handleStepActive(i)}
              />
              {i < steps.length - 1 && (
                <ConnectorLine active={activeSteps.has(i)} />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function useMagneticTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-1, 1], [8, -8]),
    { stiffness: 200, damping: 20 },
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-1, 1], [-8, 8]),
    { stiffness: 200, damping: 20 },
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x * 2 - 1);
      mouseY.set(y * 2 - 1);
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return { ref, mouseX, mouseY, rotateX, rotateY, handleMouseMove, handleMouseLeave };
}

function ServicesBentoGrid() {
  const c1 = useMagneticTilt();
  const c2 = useMagneticTilt();
  const c3 = useMagneticTilt();

  const bgX = useSpring(
    useTransform(c1.mouseX, [-1, 1], [-40, 40]),
    { stiffness: 200, damping: 20 },
  );
  const bgY = useSpring(
    useTransform(c1.mouseY, [-1, 1], [-40, 40]),
    { stiffness: 200, damping: 20 },
  );

  return (
    <section className="py-section-gap bg-surface-container-low overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="grid grid-cols-12 grid-rows-2 gap-gutter h-auto md:h-[800px]">
          <motion.div
            ref={c1.ref}
            data-cursor="expand"
            className="col-span-12 md:col-span-7 row-span-2 relative rounded-lg overflow-hidden shadow-lg"
            style={{ transformPerspective: 1000, rotateX: c1.rotateX, rotateY: c1.rotateY }}
            onMouseMove={c1.handleMouseMove}
            onMouseLeave={c1.handleMouseLeave}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${bentoBg1}')`,
                x: bgX,
                y: bgY,
                scale: 1.15,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex flex-col justify-end p-12">
              <span className="font-label-caps text-label-caps text-secondary-fixed mb-4">
                <RevealText>COUTURE CARE</RevealText>
              </span>
              <h3 className="font-display text-headline-lg text-on-primary mb-4">
                <RevealText>Hand-Finished Artisanal Cleaning</RevealText>
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
            ref={c2.ref}
            data-cursor="expand"
            className="col-span-12 md:col-span-5 row-span-1 relative rounded-lg overflow-hidden shadow-lg"
            style={{ transformPerspective: 1000, rotateX: c2.rotateX, rotateY: c2.rotateY }}
            onMouseMove={c2.handleMouseMove}
            onMouseLeave={c2.handleMouseLeave}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${bentoBg2}')` }}
            />
            <div className="absolute inset-0 bg-primary/40 flex flex-col justify-end p-8">
              <h3 className="font-headline-md text-headline-md text-on-primary mb-2">
                <RevealText>Corporate Attire</RevealText>
              </h3>
              <p className="font-body-md text-body-md text-on-primary/90">
                The standard for London&apos;s professionals.
              </p>
            </div>
          </motion.div>
          <motion.div
            ref={c3.ref}
            data-cursor="expand"
            className="col-span-12 md:col-span-5 row-span-1 bg-primary p-8 flex flex-col justify-center border-l-4 border-secondary shadow-lg"
            style={{ transformPerspective: 1000, rotateX: c3.rotateX, rotateY: c3.rotateY }}
            onMouseMove={c3.handleMouseMove}
            onMouseLeave={c3.handleMouseLeave}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-headline-md text-headline-md text-on-primary mb-4">
              <RevealText>Express Tailoring</RevealText>
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
            <RevealText>VISIT US</RevealText>
          </p>
          <h2 className="font-display text-display text-primary mb-8">
            <RevealText>Our Signature Flagship</RevealText>
          </h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <span className="material-symbols-outlined text-primary text-3xl">
                store
              </span>
              <div>
                <h4 className="font-headline-md text-headline-md text-primary">
                  <RevealText>Mayfair London</RevealText>
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
                  <RevealText>Operating Hours</RevealText>
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
