'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

const EVENT_OPTIONS = [
  { value: '', label: 'Selecciona una opción' },
  { value: 'bodas', label: 'Bodas' },
  { value: 'quinceanos', label: 'Quinceaños' },
  { value: 'corporativos', label: 'Eventos corporativos' },
  { value: 'infantiles', label: 'Fiestas infantiles' },
  { value: 'fiestas', label: 'Fiestas' },
] as const

type Props = {
  initialTipo?: string
}

export function CotizacionForm({ initialTipo }: Props) {
  const allowed = useMemo(
    () =>
      new Set<string>(
        EVENT_OPTIONS.map((o) => o.value).filter((v) => v !== ''),
      ),
    [],
  )

  const [evento, setEvento] = useState('')

  useEffect(() => {
    let tipo = initialTipo
    if (tipo === 'bautizos') tipo = 'infantiles'
    if (tipo === 'primeras-comuniones') tipo = 'fiestas'
    if (tipo && allowed.has(tipo)) {
      setEvento(tipo)
    }
  }, [initialTipo, allowed])

  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-20">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-primary/20 bg-white/5 p-10 shadow-[0_25px_60px_rgba(0,0,0,0.25)] backdrop-blur">
        <h1 className="mb-6 text-4xl font-bold text-white">Cotización</h1>
        <p className="mb-8 text-lg leading-relaxed text-slate-300">
          Bienvenido a la página de cotización. Completa tus datos y te enviaremos
          una propuesta personalizada para tu evento.
        </p>
        <div className="space-y-4 text-slate-300">
          <p>
            Completa tus datos y cuéntanos sobre tu evento para recibir una
            cotización personalizada.
          </p>
          <p>
            Si prefieres, también puedes{' '}
            <Link href="/contactanos" className="text-primary underline">
              contactarnos directamente
            </Link>{' '}
            para obtener asistencia inmediata.
          </p>
        </div>

        <form className="mt-10 grid gap-6 text-slate-300" action="#" method="post">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-foreground">
                Nombre completo
              </span>
              <input
                type="text"
                name="nombre"
                required
                className="mt-2 w-full rounded-3xl border border-primary/20 bg-background/70 px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Juan Pérez"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-foreground">
                Correo electrónico
              </span>
              <input
                type="email"
                name="email"
                required
                className="mt-2 w-full rounded-3xl border border-primary/20 bg-background/70 px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="correo@ejemplo.com"
              />
            </label>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-foreground">Teléfono</span>
              <input
                type="tel"
                name="telefono"
                required
                className="mt-2 w-full rounded-3xl border border-primary/20 bg-background/70 px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="310 1234567"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-foreground">
                Fecha del evento
              </span>
              <input
                type="date"
                name="fecha"
                required
                className="mt-2 w-full rounded-3xl border border-primary/20 bg-background/70 px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-foreground">
              Tipo de evento
            </span>
            <select
              name="evento"
              required
              value={evento}
              onChange={(e) => setEvento(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-primary/20 bg-background/70 px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              {EVENT_OPTIONS.map((opt) => (
                <option key={opt.value || 'empty'} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-foreground">Mensaje</span>
            <textarea
              name="mensaje"
              rows={5}
              className="mt-2 w-full rounded-3xl border border-primary/20 bg-background/70 px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Cuéntanos más sobre tu evento, invitados, estilo o presupuesto estimado..."
            />
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent px-8 py-4 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/40"
          >
            Enviar cotización
          </button>
        </form>
      </div>
    </main>
  )
}
