"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Ban,
  Calendar,
  CheckCircle2,
  MapPin,
  PlayCircle,
  User,
} from "lucide-react"

import { useAuth } from "@/components/auth-provider"
import {
  getStaffEvents,
  updateStaffEventStatus,
  type StaffEvent,
  type StaffEventStatus,
} from "@/lib/demo-events"

const statusMeta: Record<
  StaffEventStatus,
  { label: string; color: string }
> = {
  pending: { label: "Por aceptar", color: "bg-amber-500/20 text-amber-200 border-amber-500/30" },
  in_progress: { label: "En proceso", color: "bg-sky-500/20 text-sky-100 border-sky-500/30" },
  done: { label: "Realizado", color: "bg-emerald-500/20 text-emerald-100 border-emerald-500/30" },
  cancelled: { label: "Cancelado", color: "bg-red-500/15 text-red-200 border-red-500/25" },
}

function formatDate(iso: string) {
  try {
    return new Date(iso + "T12:00:00").toLocaleDateString("es-CO", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  } catch {
    return iso
  }
}

export default function EmpresaDashboardPage() {
  const { user, ready, logout } = useAuth()
  const router = useRouter()
  const [events, setEvents] = useState<StaffEvent[]>([])

  useEffect(() => {
    if (!ready) return
    if (!user) {
      router.replace("/login?next=/dashboard/empresa")
      return
    }
    if (user.role !== "staff") {
      router.replace("/dashboard/cliente")
      return
    }
    setEvents(getStaffEvents())
  }, [user, ready, router])

  const grouped = useMemo(() => {
    const pending = events.filter((e) => e.status === "pending")
    const inProgress = events.filter((e) => e.status === "in_progress")
    const done = events.filter((e) => e.status === "done")
    const cancelled = events.filter((e) => e.status === "cancelled")
    return { pending, inProgress, done, cancelled }
  }, [events])

  function refresh() {
    setEvents(getStaffEvents())
  }

  if (!ready || !user || user.role !== "staff") {
    return (
      <div className="flex min-h-[40vh] items-center justify-center bg-background text-foreground/60">
        Cargando…
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background px-4 py-12 text-foreground sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/"
              className="mb-3 inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al sitio
            </Link>
            <p className="text-sm text-primary">Panel de empresa</p>
            <h1 className="font-serif text-3xl font-bold sm:text-4xl">
              Eventos —{" "}
              <span className="text-gradient-gold">gestión operativa</span>
            </h1>
            <p className="mt-1 max-w-xl text-foreground/65">
              Solicitudes por aceptar, eventos en curso y cierre. Los cambios se
              guardan en este navegador (demostración).
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-primary/25 bg-card/50 px-4 py-2 text-sm">
              {user.name}
            </span>
            <button
              type="button"
              onClick={() => {
                logout()
                router.push("/")
              }}
              className="rounded-full border border-primary/30 px-4 py-2 text-sm hover:bg-primary/10"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <EventColumn
            title="Por aceptar"
            subtitle="Confirma o cancela"
            events={grouped.pending}
            empty="No hay solicitudes pendientes."
            actions={(ev) => (
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    updateStaffEventStatus(ev.id, "in_progress")
                    refresh()
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-xs font-semibold text-primary-foreground"
                >
                  <PlayCircle className="h-3.5 w-3.5" />
                  Aceptar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateStaffEventStatus(ev.id, "cancelled")
                    refresh()
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-red-400/40 px-4 py-2 text-xs font-medium text-red-200 hover:bg-red-500/10"
                >
                  <Ban className="h-3.5 w-3.5" />
                  Cancelar
                </button>
              </div>
            )}
          />
          <EventColumn
            title="En proceso"
            subtitle="Montaje y seguimiento"
            events={grouped.inProgress}
            empty="No hay eventos activos."
            actions={(ev) => (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => {
                    updateStaffEventStatus(ev.id, "done")
                    refresh()
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/50 bg-emerald-500/15 px-4 py-2 text-xs font-semibold text-emerald-100"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Marcar realizado
                </button>
              </div>
            )}
          />
          <EventColumn
            title="Realizados"
            subtitle="Historial reciente"
            events={grouped.done}
            empty="Aún no hay eventos cerrados aquí."
          />
        </div>

        {grouped.cancelled.length > 0 ? (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 rounded-3xl border border-red-500/20 bg-red-950/20 p-6"
          >
            <h2 className="font-serif text-lg font-semibold text-red-100">
              Cancelados
            </h2>
            <ul className="mt-4 space-y-3">
              {grouped.cancelled.map((ev) => (
                <li
                  key={ev.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-red-500/20 bg-background/40 px-4 py-3 text-sm"
                >
                  <span className="font-medium">{ev.title}</span>
                  <span className="text-foreground/55">{ev.clientName}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        ) : null}
      </div>
    </div>
  )
}

function EventColumn({
  title,
  subtitle,
  events,
  empty,
  actions,
}: {
  title: string
  subtitle: string
  events: StaffEvent[]
  empty: string
  actions?: (ev: StaffEvent) => ReactNode
}) {
  return (
    <div className="rounded-3xl border border-primary/20 bg-card/30 p-5 backdrop-blur-sm">
      <h2 className="font-serif text-xl font-bold">{title}</h2>
      <p className="text-xs text-foreground/55">{subtitle}</p>
      <ul className="mt-5 space-y-4">
        {events.length === 0 ? (
          <li className="rounded-xl border border-dashed border-primary/20 bg-background/30 px-4 py-8 text-center text-sm text-foreground/50">
            {empty}
          </li>
        ) : (
          events.map((ev) => (
            <li
              key={ev.id}
              className="rounded-2xl border border-primary/15 bg-background/50 p-4 shadow-sm"
            >
              <span
                className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${statusMeta[ev.status].color}`}
              >
                {statusMeta[ev.status].label}
              </span>
              <p className="mt-2 font-serif text-lg font-semibold">{ev.title}</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-foreground/65">
                <User className="h-3.5 w-3.5" />
                {ev.clientName}
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-foreground/75">
                <Calendar className="h-4 w-4 text-primary" />
                {formatDate(ev.eventDate)}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-foreground/75">
                <MapPin className="h-4 w-4 text-primary" />
                {ev.venue}
              </p>
              <p className="mt-2 text-xs text-foreground/50">
                Presupuesto referencial: {ev.budgetHint}
              </p>
              {actions ? actions(ev) : null}
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
