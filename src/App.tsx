
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";
import LoginPage from "./components/auth/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Dashboard from "./components/dashboard/Dashboard";
import UsersPage from "./pages/UsersPage";
import PrestationsPage from "./pages/PrestationsPage";
import FinancesPage from "./pages/FinancesPage";
import SharedLayout from "./components/layout/SharedLayout";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/connexion" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/dashboard" element={<SharedLayout><Dashboard /></SharedLayout>} />
          <Route path="/users" element={<SharedLayout><UsersPage /></SharedLayout>} />
          <Route path="/prestations" element={<SharedLayout><PrestationsPage /></SharedLayout>} />
          <Route path="/finances" element={<SharedLayout><FinancesPage /></SharedLayout>} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
