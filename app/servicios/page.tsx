import "./page.css"
import Image from "next/image"
import {
  ArrowRight,
  Star,
  Sparkles,
  Heart,
  Calendar,
  PartyPopper,
  Music,
  Home,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"

import type { ServiceSlug } from "@/lib/service-pages-data"
import { SERVICE_ORDER, servicePagesBySlug } from "@/lib/service-pages-data"

const iconBySlug: Record<ServiceSlug, LucideIcon> = {
  quinceanos: Sparkles,
  bodas: Heart,
  fiestas: Music,
  corporativos: Calendar,
  infantiles: PartyPopper,
}

const services = SERVICE_ORDER.map((slug) => {
  const c = servicePagesBySlug[slug]
  return {
    slug,
    cotizacionTipo: c.cotizacionTipo,
    title: c.title,
    subtitle: c.listSubtitle,
    image: c.coverImage,
    features: c.cardFeatures,
    icon: iconBySlug[slug],
  }
})

export default function ServiciosPage() {
  return (
    <main className="servicios-page-shell min-h-screen bg-background text-foreground px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
          >
            <Home className="h-4 w-4 shrink-0" aria-hidden />
            Volver al inicio
          </Link>
        </div>

        <div className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/20 px-4 py-2 text-sm font-medium text-primary">
            <Star className="h-4 w-4" fill="currentColor" />
            Servicios completos
          </span>
          <h1 className="mb-4 text-4xl font-serif font-bold tracking-tight sm:text-5xl">
            Servicios para tu evento{" "}
            <span className="text-primary">hecho a tu medida</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70">
            Descubre las opciones que ofrecemos para matrimonios, quince años,
            fiestas de todo tipo, eventos corporativos y fiestas infantiles.
            En &quot;Ver más&quot; verás galería, combos y precios
            orientativos.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.slug}
              className="group relative h-[420px] overflow-hidden rounded-2xl"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />

              <div className="relative z-10 flex h-full flex-col justify-end p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/20 backdrop-blur-sm">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>

                <h2 className="mb-2 font-serif text-2xl font-bold text-white">
                  {service.title}
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-white/80">
                  {service.subtitle}
                </p>

                <ul className="mb-4 space-y-2 text-white/70">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
                  >
                    Ver más
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/cotizacion?tipo=${encodeURIComponent(service.cotizacionTipo)}`}
                    className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur hover:bg-white/20"
                  >
                    Solo datos / cotizar
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
