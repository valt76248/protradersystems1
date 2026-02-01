
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Mail, Lock, User, Phone, Gift, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { authService } from '@/services/authService';
import { useLanguage } from '@/contexts/LanguageContext';
import AuraButton from '@/components/ui/AuraButton';

export type RegisterVariant = 'default' | 'buyer' | 'consultation';

interface RegisterFormProps {
  onToggleMode: () => void;
  onClose: () => void;
  variant?: RegisterVariant;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleMode, onClose, variant = 'default' }) => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referralDiscount, setReferralDiscount] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    if (refCode) {
      setReferralCode(refCode.toUpperCase());
      setReferralDiscount(true);
      localStorage.setItem('referral_code', refCode.toUpperCase());
    } else {
      const storedRef = localStorage.getItem('referral_code');
      if (storedRef) {
        setReferralCode(storedRef);
        setReferralDiscount(true);
      }
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: t('auth.error'),
        description: t('settings.passwords_not_match'),
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      await authService.register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        referralCode: referralCode,
        metadata: {
          user_type: variant,
          role: variant === 'buyer' ? 'student' : variant === 'consultation' ? 'lead' : 'user'
        }
      });

      toast({
        title: t('auth.success.register'),
        description: t('auth.register.subtitle')
      });

      onClose();

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

  return (
    <Card className="bg-trading-card border-gray-800 w-full max-w-md shadow-2xl overflow-hidden">
      <CardHeader className="text-center p-6 pb-2">
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
        <CardTitle className="text-2xl">
          {variant === 'consultation'
            ? 'Запись на консультацию'
            : variant === 'buyer'
              ? t('auth.register.title') // Or tailored "Purchase Registration"
              : t('auth.register.title')}
        </CardTitle>
        <p className="text-gray-400 text-sm">
          {variant === 'consultation'
            ? 'Заполните форму, и мы свяжемся с вами.'
            : t('auth.register.subtitle')}
        </p>

        {referralDiscount && (
          <div className="mt-4 p-3 rounded-lg bg-emerald-900/20 border border-emerald-500/30">
            <div className="flex items-center justify-center gap-2">
              <Gift className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-400 font-semibold text-sm">Скидка 10% активирована!</span>
            </div>
            <p className="text-xs text-emerald-400/70 mt-1">
              Ref code: <code className="bg-emerald-500/20 px-1 rounded">{referralCode}</code>
            </p>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4 p-6 pt-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t('auth.firstName')}</Label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                <Input
                  id="firstName"
                  placeholder="Ivan"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 h-11"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">{t('auth.lastName')}</Label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                <Input
                  id="lastName"
                  placeholder="Ivanov"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 h-11"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 h-11"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t('auth.phone')}</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                placeholder="+380..."
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 h-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t('auth.password')}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t('auth.password.minLength')}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="pl-10 pr-10 bg-gray-800 border-gray-700 h-11"
                required
                minLength={6}
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t('auth.password.confirm')}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="..."
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="pl-10 pr-10 bg-gray-800 border-gray-700 h-11"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-white"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="text-[10px] text-gray-500 flex items-start gap-2 pt-2">
            <input
              type="checkbox"
              id="terms-checkbox"
              className="mt-0.5 rounded border-gray-700 bg-gray-800"
              required
            />
            <label htmlFor="terms-checkbox">
              Я погоджуюся з <a href="/offer" className="text-blue-400 underline">{t('footer.offer')}</a> та <a href="/privacy" className="text-blue-400 underline">{t('footer.privacy')}</a>
            </label>
          </div>

          <AuraButton
            type="submit"
            variant={referralDiscount ? "ghost-glow-emerald" : "ghost-glow-blue"}
            size="lg"
            className="w-full text-lg mt-4"
            disabled={isLoading}
          >
            {isLoading ? '...' : (
              referralDiscount ? (
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  -10% Discount Registration
                </span>
              ) : t('auth.submit.register')
            )}
          </AuraButton>
        </form>

        <Separator className="my-6 bg-gray-800" />

        <div className="space-y-4">
          <AuraButton
            variant="outline"
            onClick={() => authService.signInWithGoogle()}
            className="w-full border-gray-700 hover:bg-gray-800 flex items-center justify-center gap-2"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </AuraButton>

          <div className="text-center">
            <p className="text-gray-400 mb-4 text-sm">{t('auth.hasAccount')}</p>
            <AuraButton
              variant="ghost-glow-silver"
              onClick={onToggleMode}
              className="w-full"
            >
              {t('auth.submit.login')}
            </AuraButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
