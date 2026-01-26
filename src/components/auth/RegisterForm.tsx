
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Mail, Lock, User, Phone, Gift, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { useLanguage } from '@/contexts/LanguageContext';
import AuraButton from '@/components/ui/AuraButton';

interface RegisterFormProps {
  onToggleMode: () => void;
  onClose: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleMode, onClose }) => {
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
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: `${formData.firstName} ${formData.lastName}`.trim(),
            phone: formData.phone,
            referral_code: referralCode
          }
        }
      });

      if (authError) throw authError;

      if (referralCode && authData.user) {
        try {
          await fetch('https://n8n.protradersystems.com/webhook/new-referral-signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              referral_code: referralCode,
              referred_email: formData.email,
              referred_user_id: authData.user.id,
              referred_name: `${formData.firstName} ${formData.lastName}`.trim(),
              timestamp: new Date().toISOString()
            })
          });
        } catch (webhookError) {
          console.log('Referral webhook skipped');
        }

        await supabase.from('referrals').insert({
          referral_code: referralCode,
          referred_email: formData.email,
          referred_user_id: authData.user.id,
          status: 'registered'
        });
      }

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
        <CardTitle className="text-2xl">{t('auth.register.title')}</CardTitle>
        <p className="text-gray-400 text-sm">{t('auth.register.subtitle')}</p>

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
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
