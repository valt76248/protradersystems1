
import { supabase } from '@/lib/supabaseClient';

export interface Course {
    id: string;
    title: string;
    description: string;
}

export interface Module {
    id: string;
    course_id: string;
    title: string;
    description: string;
    position: number;
    is_published: boolean;
    created_at: string;
}

export const courseService = {
    async getCourseById(courseId: string) {
        const { data, error } = await supabase
            .from('courses')
            .select('id, title, description')
            .eq('id', courseId)
            .single();

        if (error) throw error;
        return data as Course;
    },

    async checkEnrollment(userId: string, courseId: string) {
        const { data, error } = await supabase
            .from('enrollments')
            .select('id')
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .maybeSingle();

        if (error) throw error;
        return !!data;
    },

    async getCourseModules(courseId: string) {
        const { data, error } = await supabase
            .from('modules')
            .select('*')
            .eq('course_id', courseId)
            .eq('is_published', true)
            .order('position', { ascending: true });

        if (error) throw error;

        // Apply specific business logic filtering here or in component?
        // Original component filtered out 'templates' and 'session 2 - materials'.
        // It helps to keep business logic in service if it's "data cleaning".
        const filteredModules = (data as Module[])?.filter(m =>
            !m.title.toLowerCase().includes('templates') &&
            !m.title.toLowerCase().includes('session 2 - materials')
        ) || [];

        return filteredModules;
    }
};
