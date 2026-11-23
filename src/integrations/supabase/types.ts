export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      crm_conversations: {
        Row: {
          assigned_to: string | null
          channel: string
          created_at: string
          customer_name: string | null
          id: string
          last_message_at: string
          last_message_text: string | null
          lead_id: string | null
          status: string
          unread_count: number
          updated_at: string
          wa_id: string
        }
        Insert: {
          assigned_to?: string | null
          channel?: string
          created_at?: string
          customer_name?: string | null
          id?: string
          last_message_at?: string
          last_message_text?: string | null
          lead_id?: string | null
          status?: string
          unread_count?: number
          updated_at?: string
          wa_id: string
        }
        Update: {
          assigned_to?: string | null
          channel?: string
          created_at?: string
          customer_name?: string | null
          id?: string
          last_message_at?: string
          last_message_text?: string | null
          lead_id?: string | null
          status?: string
          unread_count?: number
          updated_at?: string
          wa_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_conversations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "crm_leads"
            referencedColumns: ["id"]
          }
        ]
      }
      crm_leads: {
        Row: {
          assigned_to: string | null
          budget: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          last_contacted_at: string | null
          looking_for: string | null
          notes: string | null
          phone: string
          preferred_location: string | null
          source: string
          status: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          budget?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          last_contacted_at?: string | null
          looking_for?: string | null
          notes?: string | null
          phone: string
          preferred_location?: string | null
          source?: string
          status?: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          budget?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          last_contacted_at?: string | null
          looking_for?: string | null
          notes?: string | null
          phone?: string
          preferred_location?: string | null
          source?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      crm_messages: {
        Row: {
          content: string | null
          conversation_id: string
          created_at: string
          direction: string
          error_message: string | null
          id: string
          media_url: string | null
          message_type: string
          raw_payload: Json | null
          sender_id: string | null
          sender_type: string
          status: string
          wa_message_id: string | null
        }
        Insert: {
          content?: string | null
          conversation_id: string
          created_at?: string
          direction: string
          error_message?: string | null
          id?: string
          media_url?: string | null
          message_type?: string
          raw_payload?: Json | null
          sender_id?: string | null
          sender_type: string
          status?: string
          wa_message_id?: string | null
        }
        Update: {
          content?: string | null
          conversation_id?: string
          created_at?: string
          direction?: string
          error_message?: string | null
          id?: string
          media_url?: string | null
          message_type?: string
          raw_payload?: Json | null
          sender_id?: string | null
          sender_type?: string
          status?: string
          wa_message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "crm_conversations"
            referencedColumns: ["id"]
          }
        ]
      }
      project_submissions: {
        Row: {
          created_at: string
          id: string
          project_id: string
          submitter_email: string | null
          submitter_name: string | null
          submitter_phone: string
          submitter_whatsapp: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          project_id: string
          submitter_email?: string | null
          submitter_name?: string | null
          submitter_phone: string
          submitter_whatsapp?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string
          submitter_email?: string | null
          submitter_name?: string | null
          submitter_phone?: string
          submitter_whatsapp?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          amenities: string[] | null
          bhk_list: number[] | null
          brochure_url: string | null
          builder: string | null
          canonical_url: string | null
          city: string | null
          configuration: string | null
          created_at: string
          custom_page_path: string | null
          description: string | null
          faqs: Json | null
          featured: boolean | null
          gallery: string[] | null
          hero_image: string | null
          id: string
          location: string | null
          map_embed_url: string | null
          max_price_inr: number | null
          meta_description: string | null
          min_price_inr: number | null
          name: string
          possession: string | null
          price_range: string | null
          property_type: string | null
          publish_status: string
          published_at: string | null
          seo_title: string | null
          slug: string
          source: string | null
          status: string | null
          submitted_at: string | null
          updated_at: string
          usp: string | null
        }
        Insert: {
          amenities?: string[] | null
          bhk_list?: number[] | null
          brochure_url?: string | null
          builder?: string | null
          canonical_url?: string | null
          city?: string | null
          configuration?: string | null
          created_at?: string
          custom_page_path?: string | null
          description?: string | null
          faqs?: Json | null
          featured?: boolean | null
          gallery?: string[] | null
          hero_image?: string | null
          id?: string
          location?: string | null
          map_embed_url?: string | null
          max_price_inr?: number | null
          meta_description?: string | null
          min_price_inr?: number | null
          name: string
          possession?: string | null
          price_range?: string | null
          property_type?: string | null
          publish_status?: string
          published_at?: string | null
          seo_title?: string | null
          slug: string
          source?: string | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string
          usp?: string | null
        }
        Update: {
          amenities?: string[] | null
          bhk_list?: number[] | null
          brochure_url?: string | null
          builder?: string | null
          canonical_url?: string | null
          city?: string | null
          configuration?: string | null
          created_at?: string
          custom_page_path?: string | null
          description?: string | null
          faqs?: Json | null
          featured?: boolean | null
          gallery?: string[] | null
          hero_image?: string | null
          id?: string
          location?: string | null
          map_embed_url?: string | null
          max_price_inr?: number | null
          meta_description?: string | null
          min_price_inr?: number | null
          name?: string
          possession?: string | null
          price_range?: string | null
          property_type?: string | null
          publish_status?: string
          published_at?: string | null
          seo_title?: string | null
          slug?: string
          source?: string | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string
          usp?: string | null
        }
        Relationships: []
      }
      upload_tickets: {
        Row: {
          created_at: string
          id: string
        }
        Insert: {
          created_at?: string
          id?: string
        }
        Update: {
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_valid_upload_ticket: { Args: { _ticket: string }; Returns: boolean }
      normalize_phone: { Args: { phone_input: string }; Returns: string }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
