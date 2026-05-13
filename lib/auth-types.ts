export type UserRole = "client" | "staff"

export type AuthUser = {
  id: string
  email: string
  name: string
  role: UserRole
}

export const AUTH_STORAGE_KEY = "cela-auth-user"
export const USERS_DB_KEY = "cela-users-db"
