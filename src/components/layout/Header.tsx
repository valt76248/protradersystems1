import React, { useState, useEffect } from 'react';
import { Lock, LogIn, LogOut, User, Menu, X } from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import ChartLine from '@/components/icons/ChartLine';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import StartTrainingButton from '@/components/shared/StartTrainingButton';
import PreRegistrationModal from './PreRegistrationModal';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import AuraButton from '@/components/ui/AuraButton';
import { cn } from '@/lib/utils';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [firstName, setFirstName] = useState<string | null>(null);

  const fetchUserProfile = async (userId: string) => {
    console.log('Fetching profile for:', userId);
    const { data, error } = await supabase
      .from('profiles')
      .select('first_name')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
    }

    if (data?.first_name) {
      setFirstName(data.first_name);
    }
  };



  // Check auth state on mount and listen for changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        if (session.user.user_metadata?.first_name) {
          setFirstName(session.user.user_metadata.first_name);
        } else {
          fetchUserProfile(session.user.id);
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        if (session.user.user_metadata?.first_name) {
          setFirstName(session.user.user_metadata.first_name);
        } else {
          fetchUserProfile(session.user.id);
        }
      } else {
        setFirstName(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: t('nav.logout-success'), description: t('nav.goodbye') });
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', labelKey: 'nav.overview' },
    { path: '/courses', labelKey: 'nav.courses' },
    { path: '/beginner-training', labelKey: 'nav.beginner-training' },
    { path: '/calculators', labelKey: 'nav.calculators' },
    { path: '/psychology', labelKey: 'nav.psychology' }
  ];

  return (
    <>
      <header className="w-full bg-transparent py-6 px-4 no-select sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <ChartLine className="h-7 w-7 text-primary transition-transform group-hover:scale-110 group-hover:rotate-3" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
              ProTrader Systems
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative text-base font-bold tracking-widest transition-all duration-300 py-1 group ghost-glow-white hover:scale-110",
                  isActive(item.path) ? "text-white opacity-100 scale-110" : "text-white opacity-60 hover:opacity-100"
                )}
              >
                {t(item.labelKey)}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-[2px] bg-current shadow-[0_0_10px_currentColor] transition-all duration-300",
                  isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Desktop Auth Buttons */}
            {user ? (
              <>
                <Link to="/account">
                  <AuraButton
                    variant="ghost-glow-white"
                    size="default"
                    className="hidden lg:flex"
                  >
                    <User className="mr-2 h-4 w-4" />
                    {firstName ? firstName : t('nav.account')}
                  </AuraButton>
                </Link>
                <AuraButton
                  onClick={handleLogout}
                  variant="ghost-glow-cyan"
                  className="hidden lg:flex"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('nav.logout')}
                </AuraButton>
              </>
            ) : (
              <>
                <StartTrainingButton size="sm" className="hidden lg:flex" />

                <Link to="/login">
                  <AuraButton
                    variant="ghost-glow-blue"
                    className="hidden lg:flex"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    {t('nav.login')}
                  </AuraButton>
                </Link>
              </>
            )}

            <LanguageSwitcher />

            <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <div className="relative">
                <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse-glow text-cyan-400" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{t('nav.protected-view')}</span>
              <Lock size={12} className="text-gray-500" />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute left-0 right-0 top-full bg-trading-card border-b border-gray-800 transition-all duration-300 ease-in-out shadow-xl ${isMobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
        >
          <nav className="flex flex-col p-4 space-y-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-4 py-4 rounded-lg text-base font-bold transition-all duration-300 flex items-center ghost-glow-white text-3d-static-subtle",
                  isActive(item.path)
                    ? "text-white border-l-4 border-white bg-white/5"
                    : "text-white opacity-70"
                )}
              >
                {t(item.labelKey)}
              </Link>
            ))}

            <div className="border-t border-gray-800 my-2 pt-2">
              {user ? (
                <>
                  <Link
                    to="/account"
                    className="flex items-center px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800"
                  >
                    <User className="mr-3 h-4 w-4" />
                    {firstName ? `Здравствуйте, ${firstName}` : t('nav.account')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-900/20"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <>
                  <StartTrainingButton className="w-full mb-2" size="sm" />
                  <Link
                    to="/login"
                    className="flex items-center px-4 py-3 rounded-lg text-sm font-medium text-blue-400 hover:bg-blue-900/20"
                  >
                    <LogIn className="mr-3 h-4 w-4" />
                    {t('nav.login')}
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      <PreRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Header;
