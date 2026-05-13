import type { UserRole } from "@/lib/auth-types"

/** Estados del flujo interno (empresa) */
export type StaffEventStatus = "pending" | "in_progress" | "done" | "cancelled"

export type ClientReservation = {
  id: string
  title: string
  eventDate: string
  venue: string
  typeLabel: string
  statusLabel: string
  timeline: { date: string; label: string; done: boolean }[]
  notes: string[]
}

export type StaffEvent = {
  id: string
  clientName: string
  title: string
  eventDate: string
  venue: string
  status: StaffEventStatus
  budgetHint: string
}

const RESERVATION_KEY = "cela-client-reservation"
const STAFF_EVENTS_KEY = "cela-staff-events"

const defaultClientReservation: ClientReservation = {
  id: "res-1",
  title: "Celebración — vista previa",
  eventDate: "2026-06-15",
  venue: "Salón a confirmar — Florencia",
  typeLabel: "Boda / evento social",
  statusLabel: "Planificación en curso",
  timeline: [
    { date: "2026-05-01", label: "Reunión inicial y brief", done: true },
    { date: "2026-05-10", label: "Propuesta de decoración enviada", done: true },
    { date: "2026-05-20", label: "Prueba de menú / catering", done: false },
    { date: "2026-06-01", label: "Montaje y ensayo general", done: false },
    { date: "2026-06-15", label: "Día del evento", done: false },
  ],
  notes: [
    "Los horarios definitivos de montaje se confirman 10 días antes.",
    "Cualquier cambio de fecha comunícalo por el canal oficial de contacto.",
  ],
}

const defaultStaffEvents: StaffEvent[] = [
  {
    id: "ev-101",
    clientName: "María Gómez",
    title: "Quince años",
    eventDate: "2026-05-28",
    venue: "Finca El Paraíso",
    status: "pending",
    budgetHint: "Medio",
  },
  {
    id: "ev-102",
    clientName: "Hotel Caquetá",
    title: "Evento corporativo cierre",
    eventDate: "2026-06-03",
    venue: "Hotel — salón principal",
    status: "in_progress",
    budgetHint: "Alto",
  },
  {
    id: "ev-103",
    clientName: "Familia López",
    title: "Bautizo",
    eventDate: "2026-04-20",
    venue: "Capilla + salón",
    status: "done",
    budgetHint: "Bajo",
  },
]

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(value))
}

export function getClientReservation(): ClientReservation {
  return readJson(RESERVATION_KEY, defaultClientReservation)
}

export function setClientReservation(data: ClientReservation) {
  writeJson(RESERVATION_KEY, data)
}

export function getStaffEvents(): StaffEvent[] {
  return readJson(STAFF_EVENTS_KEY, defaultStaffEvents)
}

export function setStaffEvents(events: StaffEvent[]) {
  writeJson(STAFF_EVENTS_KEY, events)
}

export function updateStaffEventStatus(id: string, status: StaffEventStatus) {
  const list = getStaffEvents()
  const next = list.map((e) => (e.id === id ? { ...e, status } : e))
  setStaffEvents(next)
}

/** Semilla inicial si el usuario es nuevo (opcional por rol) */
export function ensureDemoDataForUser(_role: UserRole) {
  if (typeof window === "undefined") return
  if (!localStorage.getItem(RESERVATION_KEY)) {
    setClientReservation(defaultClientReservation)
  }
  if (!localStorage.getItem(STAFF_EVENTS_KEY)) {
    setStaffEvents(defaultStaffEvents)
  }
}
