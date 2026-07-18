import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import type { ReactNode } from "react"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ke Ke — Registered Intern Architect, OAA",
  description:
    "Selected works and résumé of Ke Ke, Registered Intern Architect (OAA), based in Toronto, Canada.",
  authors: [{ name: "Ke Ke" }],
  openGraph: {
    title: "Ke Ke — Registered Intern Architect, OAA",
    description:
      "Selected works and résumé of Ke Ke, Registered Intern Architect (OAA), based in Toronto, Canada.",
    type: "website",
  },
}

export const viewport = {
  themeColor: "#ece8e0",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`bg-background ${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
