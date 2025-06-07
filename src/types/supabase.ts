export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          role: 'visitor' | 'member' | 'ministry_user' | 'ministry_leader' | 'social_media'
          ministries: string[] | null
          is_leader_of: string[] | null
          created_at: string
          last_login: string
          is_active: boolean
          avatar: string | null
          phone: string | null
          address: string | null
          birth_date: string | null
          baptism_date: string | null
          skills: string[] | null
          availability: string[] | null
          social_networks: Json | null
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          role?: 'visitor' | 'member' | 'ministry_user' | 'ministry_leader' | 'social_media'
          ministries?: string[] | null
          is_leader_of?: string[] | null
          created_at?: string
          last_login?: string
          is_active?: boolean
          avatar?: string | null
          phone?: string | null
          address?: string | null
          birth_date?: string | null
          baptism_date?: string | null
          skills?: string[] | null
          availability?: string[] | null
          social_networks?: Json | null
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          role?: 'visitor' | 'member' | 'ministry_user' | 'ministry_leader' | 'social_media'
          ministries?: string[] | null
          is_leader_of?: string[] | null
          created_at?: string
          last_login?: string
          is_active?: boolean
          avatar?: string | null
          phone?: string | null
          address?: string | null
          birth_date?: string | null
          baptism_date?: string | null
          skills?: string[] | null
          availability?: string[] | null
          social_networks?: Json | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
