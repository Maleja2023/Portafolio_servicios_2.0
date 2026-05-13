'use client'

import Image from 'next/image'
import Link from 'next/link'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Home, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'

import type { ServicePageConfig } from '@/lib/service-pages-data'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

type Props = {
  config: ServicePageConfig
}

/** Lento = casi sin prisa; Medio = equilibrado; Rápido = más dinámico */
const SPEED_MS = { lento: 5500, medio: 2600, rapido: 1800 } as const
type CarouselSpeed = keyof typeof SPEED_MS

export function ServiceDetailView({ config }: Props) {
  const cotizacionHref = `/cotizacion?tipo=${encodeURIComponent(config.cotizacionTipo)}`
  const [carouselSpeed, setCarouselSpeed] = useState<CarouselSpeed>('rapido')

  const carouselPlugins = useMemo(() => {
    return [
      Autoplay({
        delay: SPEED_MS[carouselSpeed],
        /* true hacía que a veces el autoplay no reanudara al salir el cursor */
        stopOnMouseEnter: false,
        stopOnInteraction: false,
        stopOnFocusIn: false,
      }),
    ]
  }, [carouselSpeed])

  return (
    <div className="min-h-screen bg-background text-foreground pb-28">
      <div className="border-b border-primary/15 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
            >
              <Home className="h-4 w-4 shrink-0" aria-hidden />
              Volver al inicio
            </Link>
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
              Volver a servicios
            </Link>
          </div>
          <Link
            href={cotizacionHref}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:shadow-primary/35 sm:shrink-0"
          >
            Llenar datos / cotizar
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 text-center"
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
            <Sparkles className="h-3 w-3" />
            Casa de Eventos Laura Sofía
          </span>
          <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            {config.title}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-foreground/70">
            {config.intro}
          </p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="mb-4 flex flex-col gap-3 text-left sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="sm:max-w-xl lg:max-w-2xl">
              <h2 className="font-serif text-xl font-bold sm:text-2xl">
                Eventos <span className="text-gradient-gold">realizados</span>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70 sm:text-[15px]">
                A continuación compartimos una muestra representativa de celebraciones en las que hemos participado de
                forma activa. Las imágenes del carrusel recogen distintos escenarios, estilos de montaje y momentos
                vividos junto a nuestros clientes, y permiten apreciar la trayectoria y el estándar de ejecución con el
                que acompañamos este tipo de eventos.
              </p>
            </div>
            <div
              className="flex flex-wrap items-center gap-1.5 sm:justify-end"
              role="group"
              aria-label="Velocidad del carrusel"
            >
              <span className="mr-1 text-[11px] text-foreground/45">Ritmo</span>
              {(
                [
                  { id: 'lento' as const, label: 'Lento' },
                  { id: 'medio' as const, label: 'Medio' },
                  { id: 'rapido' as const, label: 'Rápido' },
                ] as const
              ).map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setCarouselSpeed(id)}
                  className={`rounded-md border px-2 py-0.5 text-[11px] font-medium transition ${
                    carouselSpeed === id
                      ? 'border-primary/60 bg-primary/20 text-primary'
                      : 'border-primary/15 bg-background/40 text-foreground/60 hover:border-primary/35 hover:text-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full px-1 sm:px-2 md:px-4">
            <Carousel
              key={carouselSpeed}
              opts={{ align: 'start', loop: true }}
              plugins={carouselPlugins}
              className="w-full"
            >
              <CarouselContent className="-ml-0">
                {config.gallery.map((item, index) => (
                  <CarouselItem
                    key={`${item.src}-${index}`}
                    className="min-w-0 shrink-0 grow-0 basis-full pl-0"
                  >
                    <div className="relative isolate mx-auto w-full max-w-[min(100%,1400px)] overflow-hidden rounded-xl border border-primary/25 bg-background shadow-lg ring-1 ring-black/30 h-[clamp(420px,76dvh,720px)] sm:h-[clamp(460px,74dvh,800px)] md:h-[clamp(500px,72dvh,880px)] lg:h-[clamp(540px,76dvh,960px)] xl:h-[clamp(580px,78dvh,min(90dvh,1040px))] 2xl:h-[clamp(620px,80dvh,min(92dvh,1120px))]">
                      <div className="absolute inset-0 size-full">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-contain object-center"
                          sizes="(max-width: 768px) 100vw, (max-width: 1400px) 95vw, 1400px"
                          priority={index === 0}
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                      <p className="pointer-events-none absolute bottom-3 left-4 right-4 z-[2] text-sm font-medium text-white drop-shadow-md sm:bottom-4 sm:text-base">
                        {item.alt}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                variant="outline"
                size="icon-sm"
                className="size-8 border-primary/30 bg-background/90 text-foreground shadow-sm hover:bg-primary/15 sm:size-9 md:left-2"
              />
              <CarouselNext
                variant="outline"
                size="icon-sm"
                className="size-8 border-primary/30 bg-background/90 text-foreground shadow-sm hover:bg-primary/15 sm:size-9 md:right-2"
              />
            </Carousel>
          </div>
        </motion.section>

        <section className="mb-12">
          <div className="mb-8 text-center">
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">
              Combos <span className="text-gradient-gold">recomendados</span>
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-foreground/65">
              Precios orientativos según temporada, número de invitados y personalizaciones. La cotización final la confirma el equipo al revisar tu brief.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {config.combos.map((combo, index) => (
              <motion.article
                key={combo.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className={`group relative flex flex-col rounded-[1.75rem] border bg-card/40 p-6 backdrop-blur-md transition hover-lift ${
                  combo.popular
                    ? 'border-primary/60 shadow-[0_0_40px_rgba(212,168,83,0.12)]'
                    : 'border-primary/20'
                }`}
              >
                {combo.popular ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-primary/40 bg-primary px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                    Más pedido
                  </span>
                ) : null}
                <div className="mb-4">
                  <h3 className="font-serif text-xl font-bold">{combo.name}</h3>
                  <p className="mt-1 text-sm text-foreground/65">{combo.tagline}</p>
                </div>
                <p className="mb-5 text-lg font-semibold text-gradient-gold">
                  {combo.approxPriceLabel}
                </p>
                <ul className="mb-6 flex-1 space-y-2.5 text-sm text-foreground/80">
                  {combo.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <p className="mb-4 text-xs text-foreground/50">
                  Valor aproximado. Puede variar según fecha, sede, invitados y add-ons.
                </p>
                <Link
                  href={cotizacionHref}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/35 bg-primary/10 py-3 text-sm font-semibold text-primary transition group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  Solicitar este combo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.article>
            ))}
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass relative overflow-hidden rounded-[2rem] border border-primary/25 p-8 text-center"
        >
          <div className="pointer-events-none absolute inset-0 animate-shimmer opacity-30" />
          <div className="relative z-10 space-y-4">
            <h3 className="font-serif text-2xl font-bold">
              ¿Listo para dejar los datos y recibir propuesta?
            </h3>
            <p className="mx-auto max-w-xl text-foreground/70">
              Te llevamos al formulario de cotización con el tipo de evento ya seleccionado para ahorrarte un paso.
            </p>
            <Link
              href={cotizacionHref}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-10 py-4 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition hover:shadow-primary/40"
            >
              Ir al formulario de cotización
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
