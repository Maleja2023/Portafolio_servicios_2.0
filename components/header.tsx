"use client"

import { Phone, LogOut, Menu, X, Home } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Inicio", href: "/" },
  { name: "Nosotros", href: "/nosotros" },
  { name: "Servicios", href: "/servicios" },
  { name: "Trabajar con nosotros", href: "/trabajar-con-nosotros" },
  { name: "Contacto", href: "/contactanos" },
]

export default function Header() {
  const { user, ready, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isHome = pathname === "/" || pathname === ""

  const ctaHref =
    user?.role === "client"
      ? "/dashboard/cliente/reservacion"
      : user?.role === "staff"
      ? "/dashboard/empresa"
      : "/contactanos"

  const ctaLabel =
    user?.role === "client"
      ? "Reservación"
      : user?.role === "staff"
      ? "Panel eventos"
      : "Reservar"

  return (
    <header
      className="sticky top-0 z-50 text-foreground isolate border-b border-primary/25 bg-background shadow-md shadow-black/20 md:shadow-sm"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      {/* TOP BAR */}
      <div className="border-b border-primary/20 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/85">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 text-xs sm:text-sm">
          <a
            href="tel:+573102276914"
            className="flex items-center gap-2 text-foreground/90 min-w-0 shrink-0 hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4 shrink-0 text-primary" aria-hidden />
            <span className="truncate whitespace-nowrap">310 2276914</span>
          </a>

          <div className="flex flex-wrap items-center justify-end gap-x-2 gap-y-1.5 sm:gap-3 shrink-0">
            {ready && !user && (
              <>
                <Link href="/login" className="text-foreground/90 hover:text-primary transition-colors">
                  Entrar
                </Link>
                <Link href="/registro" className="text-primary font-medium hover:underline">
                  Registro
                </Link>
              </>
            )}

            {ready && user && (
              <>
                <span className="text-xs text-foreground/80 max-w-[9rem] truncate">{user.name}</span>
                <button
                  type="button"
                  className="p-1.5 rounded-md text-foreground hover:bg-primary/15"
                  onClick={() => {
                    logout()
                    router.push("/")
                  }}
                  aria-label="Cerrar sesión"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}

            <button
              type="button"
              className="px-2 py-1 rounded border border-primary/60 bg-primary/15 text-primary text-xs font-medium"
            >
              PSE
            </button>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="relative bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/90">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 flex items-center justify-between gap-2 min-h-16 sm:min-h-20 py-2 sm:py-0">
          {/* IZQUIERDA: MENÚ + LOGO */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 md:flex-initial">
            <button
              type="button"
              className="md:hidden p-2 -ml-1 rounded-md text-foreground border border-primary/30 bg-primary/10 hover:bg-primary/20 shrink-0"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-nav-menu"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link
              href="/"
              className="shrink-0 rounded-md ring-offset-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              title="Ir al inicio"
              aria-label="Ir al inicio (página principal)"
            >
              <div className="relative w-12 h-12 sm:w-14 sm:h-14">
                <Image
                  src="/images/logo.png"
                  alt="Casa Eventos Laura Sofía — inicio"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 48px, 56px"
                />
              </div>
            </Link>
          </div>

          {/* MENÚ DESKTOP */}
          <div className="hidden md:flex gap-8 text-foreground/90">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href))
                    ? "text-primary font-medium"
                    : "hover:text-primary transition-colors"
                }
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Móvil: siempre visible (en inicio indica página actual y sube al top al pulsar) */}
            <Link
              href="/"
              onClick={() => {
                setOpen(false)
                if (isHome) {
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
              }}
              aria-label={isHome ? "Ir al inicio (ya estás aquí; pulsa para subir)" : "Volver al inicio"}
              aria-current={isHome ? "page" : undefined}
              className={cn(
                "md:hidden inline-flex items-center gap-1.5 px-2.5 py-2 rounded-full border text-xs font-semibold transition-colors",
                isHome
                  ? "border-primary/70 bg-primary/25 text-primary"
                  : "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20"
              )}
            >
              <Home className="w-4 h-4 shrink-0" aria-hidden />
              <span>Inicio</span>
            </Link>

            {/* BOTÓN CTA */}
            <Link
              href={ctaHref}
              className="px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-primary text-white text-xs sm:text-sm font-semibold whitespace-nowrap max-md:max-w-[38vw] truncate text-center"
            >
              <span className="md:hidden">{ctaLabel.length > 12 ? `${ctaLabel.slice(0, 10)}…` : ctaLabel}</span>
              <span className="hidden md:inline">{ctaLabel}</span>
            </Link>
          </div>
        </div>

        {/* MENÚ MOBILE */}
        {open && (
          <div
            id="mobile-nav-menu"
            className="md:hidden absolute left-0 right-0 top-full border-t border-primary/20 bg-background p-4 pb-6 flex flex-col gap-1 z-[60] shadow-xl max-h-[min(70vh,calc(100dvh-8rem))] overflow-y-auto"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-lg py-3 px-2 rounded-lg text-foreground hover:bg-primary/10"
              >
                {item.name}
              </Link>
            ))}

            <Link
              href={ctaHref}
              onClick={() => setOpen(false)}
              className="mt-2 px-5 py-3 rounded-full bg-primary text-white text-center font-semibold"
            >
              {ctaLabel}
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}