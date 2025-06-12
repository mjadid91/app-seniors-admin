
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

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "users":
        return <UserManagement />;
      case "prestations":
        return <PrestationTracking />;
      case "moderation":
        return <Moderation />;
      case "support":
        return <Support />;
      case "documents":
        return <Documents />;
      case "partners":
        return <Partners />;
      case "rgpd":
        return <RGPD />;
      case "finances":
        return <Finances />;
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
