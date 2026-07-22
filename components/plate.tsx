"use client"

import { useEffect, useRef, useState } from "react"

type PlateProps = {
  section: string
  index: string
  label: string
  aspect: "11/8.5" | "3/4"
  src?: string
}

export function Plate({ section, index, label, aspect, src }: PlateProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <figure
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} grid grid-cols-1 md:grid-cols-[7rem_1fr] gap-4 md:gap-6`}
    >
      {/* Left gutter plate number */}
      <div className="flex md:flex-col md:items-end md:justify-start md:pt-1">
        <span className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-muted">
          {section}
          <span className="mx-1.5 text-hairline">·</span>
          {index}
        </span>
      </div>

      {/* Framed image with registration marks */}
      <div className="relative">
        <CropMarks />
        {src && !failed ? (
          // Show the full page at its natural aspect ratio — no cropping,
          // so baked-in titles and layouts stay fully visible.
          <div className="relative w-full bg-[#e3ded4]">
            <img
              ref={(node) => {
                // Handle the case where the image is already cached/complete
                // before React attaches the onLoad handler.
                if (node && node.complete && node.naturalWidth > 0) {
                  setLoaded(true)
                }
              }}
              src={src || "/placeholder.svg"}
              alt={label}
              className={`block h-auto w-full transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#00000010]" />
          </div>
        ) : (
          // Placeholder shown until a matching image file is added
          <div
            className="relative w-full overflow-hidden bg-[#e3ded4]"
            style={{ aspectRatio: aspect }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-sans text-xs uppercase tracking-[0.32em] text-muted">
                {label}
              </span>
            </div>
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#00000010]" />
          </div>
        )}
      </div>
    </figure>
  )
}

function CropMarks() {
  // Thin L-shaped registration/crop marks at the four corners
  const arm = "h-[14px] w-[14px] absolute"
  const line = "bg-foreground/45"
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {/* Top-left */}
      <span className={`${arm} -left-3 -top-3`}>
        <span className={`absolute left-0 top-0 h-px w-full ${line}`} />
        <span className={`absolute left-0 top-0 h-full w-px ${line}`} />
      </span>
      {/* Top-right */}
      <span className={`${arm} -right-3 -top-3`}>
        <span className={`absolute right-0 top-0 h-px w-full ${line}`} />
        <span className={`absolute right-0 top-0 h-full w-px ${line}`} />
      </span>
      {/* Bottom-left */}
      <span className={`${arm} -bottom-3 -left-3`}>
        <span className={`absolute bottom-0 left-0 h-px w-full ${line}`} />
        <span className={`absolute bottom-0 left-0 h-full w-px ${line}`} />
      </span>
      {/* Bottom-right */}
      <span className={`${arm} -bottom-3 -right-3`}>
        <span className={`absolute bottom-0 right-0 h-px w-full ${line}`} />
        <span className={`absolute bottom-0 right-0 h-full w-px ${line}`} />
      </span>
    </div>
  )
}
