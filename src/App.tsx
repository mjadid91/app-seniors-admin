
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import ConditionsUtilisation from "./pages/ConditionsUtilisation";
import ContactPage from "./pages/ContactPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/connexion" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/conditions-utilisation" element={<ConditionsUtilisation />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Routes with shared navbar layout */}
          <Route element={<SharedLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/prestations" element={<PrestationsPage />} />
            <Route path="/moderation" element={<ModerationPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/rgpd" element={<RGPDPage />} />
            <Route path="/finances" element={<FinancesPage />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
