import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-on-primary py-section-gap">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="flex flex-col md:flex-row justify-between gap-gutter mb-20">
          <div className="max-w-xs">
            <Link
              href="/"
              className="font-display text-headline-md text-on-primary block mb-6"
            >
              Royal Cleaners
            </Link>
            <p className="font-body-md text-body-md opacity-70">
              The UK&apos;s premier destination for high-precision garment care
              and heritage conservation.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-16">
            <div className="flex flex-col gap-4">
              <span className="font-label-caps text-label-caps text-secondary-fixed">
                Navigation
              </span>
              <Link
                className="font-body-md text-body-md opacity-80 hover:text-secondary-fixed-dim hover:opacity-100 transition-all"
                href="/services"
              >
                Services
              </Link>
              <Link
                className="font-body-md text-body-md opacity-80 hover:text-secondary-fixed-dim hover:opacity-100 transition-all"
                href="/tracking"
              >
                Tracking
              </Link>
              <Link
                className="font-body-md text-body-md opacity-80 hover:text-secondary-fixed-dim hover:opacity-100 transition-all"
                href="/contact"
              >
                Contact
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-label-caps text-label-caps text-secondary-fixed">
                Legal
              </span>
              <a
                className="font-body-md text-body-md opacity-80 hover:text-secondary-fixed-dim hover:opacity-100 transition-all"
                href="#"
              >
                Terms of Service
              </a>
              <a
                className="font-body-md text-body-md opacity-80 hover:text-secondary-fixed-dim hover:opacity-100 transition-all"
                href="#"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-label-caps text-label-caps opacity-60">
            &copy; 2024 Royal Cleaners. Precision Garment Care.
          </p>
          <div className="flex gap-6">
            <a
              className="opacity-60 hover:opacity-100 transition-opacity"
              href="#"
            >
              <span className="material-symbols-outlined">public</span>
            </a>
            <a
              className="opacity-60 hover:opacity-100 transition-opacity"
              href="#"
            >
              <span className="material-symbols-outlined">
                alternate_email
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
