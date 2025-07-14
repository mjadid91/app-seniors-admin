
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import SharedLayout from "./components/layout/SharedLayout";
import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import PrestationsPage from "./pages/PrestationsPage";
import ModerationPage from "./pages/ModerationPage";
import SupportPage from "./pages/SupportPage";
import DocumentsPage from "./pages/DocumentsPage";
import PartnersPage from "./pages/PartnersPage";
import RGPDPage from "./pages/RGPDPage";
import FinancesPage from "./pages/FinancesPage";
import LoginPage from "./components/auth/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

// Configuration optimisée de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error: any) => {
        // Ne pas retry pour les erreurs d'authentification
        if (error?.status === 401 || error?.status === 403) {
          return false;
        }
        // Retry jusqu'à 3 fois pour les autres erreurs
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: false, // Pas de retry automatique pour les mutations
    },
  },
});

// Gestionnaire d'erreur global pour React Query
queryClient.setMutationDefaults(['user-creation'], {
  onError: (error) => {
    console.error('User creation error:', error);
  },
});

const App = () => {
  const handleGlobalError = (error: Error, errorInfo: any) => {
    // Log l'erreur pour monitoring (peut être envoyé à un service comme Sentry)
    console.error('Global error caught by ErrorBoundary:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });

    // En production, on pourrait envoyer l'erreur à un service de monitoring
    if (process.env.NODE_ENV === 'production') {
      // Exemple: Sentry.captureException(error, { extra: errorInfo });
    }
  };

  return (
    <ErrorBoundary onError={handleGlobalError}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/connexion" element={
                <ErrorBoundary>
                  <LoginPage />
                </ErrorBoundary>
              } />
              <Route path="/forgot-password" element={
                <ErrorBoundary>
                  <ForgotPasswordPage />
                </ErrorBoundary>
              } />
              <Route path="/reset-password" element={
                <ErrorBoundary>
                  <ResetPasswordPage />
                </ErrorBoundary>
              } />
              <Route path="/settings" element={
                <ErrorBoundary>
                  <Settings />
                </ErrorBoundary>
              } />
              
              {/* Routes avec layout partagé */}
              <Route element={<SharedLayout />}>
                <Route path="/dashboard" element={
                  <ErrorBoundary>
                    <DashboardPage />
                  </ErrorBoundary>
                } />
                <Route path="/users" element={
                  <ErrorBoundary>
                    <UsersPage />
                  </ErrorBoundary>
                } />
                <Route path="/prestations" element={
                  <ErrorBoundary>
                    <PrestationsPage />
                  </ErrorBoundary>
                } />
                <Route path="/moderation" element={
                  <ErrorBoundary>
                    <ModerationPage />
                  </ErrorBoundary>
                } />
                <Route path="/support" element={
                  <ErrorBoundary>
                    <SupportPage />
                  </ErrorBoundary>
                } />
                <Route path="/documents" element={
                  <ErrorBoundary>
                    <DocumentsPage />
                  </ErrorBoundary>
                } />
                <Route path="/partners" element={
                  <ErrorBoundary>
                    <PartnersPage />
                  </ErrorBoundary>
                } />
                <Route path="/rgpd" element={
                  <ErrorBoundary>
                    <RGPDPage />
                  </ErrorBoundary>
                } />
                <Route path="/finances" element={
                  <ErrorBoundary>
                    <FinancesPage />
                  </ErrorBoundary>
                } />
              </Route>
              
              {/* Route 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
