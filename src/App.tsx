
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Index from "./pages/Index";
import UsersPage from "./pages/UsersPage";
import FinancesPage from "./pages/FinancesPage";
import PartnersPage from "./pages/PartnersPage";
import RGPDPage from "./pages/RGPDPage";
import ModerationPage from "./pages/ModerationPage";
import SupportPage from "./pages/SupportPage";
import DocumentsPage from "./pages/DocumentsPage";
import PrestationsPage from "./pages/PrestationsPage";
import DashboardPage from "./pages/DashboardPage";
import Settings from "./pages/Settings";
import LoginPage from "./components/auth/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SharedLayout from "./components/layout/SharedLayout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="appseniors-admin-theme">
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route element={<ProtectedRoute><SharedLayout /></ProtectedRoute>}>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/finances" element={<FinancesPage />} />
                <Route path="/partners" element={<PartnersPage />} />
                <Route path="/prestations" element={<PrestationsPage />} />
                <Route path="/rgpd" element={<RGPDPage />} />
                <Route path="/moderation" element={<ModerationPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/documents" element={<DocumentsPage />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
