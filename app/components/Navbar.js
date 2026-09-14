"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { navLinks } from "../lib/Data";


const PILL_SHADOW =
  "0px 0.52px 0.52px -0.94px rgba(0,0,0,0.18), 0px 1.57px 1.57px -1.88px rgba(0,0,0,0.17), 0px 4.15px 4.15px -2.81px rgba(0,0,0,0.15), 0px 13px 13px -3.75px rgba(0,0,0,0.06)";

const SOCIALS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/people/The-Shorewood/61591843766991/",
    
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/theshorewood/",
    
  },
  {
  name: "YouTube",
  href: "https://www.youtube.com/channel/UC9C2ds2aGLZvGKaRFFN1GDQ",
 
},
];
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const PANEL_MS = 650;// must match the panel transition duration

const PREVIEW = {
  src: "/images/1.jpg",
  eyebrow: "Featured journey",
  title: "Chinar Trees",
  meta: " days /  nights",
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // keeps panel alive for the exit
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  const close = useCallback(() => setOpen(false), []);

  /* mount immediately on open; unmount only after the close animation ends */
  useEffect(() => {
    if (open) {
      setMounted(true);
      return;
    }
    const id = window.setTimeout(() => setMounted(false), PANEL_MS);
    return () => window.clearTimeout(id);
  }, [open]);

  /* scroll lock, compensating for the scrollbar so nothing shifts */
  useEffect(() => {
    if (!open) return;
    const { body, documentElement: html } = document;
    const gap = window.innerWidth - html.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;

    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
    };
  }, [open]);

  /* Escape + focus trap */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = panelRef.current?.querySelectorAll(
        "a[href], button:not([disabled])"
      );
      if (!nodes?.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  /* focus into the panel, restore to the trigger on close */
  useEffect(() => {
    if (open) {
      const id = window.setTimeout(
        () => panelRef.current?.querySelector("a[href]")?.focus(),
        420
      );
      return () => window.clearTimeout(id);
    }
    if (mounted) triggerRef.current?.focus();
  }, [open, mounted]);

  return (
    <>
      {/* ── centred pill ─────────────────────────────── */}    
      
      <div className="pointer-events-none fixed left-1/2 top-0 z-40 w-full -translate-x-1/2 px-5 py-4 sm:px-10 sm:py-2">
        <nav
          className="pointer-events-auto mx-auto flex w-max max-w-300 animate-nav-in items-center gap-7 rounded-[60px] px-4 py-3"
          style={{
            backgroundColor: "rgba(0,0,0,0.2)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            boxShadow: PILL_SHADOW,
          }}
        >
          <Link href="/" className="flex items-center gap-2" onClick={close}>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#033D4A]">
              <Image
                src="/logo.webp"
                alt="The Shorewood Logo"
                width={40}
                height={40}
                loading="eager"
                unoptimized
                className=" rounded-3xl"
              />
            </span>
            <span className="text-[30px] font-light  text-white">
              The Shorewood
            </span>
          </Link>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-haspopup="dialog"
            className="relative grid h-8 w-8 cursor-pointer place-items-center rounded-full p-1.5 outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <span className="relative block h-4 w-5">
              <span className={`absolute left-0 h-0.5 w-5 rounded-full bg-white transition-all duration-300 ease-out ${open ? "top-1.75 rotate-45" : "top1"}`} />
              <span className={`absolute left-0 h-0.5 w-5 rounded-full bg-white transition-all duration-300 ease-out ${open ? "top-1.75 -rotate-45" : "top-1"}`} />
            </span>
          </button>
        </nav>
      </div>

      {/* ── overlay ──────────────────────────────────── */}
      {mounted && (
        <div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-50"
          style={{ pointerEvents: open ? "auto" : "none" }}
        >
          {/* sliding curtain */}
          <div
            className="absolute inset-0 bg-[#012830]"
            style={{
              transform: open ? "translateY(0)" : "translateY(100%)",
              transition: `transform ${PANEL_MS}ms ${EASE}`,
            }}
          />

          {/* soft glow that fades in behind the content */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 78% 25%, rgba(46,140,140,.30), transparent 60%), radial-gradient(ellipse 60% 50% at 10% 85%, rgba(243,176,95,.20), transparent 60%)",
              opacity: open ? 1 : 0,
              transition: `opacity ${open ? 900 : 300}ms ease ${open ? 250 : 0}ms`,
            }}
          />

          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="absolute right-5 top-6 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70 sm:right-10"
            style={{
              opacity: open ? 1 : 0,
              transition: `opacity 400ms ease ${open ? 500 : 0}ms`,
            }}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <div
            ref={panelRef}
            className="relative z-10 flex h-full flex-col justify-center overflow-y-auto overscroll-contain px-6 py-24 sm:px-10 lg:px-16"
          >
            <div className="mx-auto grid w-full max-w-300 items-center gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-20">
              {/* ── left: preview image ── */}
              <figure
                className="relative hidden aspect-4/5 max-h-[62vh] overflow-hidden rounded-3xl lg:block"
               style={{
  opacity: open ? 1 : 0,
  transform: open
    ? "scale(1)"
    : "scale(1.04) translateY(12px)",
  transition: `opacity 600ms ease 180ms, transform 750ms ${EASE} 180ms`,
  willChange: "opacity, transform",
}}
              >
                <Image
                  src={PREVIEW.src}
                  alt={PREVIEW.title}
                  fill
                  sizes="420px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-white/60">
                    {PREVIEW.eyebrow}
                  </span>
                  <p className="mt-1.5 text-[24px] font-semibold tracking-[-0.04em] text-white">
                    {PREVIEW.title}
                  </p>
                  <p className="text-[13px] text-white/60">{PREVIEW.meta}</p>
                </figcaption>
              </figure>

              {/* ── right: links ── */}
              <nav className="w-full">
                <ul>
                  {navLinks.map((link, i) => {
                    const delay = open ? 420 + i * 70 : 0;
                    return (
                      <li
                        key={link.href}
                        className="border-b border-white/10 first:border-t"
                      >
                        <Link
                          href={link.href}
                          onClick={close}
                          tabIndex={open ? 0 : -1}
                          className="group flex items-center justify-between gap-4 py-3.5 outline-none sm:py-4"
                        >
                          <span className="flex items-baseline gap-4 sm:gap-7">
                            <span
                              className="text-[12px] tabular-nums text-white/30"
                              style={{
                                opacity: open ? 1 : 0,
                                transition: `opacity 500ms ease ${delay + 120}ms`,
                              }}
                            >
                              0{i + 1}
                            </span>
                            {/* masked line reveal */}
                            <span className="block overflow-hidden py-[0.08em]">
                              <span
                                className="block text-[28px] font-semibold leading-[1.1] tracking-[-0.045em] text-white transition-colors duration-300 group-hover:text-white/70 sm:text-[42px]"
                                style={{
                                  transform: open
                                    ? "translateY(0)"
                                    : "translateY(110%)",
                                  transition: `transform ${open ? 800 : 300}ms ${EASE} ${delay}ms`,
                                }}
                              >
                                {link.label}
                              </span>
                            </span>
                          </span>

                          <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5 shrink-0 text-white/30 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                              opacity: open ? 1 : 0,
                              transition: `opacity 500ms ease ${delay + 160}ms`,
                            }}
                          >
                            <path d="M7 17L17 7M9 7h8v8" />
                          </svg>
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* footer row */}
                <div
                  className="mt-9 flex flex-wrap items-center justify-between gap-5"
                style={{
  opacity: open ? 1 : 0,
  transform: open
    ? "translateY(0)"
    : "translateY(10px)",
  transition: `
    opacity 450ms ease ${open ? 500 : 0}ms,
    transform 550ms ${EASE} ${open ? 500 : 0}ms
  `,
}}
                >
                  <Link
                    href="/BookATrip"
                    onClick={close}
                    tabIndex={open ? 0 : -1}
                    className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-[15px] font-medium text-[#033D4A] outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    Book a trip
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#033D4A] text-white transition-transform duration-300 group-hover:rotate-45">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M9 7h8v8" />
                      </svg>
                    </span>
                  </Link>

                  <div className="flex gap-5 text-[13px] text-white/45">
                    {SOCIALS.map((s) => (
                      <a
                        key={s.name}
                        href={s.href}
                        tabIndex={open ? 0 : -1}
                        className="outline-none transition-colors hover:text-white focus-visible:text-white"
                      >
                        {s.name}
                      </a>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
