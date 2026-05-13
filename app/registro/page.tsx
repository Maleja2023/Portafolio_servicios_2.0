"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Lock, Mail, User } from "lucide-react"

import { useAuth } from "@/components/auth-provider"
import type { UserRole } from "@/lib/auth-types"

export default function RegistroPage() {
  const { register, user, ready } = useAuth()
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("client")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!ready || !user) return
    router.replace(
      user.role === "client" ? "/dashboard/cliente" : "/dashboard/empresa"
    )
  }, [user, ready, router])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    const res = await register({ name, email, password, role })
    setLoading(false)
    if (!res.ok) {
      setError(res.message)
      return
    }
    router.replace(
      role === "client" ? "/dashboard/cliente" : "/dashboard/empresa"
    )
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
            Crear cuenta
          </h1>
          <p className="mt-2 text-sm text-foreground/65">
            Elige si eres cliente (planificas tu evento) o personal de la empresa
            (gestión interna). Los datos se guardan solo en este navegador (modo
            demostración).
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground/80">
                Nombre completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background/80 py-3 pl-10 pr-4 text-sm outline-none ring-ring/30 focus:ring-2"
                  placeholder="María Pérez"
                />
              </div>
            </div>
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
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground/80">
                Contraseña (mín. 6 caracteres)
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
                <input
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background/80 py-3 pl-10 pr-4 text-sm outline-none ring-ring/30 focus:ring-2"
                />
              </div>
            </div>

            <fieldset>
              <legend className="mb-2 text-sm font-medium text-foreground/80">
                Tipo de cuenta
              </legend>
              <div className="flex flex-col gap-2 sm:flex-row">
                <label className="flex flex-1 cursor-pointer items-center gap-2 rounded-xl border border-primary/20 bg-background/50 px-4 py-3 has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                  <input
                    type="radio"
                    name="role"
                    checked={role === "client"}
                    onChange={() => setRole("client")}
                    className="text-primary"
                  />
                  <span className="text-sm">Cliente</span>
                </label>
                <label className="flex flex-1 cursor-pointer items-center gap-2 rounded-xl border border-primary/20 bg-background/50 px-4 py-3 has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                  <input
                    type="radio"
                    name="role"
                    checked={role === "staff"}
                    onChange={() => setRole("staff")}
                    className="text-primary"
                  />
                  <span className="text-sm">Equipo / empresa</span>
                </label>
              </div>
            </fieldset>

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
              {loading ? "Creando cuenta…" : "Registrarse"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-foreground/65">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
