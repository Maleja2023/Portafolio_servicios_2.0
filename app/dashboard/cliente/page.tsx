"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Sparkles,
} from "lucide-react"

import { useAuth } from "@/components/auth-provider"
import { homeServices as services, homeStats as stats } from "@/lib/home-services-data"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function ClienteDashboardPage() {
  const { user, ready, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!ready) return
    if (!user) {
      router.replace("/login?next=/dashboard/cliente")
      return
    }
    if (user.role !== "client") {
      router.replace("/dashboard/empresa")
    }
  }, [user, ready, router])

  if (!ready || !user || user.role !== "client") {
    return (
      <div className="flex min-h-[40vh] items-center justify-center bg-background text-foreground/60">
        Cargando…
      </div>
    )
  }

  return (
    <div className="home-page-shell min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="fixed inset-0 -z-10 golden-particles">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-background to-background" />
      </div>

      <main className="relative pb-28">
        <section className="border-b border-primary/15 bg-background/50 py-10 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <div>
              <p className="text-sm text-primary">Área de cliente</p>
              <h1 className="font-serif text-3xl font-bold sm:text-4xl">
                Hola,{" "}
                <span className="text-gradient-gold">{user.name}</span>
              </h1>
              <p className="mt-1 max-w-xl text-foreground/70">
                Misma experiencia del sitio: explora servicios y entra a tu{" "}
                <strong className="text-foreground">reservación</strong> para ver
                el cronograma de tu evento.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard/cliente/reservacion"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-primary/40"
              >
                <CalendarDays className="h-4 w-4" />
                Reservación
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout()
                  router.push("/")
                }}
                className="rounded-full border border-primary/35 px-5 py-3 text-sm font-medium text-foreground/80 transition hover:bg-primary/10"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                Tus próximos pasos
              </span>
              <h2 className="font-serif text-3xl font-bold sm:text-4xl">
                Servicios <span className="text-gradient-gold">Casa Laura Sofía</span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-foreground/70">
                Desde aquí puedes revisar lo que ofrecemos; el botón principal de tu
                cuenta es <strong>Reservación</strong>, donde está el detalle de tu
                evento.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {services.map((service) => (
                <motion.article
                  key={service.slug}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -6 }}
                  className="group relative h-[400px] overflow-hidden rounded-[2rem]"
                  style={{
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25 transition duration-500 group-hover:from-black/85" />
                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/35 bg-primary/15 backdrop-blur-sm">
                      <service.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mb-2 font-serif text-2xl font-bold text-white drop-shadow">
                      {service.title}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-sm text-gray-200 drop-shadow">
                      {service.subtitle}
                    </p>
                    <Link
                      href={`/servicios/${service.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
                    >
                      Ver más <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="border-y border-primary/15 bg-muted/20 py-14">
          <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-10 px-4 sm:px-6 lg:px-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-gradient-gold">{stat.value}</p>
                <p className="mt-1 text-sm text-foreground/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <Sparkles className="mx-auto mb-4 h-10 w-10 text-primary" />
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">
              ¿Necesitas ajustar fecha o servicios?
            </h2>
            <p className="mt-2 text-foreground/70">
              Revisa primero tu reservación; si hace falta, escríbenos por contacto.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/dashboard/cliente/reservacion"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg"
              >
                Abrir reservación
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contactanos"
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-primary/10"
              >
                Contacto
              </Link>
            </div>
          </div>
        </section>
      </main>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 left-1/2 z-40 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2"
      >
        <div className="glass flex items-center justify-between gap-4 rounded-full border border-primary/30 px-5 py-3">
          <div className="flex items-center gap-2 text-sm text-foreground/75">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            <span>Florencia, Colombia</span>
          </div>
          <Link
            href="/dashboard/cliente/reservacion"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md"
          >
            Reservación
            <CalendarDays className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
