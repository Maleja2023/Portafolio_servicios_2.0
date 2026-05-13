import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./trabajar-con-nosotros.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Trabajar con nosotros | Casa de Eventos Laura Sofía",
  description:
    "Requisitos para colaborar, seguridad industrial y operativa en eventos, y términos para aliados de Casa de Eventos Laura Sofía en Florencia, Caquetá.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function TrabajarConNosotrosLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${geistSans.className} font-sans antialiased`}
    >
      {children}
    </div>
  )
}
