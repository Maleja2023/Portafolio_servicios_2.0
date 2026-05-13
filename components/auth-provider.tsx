"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

import type { AuthUser, UserRole } from "@/lib/auth-types"
import { AUTH_STORAGE_KEY, USERS_DB_KEY } from "@/lib/auth-types"
import { ensureDemoDataForUser } from "@/lib/demo-events"

type StoredUser = AuthUser & { password: string }

const DEMO_USERS: StoredUser[] = [
  {
    id: "demo-client",
    email: "cliente@demo.com",
    password: "demo123",
    name: "Cliente demo",
    role: "client",
  },
  {
    id: "demo-staff",
    email: "equipo@demo.com",
    password: "demo123",
    name: "Equipo Casa Laura Sofía",
    role: "staff",
  },
]

function seedDemoUsersIfEmpty() {
  if (typeof window === "undefined") return
  if (localStorage.getItem(USERS_DB_KEY)) return
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(DEMO_USERS))
  DEMO_USERS.forEach((u) => ensureDemoDataForUser(u.role))
}

function readSession(): AuthUser | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return null
    const u = JSON.parse(raw) as AuthUser
    if (!u?.email || !u?.id || (u.role !== "client" && u.role !== "staff")) {
      return null
    }
    return u
  } catch {
    return null
  }
}

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(USERS_DB_KEY)
    if (!raw) return []
    return JSON.parse(raw) as StoredUser[]
  } catch {
    return []
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users))
}

type AuthContextValue = {
  user: AuthUser | null
  ready: boolean
  login: (
    email: string,
    password: string
  ) => Promise<
    | { ok: true; user: AuthUser }
    | { ok: false; message: string }
  >
  register: (input: {
    name: string
    email: string
    password: string
    role: UserRole
  }) => Promise<{ ok: true } | { ok: false; message: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    seedDemoUsersIfEmpty()
    setUser(readSession())
    setReady(true)
  }, [])

  const persistSession = useCallback((u: AuthUser | null) => {
    if (u) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(u))
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
    setUser(u)
  }, [])

  const login = useCallback(
    async (email: string, password: string) => {
      const normalized = email.trim().toLowerCase()
      const users = readUsers()
      const found = users.find(
        (u) => u.email === normalized && u.password === password
      )
      if (!found) {
        return {
          ok: false as const,
          message: "Correo o contraseña incorrectos. Si no tienes cuenta, regístrate.",
        }
      }
      const { password: _p, ...session } = found
      ensureDemoDataForUser(session.role)
      persistSession(session)
      return { ok: true as const, user: session }
    },
    [persistSession]
  )

  const register = useCallback(
    async (input: {
      name: string
      email: string
      password: string
      role: UserRole
    }) => {
      const normalized = input.email.trim().toLowerCase()
      if (input.password.length < 6) {
        return { ok: false as const, message: "La contraseña debe tener al menos 6 caracteres." }
      }
      const users = readUsers()
      if (users.some((u) => u.email === normalized)) {
        return { ok: false as const, message: "Ya existe una cuenta con ese correo." }
      }
      const newUser: StoredUser = {
        id: `u-${Date.now()}`,
        email: normalized,
        name: input.name.trim(),
        password: input.password,
        role: input.role,
      }
      writeUsers([...users, newUser])
      const { password: _p, ...session } = newUser
      ensureDemoDataForUser(session.role)
      persistSession(session)
      return { ok: true as const }
    },
    [persistSession]
  )

  const logout = useCallback(() => {
    persistSession(null)
  }, [persistSession])

  const value = useMemo(
    () => ({ user, ready, login, register, logout }),
    [user, ready, login, register, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de AuthProvider")
  }
  return ctx
}
