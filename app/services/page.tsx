"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ecoImg =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD_VRjPDZA3lUtiZcVUcHagZr34ohvKR4q_mlfJnP4kHCDpY14dgd1dbOYvMmge5j7csb8TPW0yZ8xwYnmbbz_Y9_gWdbj4o-qL_gERB7uP0IM6slhjqrEScP-OXSLpwA1m2onZP5fWiqNNmdYFs0M5uGlRcDN3oFZGeeONwiVMMtsydOp7FjV2vsApnZZWo82YRFrSVPKSv6E3yKNGqtxCHskIWdqlITly1d6ctl3o3Z5hVNTUTAJ6-9hhZn5xs5Lb37uyftqRP9ES";

type TabId = "dry-cleaning" | "laundry" | "alterations" | "specialist";

interface PriceRow {
  item: string;
  price: string;
  premium?: boolean;
}

const tabs: { id: TabId; label: string }[] = [
  { id: "dry-cleaning", label: "Dry Cleaning" },
  { id: "laundry", label: "Laundry & Ironing" },
  { id: "alterations", label: "Alterations" },
  { id: "specialist", label: "Specialist Care" },
];

const pricingData: Record<TabId, { head: string; rows: PriceRow[] }> = {
  "dry-cleaning": {
    head: "Item Description",
    rows: [
      { item: "2-Piece Suit", price: "£14.50", premium: true },
      { item: "Evening Dress", price: "£18.00", premium: true },
      { item: "Trousers", price: "£7.50" },
      { item: "Blazer / Jacket", price: "£9.00" },
    ],
  },
  laundry: {
    head: "Service",
    rows: [
      { item: "Shirt - Iron Only", price: "£4.00" },
      { item: "Wash & Fold (per 5kg)", price: "£12.00" },
      { item: "Bed Linen (Set)", price: "£15.00" },
    ],
  },
  alterations: {
    head: "Adjustment Type",
    rows: [
      { item: "Hemming (Trousers/Skirts)", price: "£12.00" },
      { item: "Waist Adjust", price: "£15.00" },
      { item: "Zip Replacement", price: "£10.00" },
    ],
  },
  specialist: {
    head: "Specialist Item",
    rows: [
      { item: "Wedding Dress", price: "£150.00+", premium: true },
      { item: "Silk Scarf", price: "£12.00" },
      { item: "Leather Jacket", price: "£45.00" },
    ],
  },
};


function HeroSection() {
  return (
    <section className="relative pt-24 pb-20 px-margin-desktop overflow-hidden">
      <div className="max-w-container-max mx-auto text-center relative z-10">
        <motion.span
          className="font-label-caps text-label-caps text-secondary mb-4 block tracking-[0.2em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ARTISANAL QUALITY
        </motion.span>
        <motion.h1
          className="font-display text-display text-primary mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Immaculate Care,
          <br />
          Transparent Pricing
        </motion.h1>
        <motion.p
          className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          We treat every garment with the precision of a master tailor. From
          heirloom wedding gowns to everyday executive wear, our transparent
          pricing reflects our commitment to excellence and artisanal
          craftsmanship.
        </motion.p>
      </div>
    </section>
  );
}

function PricingTable({ tab }: { tab: TabId }) {
  const data = pricingData[tab];

  return (
    <motion.div
      key={tab}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-outline-variant">
            <th className="text-left py-6 px-8 font-label-caps text-label-caps text-primary">
              {data.head}
            </th>
            <th className="text-right py-6 px-8 font-label-caps text-label-caps text-primary">
              Price (GBP)
            </th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr
              key={row.item}
              className={`border-b border-outline-variant/30 ${
                i % 2 === 0 ? "bg-[#F7FAFC]" : ""
              }`}
            >
              <td className="py-6 px-8 text-primary font-medium">
                <span className="flex items-center gap-3">
                  {row.item}
                  {row.premium && (
                    <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-wider rounded">
                      Premium Care Included
                    </span>
                  )}
                </span>
              </td>
              <td className="py-6 px-8 text-right font-semibold text-primary">
                {row.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

function PricingSection() {
  const [activeTab, setActiveTab] = useState<TabId>("dry-cleaning");

  return (
    <section className="pb-section-gap px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <motion.div
          className="flex flex-wrap justify-center border-b border-outline-variant gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`pb-4 font-label-caps text-label-caps border-b-2 transition-all ${
                activeTab === t.id
                  ? "border-secondary text-primary font-semibold"
                  : "border-transparent text-on-surface-variant hover:text-primary"
              }`}
            >
              {t.label}
            </button>
          ))}
        </motion.div>
        <motion.div
          className="bg-surface-container-lowest rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.04)] overflow-hidden"
          layout
        >
          <AnimatePresence mode="wait">
            <PricingTable key={activeTab} tab={activeTab} />
          </AnimatePresence>
        </motion.div>
        <div className="mt-12 text-center">
          <p className="font-body-md text-on-surface-variant mb-6 italic">
            Don&apos;t see your item? Contact us for a bespoke quote.
          </p>
          <motion.button
            className="px-8 py-4 bg-primary text-on-primary font-button text-button rounded-lg hover:opacity-90 transition-all shadow-xl"
            whileTap={{ scale: 0.95 }}
          >
            Request Bespoke Quote
          </motion.button>
        </div>
      </div>
    </section>
  );
}

function EcoSection() {
  return (
    <section className="py-section-gap px-margin-desktop bg-surface-container">
      <div className="max-w-container-max mx-auto">
        <motion.div
          className="flex flex-col md:flex-row items-center gap-gutter bg-surface-container-lowest p-12 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-outline-variant/20 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="md:w-1/2 relative z-10">
            <div className="inline-flex items-center gap-2 mb-6 text-secondary">
              <span className="material-symbols-outlined text-4xl">eco</span>
              <span className="font-label-caps text-label-caps">
                OUR COMMITMENT
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-6">
              Eco-Friendly Cleaning
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-8">
              At Royal Cleaners, we believe luxury shouldn&apos;t cost the
              Earth. We exclusively use biodegradable, non-toxic, and
              sustainable solvents that are as gentle on the UK environment as
              they are on your most delicate fabrics. Our state-of-the-art
              machinery reduces water consumption by 40%, ensuring a
              carbon-conscious clean for every garment.
            </p>
            <div className="flex gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">
                  check_circle
                </span>
                <span className="text-sm font-semibold text-primary">
                  GreenEarth Certified
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">
                  check_circle
                </span>
                <span className="text-sm font-semibold text-primary">
                  Plastic-Free Packaging
                </span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full h-[400px] rounded-xl overflow-hidden shadow-2xl relative">
            <img
              className="w-full h-full object-cover"
              src={ecoImg}
              alt=""
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="py-24 px-margin-desktop text-center">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="font-headline-md text-headline-md text-primary mb-4">
          Join the Royal Circle
        </h3>
        <p className="font-body-md text-on-surface-variant mb-8">
          Receive seasonal garment care tips and exclusive offers directly to
          your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            className="flex-grow px-6 py-4 rounded-lg bg-surface border border-outline-variant focus:border-secondary focus:ring-0 transition-all font-body-md outline-none"
            placeholder="Your email address"
            type="email"
          />
          <button className="px-8 py-4 bg-secondary text-on-secondary font-button text-button rounded-lg hover:opacity-95 transition-all active:scale-95 whitespace-nowrap">
            Subscribe Now
          </button>
        </div>
      </motion.div>
    </section>
  );
}


export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background text-on-surface font-body-md overflow-x-hidden">
        <HeroSection />
        <PricingSection />
        <EcoSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
