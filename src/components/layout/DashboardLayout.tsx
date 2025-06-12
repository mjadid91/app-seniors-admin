
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard from "../dashboard/Dashboard";
import UserManagement from "../users/UserManagement";
import PrestationTracking from "../prestations/PrestationTracking";
import Moderation from "../moderation/Moderation";
import Support from "../support/Support";
import Documents from "../documents/Documents";
import Partners from "../partners/Partners";
import RGPD from "../rgpd/RGPD";
import Finances from "../finances/Finances";
import ProtectedRoute from "../auth/ProtectedRoute";
import { usePermissions } from "../../hooks/usePermissions";

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { canAccessPage } = usePermissions();

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "users":
        return (
          <ProtectedRoute requiredPage="users">
            <UserManagement />
          </ProtectedRoute>
        );
      case "prestations":
        return (
          <ProtectedRoute requiredPage="prestations">
            <PrestationTracking />
          </ProtectedRoute>
        );
      case "moderation":
        return (
          <ProtectedRoute requiredPage="moderation">
            <Moderation />
          </ProtectedRoute>
        );
      case "support":
        return (
          <ProtectedRoute requiredPage="support">
            <Support />
          </ProtectedRoute>
        );
      case "documents":
        return (
          <ProtectedRoute requiredPage="documents">
            <Documents />
          </ProtectedRoute>
        );
      case "partners":
        return (
          <ProtectedRoute requiredPage="partners">
            <Partners />
          </ProtectedRoute>
        );
      case "rgpd":
        return (
          <ProtectedRoute requiredPage="rgpd">
            <RGPD />
          </ProtectedRoute>
        );
      case "finances":
        return (
          <ProtectedRoute requiredPage="finances">
            <Finances />
          </ProtectedRoute>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
