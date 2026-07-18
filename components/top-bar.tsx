"use client"

type View = "portfolio" | "resume"

export function TopBar({
  view,
  onChange,
}: {
  view: View
  onChange: (v: View) => void
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-10 md:py-5">
        <a
          href="#top"
          className="font-serif text-lg font-medium leading-none tracking-tight text-foreground md:text-xl"
        >
          Ke Ke
        </a>

        <nav aria-label="Views" className="flex items-center gap-1">
          <Toggle active={view === "portfolio"} onClick={() => onChange("portfolio")}>
            Portfolio
          </Toggle>
          <span className="mx-1 h-3 w-px bg-hairline" aria-hidden="true" />
          <Toggle active={view === "resume"} onClick={() => onChange("resume")}>
            Résumé
          </Toggle>
        </nav>
      </div>
    </header>
  )
}

function Toggle({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-none px-2.5 py-1 font-sans text-[0.7rem] uppercase tracking-[0.22em] outline-none transition-colors focus-visible:ring-1 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        active ? "text-foreground" : "text-muted hover:text-foreground"
      }`}
    >
      <span className="relative">
        {children}
        <span
          className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-foreground transition-transform duration-300 ${
            active ? "scale-x-100" : "scale-x-0"
          }`}
          aria-hidden="true"
        />
      </span>
    </button>
  )
}
