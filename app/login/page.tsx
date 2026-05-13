"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Lock, Mail } from "lucide-react"

import { useAuth } from "@/components/auth-provider"

export default function LoginPage() {
  const { login, user, ready } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [nextPath, setNextPath] = useState<string | null>(null)

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("next")
    if (q?.startsWith("/")) setNextPath(q)
  }, [])

  useEffect(() => {
    if (!ready || !user) return
    const fallback =
      user.role === "client" ? "/dashboard/cliente" : "/dashboard/empresa"
    router.replace(nextPath ?? fallback)
  }, [user, ready, router, nextPath])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    const res = await login(email, password)
    setLoading(false)
    if (!res.ok) {
      setError(res.message)
      return
    }
    const dest =
      nextPath ??
      (res.user.role === "staff" ? "/dashboard/empresa" : "/dashboard/cliente")
    router.replace(dest)
  }

  return (
    <div className="min-h-[calc(100vh-9rem)] bg-background px-4 py-16 text-foreground">
      <div className="mx-auto w-full max-w-md">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-primary/25 bg-card/40 p-8 shadow-xl backdrop-blur-md"
        >
          <h1 className="font-serif text-3xl font-bold text-balance">
            Iniciar sesión
          </h1>
          <p className="mt-2 text-sm text-foreground/65">
            Accede a tu panel de cliente o al panel de eventos del equipo.
          </p>

          <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-xs text-foreground/75">
            <p className="font-semibold text-primary">Cuentas de demostración</p>
            <p className="mt-1">
              Cliente: <code className="text-foreground">cliente@demo.com</code> /{" "}
              <code>demo123</code>
            </p>
            <p>
              Empresa: <code className="text-foreground">equipo@demo.com</code> /{" "}
              <code>demo123</code>
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground/80">
                Correo
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background/80 py-3 pl-10 pr-4 text-sm outline-none ring-ring/30 focus:ring-2"
                  placeholder="tu@correo.com"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground/80">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background/80 py-3 pl-10 pr-4 text-sm outline-none ring-ring/30 focus:ring-2"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error ? (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gradient-to-r from-primary to-accent py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-primary/40 disabled:opacity-60"
            >
              {loading ? "Entrando…" : "Entrar"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-foreground/65">
            ¿No tienes cuenta?{" "}
            <Link href="/registro" className="font-semibold text-primary hover:underline">
              Registrarse
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
