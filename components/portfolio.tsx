"use client"

import { useState } from "react"
import { Plate } from "./plate"
import { TopBar } from "./top-bar"

type View = "portfolio" | "resume"

const PORTFOLIO = Array.from({ length: 12 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0")
  return { index: n, label: `Portfolio ${n}` }
})

const RESUME = [
  { index: "01", label: "Résumé 01" },
  { index: "02", label: "Résumé 02" },
]

export function Portfolio() {
  const [view, setView] = useState<View>("portfolio")

  function handleChange(next: View) {
    setView(next)
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
  }

  return (
    <div id="top" className="min-h-dvh">
      <TopBar view={view} onChange={handleChange} />

      <main className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Masthead */}
        <section className="animate-rise grid grid-cols-1 gap-10 pt-16 pb-20 md:grid-cols-[7rem_1fr] md:gap-6 md:pt-28 md:pb-28">
          <div className="hidden md:block" aria-hidden="true" />
          <div>
            <h1 className="font-serif text-[4rem] font-light leading-[0.9] tracking-tight text-foreground sm:text-[6rem] md:text-[8.5rem]">
              Ke Ke
            </h1>
            <div className="mt-8 grid max-w-2xl grid-cols-1 gap-x-12 gap-y-5 sm:grid-cols-2">
              <div>
                <p className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-muted">
                  Title
                </p>
                <p className="mt-1.5 font-serif text-xl leading-snug text-foreground">
                  Registered Intern Architect, OAA
                </p>
              </div>
              <div>
                <p className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-muted">
                  Location
                </p>
                <p className="mt-1.5 font-serif text-xl leading-snug text-foreground">
                  Toronto, Canada
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-muted">
                  Contact
                </p>
                <p className="mt-1.5 flex flex-col gap-1 font-sans text-sm leading-relaxed text-foreground sm:flex-row sm:items-center sm:gap-3">
                  <a
                    href="mailto:sycake0822@gmail.com"
                    className="underline-offset-4 outline-none hover:underline focus-visible:underline"
                  >
                    sycake0822@gmail.com
                  </a>
                  <span className="hidden text-hairline sm:inline" aria-hidden="true">
                    ·
                  </span>
                  <a
                    href="tel:+16477608880"
                    className="underline-offset-4 outline-none hover:underline focus-visible:underline"
                  >
                    +1 647 760 8880
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section divider */}
        <div className="grid grid-cols-1 border-t border-hairline pt-6 md:grid-cols-[7rem_1fr] md:gap-6">
          <div className="hidden md:block" aria-hidden="true" />
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-muted">
            {view === "portfolio" ? "Selected Works" : "Curriculum Vitae"}
          </p>
        </div>

        {/* Gallery */}
        <section
          key={view}
          className="view-fade space-y-24 py-16 md:space-y-36 md:py-24"
          aria-label={view === "portfolio" ? "Portfolio gallery" : "Résumé"}
        >
          {view === "portfolio"
            ? PORTFOLIO.map((item) => (
                <Plate
                  key={item.index}
                  section="Portfolio"
                  index={item.index}
                  label={item.label}
                  aspect="16/9"
                />
              ))
            : RESUME.map((item) => (
                <Plate
                  key={item.index}
                  section="Résumé"
                  index={item.index}
                  label={item.label}
                  aspect="3/4"
                />
              ))}
        </section>
      </main>

      <footer className="border-t border-hairline">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="font-serif text-lg text-foreground">Ke Ke</p>
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-muted">
            Toronto, Canada — OAA
          </p>
        </div>
      </footer>
    </div>
  )
}
