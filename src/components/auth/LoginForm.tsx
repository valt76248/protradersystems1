
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { useLanguage } from '@/contexts/LanguageContext';
import AuraButton from '@/components/ui/AuraButton';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onToggleMode: () => void;
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode, onClose }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (resetMode) {
        const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;

        toast({
          title: t('auth.reset.title'),
          description: t('auth.reset.subtitle')
        });
        setResetMode(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;

        toast({
          title: t('auth.success.login'),
          description: t('nav.goodbye').includes('!') ? t('nav.goodbye') : 'Welcome back!'
        });

        onClose();
        navigate('/');
        window.location.reload();
      }
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (resetMode) {
    return (
      <Card className="bg-trading-card border-gray-800 w-full max-w-md shadow-2xl overflow-hidden">
        <CardHeader className="text-center relative">
          <button
            onClick={() => setResetMode(false)}
            className="absolute left-4 top-6 text-gray-400 hover:text-white transition-colors"
            aria-label={t('auth.reset.back')}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <CardTitle className="text-2xl mt-4">{t('auth.reset.title')}</CardTitle>
          <p className="text-gray-400">{t('auth.reset.subtitle')}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="reset-email" className="text-gray-300">{t('auth.email')}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="pl-10 bg-gray-800 border-gray-700 text-white h-12"
                />
              </div>
            </div>

            <AuraButton
              type="submit"
              variant="ghost-glow-blue"
              size="lg"
              className="w-full text-lg font-medium"
              disabled={isLoading}
            >
              {isLoading ? '...' : t('auth.reset.send')}
            </AuraButton>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-trading-card border-gray-800 w-full max-w-md shadow-2xl overflow-hidden">
      <CardHeader className="text-center pb-2">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-trading-accent/20 blur-2xl rounded-full" />
            <img
              src="/protrader_emblem.png"
              alt="ProTrader Systems Emblem"
              className="w-24 h-24 relative z-10 animate-pulse-subtle"
            />
          </div>
        </div>
        <CardTitle className="text-2xl">{t('auth.login.title')}</CardTitle>
        <p className="text-gray-400">{t('auth.login.subtitle')}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">{t('auth.email')}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white h-12"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{t('auth.password')}</Label>
              <button
                type="button"
                onClick={() => setResetMode(true)}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                {t('auth.forgotPassword')}
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t('auth.password.placeholder')}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="pl-10 pr-10 bg-gray-800 border-gray-700 text-white h-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <AuraButton
            type="submit"
            variant="ghost-glow-blue"
            size="lg"
            className="w-full text-lg font-medium mt-2"
            disabled={isLoading}
          >
            {isLoading ? '...' : t('auth.submit.login')}
          </AuraButton>
        </form>

        <Separator className="my-6 bg-gray-800" />

        <div className="text-center">
          <p className="text-gray-400 mb-4 text-sm">{t('auth.noAccount')}</p>
          <AuraButton
            variant="ghost-glow-silver"
            onClick={onToggleMode}
            className="w-full"
          >
            {t('auth.register.title')}
          </AuraButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
