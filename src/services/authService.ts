
import { supabase } from '@/lib/supabaseClient';

export interface LoginParams {
    email: string;
    password: string;
}

export interface RegisterParams {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    referralCode?: string | null;
    metadata?: Record<string, any>;
}

export interface ResetPasswordParams {
    email: string;
    redirectTo?: string;
}

export const authService = {
    async login({ email, password }: LoginParams) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    },

    async register({ email, password, firstName, lastName, phone, referralCode, metadata }: RegisterParams) {
        const fullName = `${firstName} ${lastName}`.trim();

        // 1. Sign Up
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    phone: phone,
                    referral_code: referralCode,
                    ...metadata
                }
            }
        });

        if (error) throw error;

        // 2. Handle Referral Logic (if applicable)
        if (referralCode && data.user) {
            await this.handleReferral({
                referralCode,
                referredEmail: email,
                referredUserId: data.user.id,
                referredName: fullName
            });
        }

        return data;
    },

    async handleReferral({ referralCode, referredEmail, referredUserId, referredName }: {
        referralCode: string,
        referredEmail: string,
        referredUserId: string,
        referredName: string
    }) {
        // Call n8n webhook
        try {
            await fetch('https://n8n.protradersystems.com/webhook/new-referral-signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    referral_code: referralCode,
                    referred_email: referredEmail,
                    referred_user_id: referredUserId,
                    referred_name: referredName,
                    timestamp: new Date().toISOString()
                })
            });
        } catch (webhookError) {
            // Silently fail or log, as per original logic "Referral webhook skipped"
            console.warn('Referral webhook skipped:', webhookError);
        }

        // Insert into Supabase referrals table
        const { error } = await (supabase.from('referrals') as any).insert({
            referral_code: referralCode,
            referred_email: referredEmail,
            referred_user_id: referredUserId,
            status: 'registered'
        });

        // We generally don't block registration on referral error, but acts as best effort
        if (error) console.error('Error recording referral:', error);
    },

    async resetPassword({ email, redirectTo }: ResetPasswordParams) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: redirectTo || `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
    },

    async logout() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    async getCurrentUser() {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        return user;
    }
};
