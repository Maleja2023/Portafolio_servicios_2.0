"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  StickyNote,
} from "lucide-react"

import { useAuth } from "@/components/auth-provider"
import { getClientReservation, type ClientReservation } from "@/lib/demo-events"

function formatDate(iso: string) {
  try {
    return new Date(iso + "T12:00:00").toLocaleDateString("es-CO", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  } catch {
    return iso
  }
}

export default function ReservacionPage() {
  const { user, ready, logout } = useAuth()
  const router = useRouter()
  const [data, setData] = useState<ClientReservation | null>(null)

  useEffect(() => {
    if (!ready) return
    if (!user) {
      router.replace("/login?next=/dashboard/cliente/reservacion")
      return
    }
    if (user.role !== "client") {
      router.replace("/dashboard/empresa")
      return
    }
    setData(getClientReservation())
  }, [user, ready, router])

  if (!ready || !user || user.role !== "client" || !data) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center bg-background text-foreground/60">
        Cargando…
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background px-4 py-12 text-foreground sm:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/dashboard/cliente"
            className="inline-flex items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al panel
          </Link>
          <button
            type="button"
            onClick={() => {
              logout()
              router.push("/")
            }}
            className="text-sm text-foreground/55 hover:text-foreground"
          >
            Cerrar sesión
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-primary/25 bg-card/35 p-6 shadow-lg backdrop-blur-md sm:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Tu reservación
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold">{data.title}</h1>
          <p className="mt-1 text-sm text-foreground/65">{data.statusLabel}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-2xl border border-primary/15 bg-background/40 p-4">
              <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-xs font-medium uppercase text-foreground/50">
                  Fecha del evento
                </p>
                <p className="font-medium">{formatDate(data.eventDate)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-primary/15 bg-background/40 p-4">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-xs font-medium uppercase text-foreground/50">
                  Lugar
                </p>
                <p className="font-medium">{data.venue}</p>
              </div>
            </div>
          </div>

          <p className="mt-4 inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {data.typeLabel}
          </p>

          <h2 className="mt-10 font-serif text-xl font-semibold">Cronograma</h2>
          <ol className="relative mt-4 space-y-0 border-l-2 border-primary/25 pl-6">
            {data.timeline.map((step) => (
              <li key={`${step.date}-${step.label}`} className="relative pb-8 last:pb-0">
                <span
                  className="absolute -left-[1.35rem] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary/40 bg-background"
                  aria-hidden
                >
                  {step.done ? (
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-foreground/20" />
                  )}
                </span>
                <p className="text-xs text-primary">{formatDate(step.date)}</p>
                <p className="font-medium text-foreground">{step.label}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-2xl border border-primary/20 bg-secondary/20 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
              <StickyNote className="h-4 w-4 text-primary" />
              Notas
            </div>
            <ul className="space-y-2 text-sm text-foreground/75">
              {data.notes.map((n) => (
                <li key={n}>• {n}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
