import AuthFlow from '@/components/auth/AuthFlow';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Login() {
    return (
        <div className="min-h-screen flex flex-col bg-trading-dark text-white">
            <Header />

            <main className="flex-grow flex items-center justify-center p-4 py-12">
                <AuthFlow />
            </main>

            <Footer />
        </div>
    );
}
