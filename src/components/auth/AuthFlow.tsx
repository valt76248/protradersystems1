
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthFlowProps {
    initialMode?: 'login' | 'register';
    onClose?: () => void;
}

const AuthFlow: React.FC<AuthFlowProps> = ({
    initialMode = 'login',
    onClose = () => { }
}) => {
    const [mode, setMode] = useState<'login' | 'register'>(initialMode);

    const toggleMode = () => {
        setMode(mode === 'login' ? 'register' : 'login');
    };

    return (
        <div className="w-full flex justify-center items-center">
            {mode === 'login' ? (
                <LoginForm onToggleMode={toggleMode} onClose={onClose} />
            ) : (
                <RegisterForm onToggleMode={toggleMode} onClose={onClose} />
            )}
        </div>
    );
};

export default AuthFlow;
