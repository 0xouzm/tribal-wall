export interface Profile {
  id: string
  name: string
  contact: string
  about: string
  created_at: number
  expires_at: number
  is_archived: number
}

export interface ProfileInput {
  name: string
  contact: string
  about: string
}

export interface Env {
  DB: D1Database
  ADMIN_PASSWORD?: string
}
