import Image from "next/image";
import Link from "next/link";
import { Orbitron } from "next/font/google";

const orbit = Orbitron({
  weight: "900",
  subsets: ["latin"],
})


const HEADLINE = ["THE SHOREWOOD"];

// top/left percentages + size, taken from the reference layout
const SCATTER = [
  {
    src: "/images/hero4/1.jpg",
    alt: "hidden kashmir",
    style: { top: "17.6%", left: "14.9%", width: 244, height: 150 },
    shadow: "10px 11px 13px rgba(0,0,0,0.25)",
    rotate: "-5deg",
    delay: "1.15s",
  },
  {
    src: "/images/hero4/3.jpg",
    alt: "Cliffside village",
    style: { top: "19.4%", left: "89%", width: 236, height: 161 },
    shadow: "-11px 11px 13px rgba(0,0,0,0.25)",
    rotate: "5deg",
    delay: "1.3s",
  },
  {
    src: "/images/hero4/2.jpg",
    alt: "pic in pampore",
    style: { top: "77.25%", left: "12.75%", width: 226, height: 143 },
    shadow: "10px 11px 13px rgba(0,0,0,0.25)",
    rotate: "4deg",
    delay: "1.45s",
  },
  {
    src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=700&q=80&auto=format&fit=crop",
    alt: "Coastal headland",
    style: { top: "77.5%", left: "82.2%", width: 213, height: 135 },
    shadow: "10px -11px 13px rgba(0,0,0,0.25)",
    rotate: "-4deg",
    delay: "1.6s",
  },
];

const TRUST = [
  {
    label: "Curated Kashmir Experiences",
    short: "Curated Tours",
    icon: (
      <path d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.9-5.4 2.9 1-6L3.2 9.4l6.1-.9L12 3z" />
    ),
  },
  {
    label: "Local Travel Specialists",
    short: "Local Experts",
    icon: (
      <>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M2.5 19.5c.6-3.4 3.3-5.2 6.5-5.2s5.9 1.8 6.5 5.2M16 5.2a3.2 3.2 0 010 6.1M18 19.5c-.3-2-1.1-3.5-2.4-4.5" />
      </>
    ),
  },
  {
    label: "24/7 Travel Assistance",
    short: "24/7 Support",
    icon: (
      <>
        <path d="M4 12a8 8 0 0116 0" />
        <rect x="3" y="12" width="3" height="6" rx="1.5" />
        <rect x="18" y="12" width="3" height="6" rx="1.5" />
        <path d="M6 18a6 6 0 006 3h2" />
      </>
    ),
  },
];

export default function Hero() {
  return (
    <header className="relative flex h-[100svh] min-h-[640px] w-full flex-col items-center justify-center overflow-hidden px-5 pb-10 sm:px-10">
      {/* ── background video ─────────────────────────── */}
      <div className="absolute inset-0 -z-20 animate-hero-bg">
        <video
          autoPlay
          loop
          muted
          playsInline
          role="presentation"
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source
            src="../../video/hero.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/45 via-black/30 to-black/65" />

    
      {/* ── centre column ────────────────────────────── */}
      <div className="relative z-[3] flex w-full max-w-[1200px] flex-col items-center">
        <div className="flex w-full flex-col items-center gap-6 pt-14">
          <p
            className={`${orbit.className} max-w-[890px] text-center text-[40px] font-semibold leading-[1.2] tracking-[-0.045em] text-white sm:text-[56px] lg:text-[80px]`}
            style={{ textShadow: "0 3px 12px rgba(0,0,0,0.37)" }}
          >
            {HEADLINE.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block">
                {word.split("").map((letter, letterIndex) => (
                  <span
                    key={letterIndex}
                    className=" animate-word-in"
                    style={{
                      animationDelay: `${1 + (wordIndex * word.length + letterIndex) * 0.1}s`,
                    }}
                  >
                    {letter}
                  </span>
                ))}

                {/* space between words */}
                {wordIndex < HEADLINE.length - 1 && "\u00A0"}
              </span>
            ))}
          </p>
          <h1
            className="max-w-xl animate-word-in text-center text-[15px] leading-relaxed text-white/85 sm:text-[17px]"
            style={{ animationDelay: "0.85s" }}
          >
            Where Nature Finds Luxury. Private Kashmir journeys, designed around you.
          </h1>

          <Link
            href="/BookATrip"
            className="group mt-2 inline-flex animate-word-in items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-[15px] font-medium text-[#033D4A] transition-transform duration-300 hover:-translate-y-0.5"
            style={{ animationDelay: "1s" }}
          >
            Plan your Kashmir journey
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#033D4A] text-white transition-transform duration-300 group-hover:rotate-45">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      {/* ── trust indicators ─────────────────────────── */}
      <div className="absolute bottom-0 left-1/2 z-[3] flex w-full -translate-x-1/2  flex-wrap items-center justify-center gap-x-6 gap-y-3 pb-6 sm:gap-x-10"
      >
        {TRUST.map((t) => (
          <div key={t.label} className="flex items-center gap-2 text-white/85">
            <svg
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px] shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {t.icon}
            </svg>
            <span className="hidden text-[14px] sm:inline">{t.label}</span>
            <span className="text-[13px] sm:hidden">{t.short}</span>
          </div>
        ))}
      </div>
    </header>
  );
}
