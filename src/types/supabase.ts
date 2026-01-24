export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            courses: {
                Row: {
                    created_at: string
                    description: string | null
                    id: string
                    image_url: string | null
                    is_published: boolean | null
                    position: number | null
                    price_usdt: number | null
                    title: string
                }
                Insert: {
                    created_at?: string
                    description?: string | null
                    id?: string
                    image_url?: string | null
                    is_published?: boolean | null
                    position?: number | null
                    price_usdt?: number | null
                    title: string
                }
                Update: {
                    created_at?: string
                    description?: string | null
                    id?: string
                    image_url?: string | null
                    is_published?: boolean | null
                    position?: number | null
                    price_usdt?: number | null
                    title?: string
                }
                Relationships: []
            }
            enrollments: {
                Row: {
                    course_id: string
                    enrolled_at: string
                    id: string
                    progress: number | null
                    user_id: string
                }
                Insert: {
                    course_id: string
                    enrolled_at?: string
                    id?: string
                    progress?: number | null
                    user_id: string
                }
                Update: {
                    course_id?: string
                    enrolled_at?: string
                    id?: string
                    progress?: number | null
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "enrollments_course_id_fkey"
                        columns: ["course_id"]
                        isOneToOne: false
                        referencedRelation: "courses"
                        referencedColumns: ["id"]
                    },
                ]
            }
            lessons: {
                Row: {
                    content: string | null
                    course_id: string
                    created_at: string
                    description: string | null
                    duration_minutes: number | null
                    id: string
                    is_preview: boolean | null
                    is_published: boolean | null
                    position: number | null
                    title: string
                    video_url: string | null
                }
                Insert: {
                    content?: string | null
                    course_id: string
                    created_at?: string
                    description?: string | null
                    duration_minutes?: number | null
                    id?: string
                    is_preview?: boolean | null
                    is_published?: boolean | null
                    position?: number | null
                    title: string
                    video_url?: string | null
                }
                Update: {
                    content?: string | null
                    course_id?: string
                    created_at?: string
                    description?: string | null
                    duration_minutes?: number | null
                    id?: string
                    is_preview?: boolean | null
                    is_published?: boolean | null
                    position?: number | null
                    title?: string
                    video_url?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "lessons_course_id_fkey"
                        columns: ["course_id"]
                        isOneToOne: false
                        referencedRelation: "courses"
                        referencedColumns: ["id"]
                    },
                ]
            }
            modules: {
                Row: {
                    course_id: string
                    created_at: string
                    description: string | null
                    id: string
                    is_published: boolean | null
                    position: number | null
                    title: string
                }
                Insert: {
                    course_id: string
                    created_at?: string
                    description?: string | null
                    id?: string
                    is_published?: boolean | null
                    position?: number | null
                    title: string
                }
                Update: {
                    course_id?: string
                    created_at?: string
                    description?: string | null
                    id?: string
                    is_published?: boolean | null
                    position?: number | null
                    title?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "modules_course_id_fkey"
                        columns: ["course_id"]
                        isOneToOne: false
                        referencedRelation: "courses"
                        referencedColumns: ["id"]
                    },
                ]
            }
            profiles: {
                Row: {
                    avatar_url: string | null
                    created_at: string
                    full_name: string | null
                    id: string
                    updated_at: string | null
                    username: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    created_at?: string
                    full_name?: string | null
                    id: string
                    updated_at?: string | null
                    username?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    created_at?: string
                    full_name?: string | null
                    id?: string
                    updated_at?: string | null
                    username?: string | null
                }
                Relationships: []
            }
            user_progress: {
                Row: {
                    completed_at: string
                    id: string
                    lesson_id: string
                    user_id: string
                }
                Insert: {
                    completed_at?: string
                    id?: string
                    lesson_id: string
                    user_id: string
                }
                Update: {
                    completed_at?: string
                    id?: string
                    lesson_id?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "user_progress_lesson_id_fkey"
                        columns: ["lesson_id"]
                        isOneToOne: false
                        referencedRelation: "lessons"
                        referencedColumns: ["id"]
                    },
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
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
