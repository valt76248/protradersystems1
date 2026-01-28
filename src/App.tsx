import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { HelmetProvider } from 'react-helmet-async';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ScrollToTop from "./components/utils/ScrollToTop";
import BackToTopButton from "./components/layout/BackToTopButton";
import MaintenanceGuard from "./components/shared/MaintenanceGuard";
import { Loader } from "./components/ui/loader";
import ReferralTracker from "./components/utils/ReferralTracker";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import { LazyMotion, domMax } from "framer-motion";
import ScrollProgressBar from "./components/ui/ScrollProgressBar";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const BeginnerTraining = lazy(() => import("./pages/BeginnerTraining"));
const Psychology = lazy(() => import("./pages/Psychology"));
const RiskManagement = lazy(() => import("./pages/RiskManagement"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MaterialsManager = lazy(() => import("./pages/MaterialsManager"));
const CourseStructure = lazy(() => import("./pages/CourseStructure"));
const Courses = lazy(() => import("./pages/Courses"));

const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const Account = lazy(() => import("./pages/Account"));
const Calculators = lazy(() => import("./pages/Calculators"));
const CoursePage = lazy(() => import("./pages/CoursePage"));
const PublicOffer = lazy(() => import("./pages/PublicOffer"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const EligibleClients = lazy(() => import("./pages/EligibleClients"));
const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/Admin"));
const SessionOne = lazy(() => import("./pages/SessionOne"));
const SessionTwo = lazy(() => import("./pages/SessionTwo"));
const Session1Gallery = lazy(() => import("./pages/Session1Gallery"));
const Session2Gallery = lazy(() => import("./pages/Session2Gallery"));
const PreRegistration = lazy(() => import("./pages/PreRegistration"));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <HelmetProvider>
          <LanguageProvider>
            <TooltipProvider>
              <LazyMotion features={domMax}>
                <Toaster />
                <Sonner />
                <MaintenanceGuard>
                  <BrowserRouter>
                    <ScrollToTop />
                    <Suspense fallback={<Loader />}>
                      <ScrollProgressBar />
                      <ReferralTracker />
                      <BackToTopButton />
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/beginner-training" element={<BeginnerTraining />} />

                        <Route path="/psychology" element={<Psychology />} />
                        <Route path="/risk-management" element={<RiskManagement />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/materials-manager" element={<ProtectedRoute><MaterialsManager /></ProtectedRoute>} />
                        <Route path="/course-structure" element={<ProtectedRoute><CourseStructure /></ProtectedRoute>} />
                        <Route path="/courses" element={<Courses />} />

                        <Route path="/payment-success" element={<PaymentSuccess />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/calculators" element={<Calculators />} />
                        <Route path="/course/:id" element={<ProtectedRoute><CoursePage /></ProtectedRoute>} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
                        <Route path="/session-1" element={<SessionOne />} />
                        <Route path="/session-2" element={<SessionTwo />} />
                        <Route path="/session-1-gallery" element={<Session1Gallery />} />
                        <Route path="/session-2-gallery" element={<Session2Gallery />} />
                        <Route path="/pre-registration" element={<PreRegistration />} />

                        {/* Legal Pages */}
                        <Route path="/public-offer" element={<PublicOffer />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/eligible-clients" element={<EligibleClients />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </BrowserRouter>
                </MaintenanceGuard>
              </LazyMotion>
            </TooltipProvider>
          </LanguageProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;