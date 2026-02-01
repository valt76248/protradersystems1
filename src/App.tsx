import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import { LazyMotion, domMax, AnimatePresence, m } from "framer-motion";
import ScrollProgressBar from "./components/ui/ScrollProgressBar";
import CustomCursor from "./components/shared/CustomCursor";

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
const LegalPage = lazy(() => import("./pages/LegalPage"));
const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/Admin"));
const SessionPage = lazy(() => import("./pages/SessionPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const PreRegistration = lazy(() => import("./pages/PreRegistration"));
const N8NLab = lazy(() => import("./pages/N8NLab"));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <m.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Routes location={location}>
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
          <Route path="/session/:sessionId" element={<SessionPage />} />
          <Route path="/gallery/:sessionId" element={<GalleryPage />} />
          <Route path="/pre-registration" element={<PreRegistration />} />
          <Route path="/n8n-lab" element={<N8NLab />} />
          <Route path="/legal/:slug" element={<LegalPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </m.div>
    </AnimatePresence>
  );
};

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
                      <CustomCursor />
                      <ScrollProgressBar />
                      <ReferralTracker />
                      <BackToTopButton />
                      <AnimatedRoutes />
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