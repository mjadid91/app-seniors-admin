
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import ProtectedRouteWrapper from "./components/auth/ProtectedRouteWrapper";

// Pages d'authentification
import SignUp from "./components/auth/SignUp";
import NewLoginPage from "./components/auth/NewLoginPage";

// Pages protégées - lazy loading
const Index = lazy(() => import("./pages/Index"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const UsersPage = lazy(() => import("./pages/UsersPage"));
const FinancesPage = lazy(() => import("./pages/FinancesPage"));
const ModerationPage = lazy(() => import("./pages/ModerationPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
const DocumentsPage = lazy(() => import("./pages/DocumentsPage"));
const PartnersPage = lazy(() => import("./pages/PartnersPage"));
const RGPDPage = lazy(() => import("./pages/RGPDPage"));
const PrestationsPage = lazy(() => import("./pages/PrestationsPage"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
              </div>
            }
          >
            <Routes>
              {/* Routes publiques d'authentification */}
              <Route path="/connexion" element={<NewLoginPage />} />
              <Route path="/inscription" element={<SignUp />} />
              
              {/* Redirection de la racine vers dashboard si connecté, sinon vers connexion */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* Routes protégées */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRouteWrapper>
                    <DashboardPage />
                  </ProtectedRouteWrapper>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRouteWrapper>
                    <UsersPage />
                  </ProtectedRouteWrapper>
                }
              />
              <Route
                path="/finances"
                element={
                  <ProtectedRouteWrapper>
                    <FinancesPage />
                  </ProtectedRouteWrapper>
                }
              />
              <Route
                path="/moderation"
                element={
                  <ProtectedRouteWrapper>
                    <ModerationPage />
                  </ProtectedRouteWrapper>
                }
              />
              <Route
                path="/support"
                element={
                  <ProtectedRouteWrapper>
                    <SupportPage />
                  </ProtectedRouteWrapper>
                }
              />
              <Route
                path="/documents"
                element={
                  <ProtectedRouteWrapper>
                    <DocumentsPage />
                  </ProtectedRouteWrapper>
                }
              />
              <Route
                path="/partners"
                element={
                  <ProtectedRouteWrapper>
                    <PartnersPage />
                  </ProtectedRouteWrapper>
                }
              />
              <Route
                path="/rgpd"
                element={
                  <ProtectedRouteWrapper>
                    <RGPDPage />
                  </ProtectedRouteWrapper>
                }
              />
              <Route
                path="/prestations"
                element={
                  <ProtectedRouteWrapper>
                    <PrestationsPage />
                  </ProtectedRouteWrapper>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRouteWrapper>
                    <Settings />
                  </ProtectedRouteWrapper>
                }
              />
              
              {/* Page 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
