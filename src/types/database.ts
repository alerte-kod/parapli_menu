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
      categories: {
        Row: {
          id: string
          name: string
          created_at: string
          order_index: number | null
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
          order_index?: number | null
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
          order_index?: number | null
        }
        Relationships: []
      }
      menu_items: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          category_id: string
          image_url: string | null
          created_at: string
          is_special_offer: boolean | null
          original_price: number | null
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          category_id: string
          image_url?: string | null
          created_at?: string
          is_special_offer?: boolean | null
          original_price?: number | null
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          category_id?: string
          image_url?: string | null
          created_at?: string
          is_special_offer?: boolean | null
          original_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
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