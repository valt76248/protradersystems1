
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import { RegisterVariant } from './RegisterForm';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  variant?: RegisterVariant;
}

const AuthDialog: React.FC<AuthDialogProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  variant = 'default'
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/80" />
      <DialogContent className="p-0 border-0 bg-transparent max-w-md">
        {mode === 'login' ? (
          <LoginForm onToggleMode={toggleMode} onClose={onClose} />
        ) : (
          <RegisterForm onToggleMode={toggleMode} onClose={onClose} variant={variant} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
