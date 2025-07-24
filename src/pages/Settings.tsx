
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Settings as SettingsIcon, User, Shield, Sliders, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfileSection from "../components/settings/ProfileSection";
import SecuritySection from "../components/settings/SecuritySection";
import PreferencesSection from "../components/settings/PreferencesSection";
import NotificationsSection from "../components/settings/NotificationsSection";

const Settings = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("profile");

  const sections = [
    { id: "profile", label: "Profil administrateur", icon: User },
    { id: "security", label: "Sécurité du compte", icon: Shield },
    { id: "preferences", label: "Préférences", icon: Sliders },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection />;
      case "security":
        return <SecuritySection />;
      case "preferences":
        return <PreferencesSection />;
      case "notifications":
        return <NotificationsSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="bg-gradient-subtle border-b border-elegant px-6 lg:px-8 py-6 animate-fade-in-down">
        <div className="max-w-full mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-app-text-light hover:text-app-text"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au tableau de bord
          </Button>
          <div className="h-6 w-px bg-app-text-light/30" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-app-primary/20 to-app-secondary/20 rounded-lg flex items-center justify-center">
              <SettingsIcon className="h-5 w-5 text-app-primary" />
            </div>
            <h1 className="text-2xl font-semibold text-app-text">Paramètres</h1>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6 shadow-elegant border-elegant hover-lift">
              <CardHeader className="bg-gradient-subtle">
                <CardTitle className="text-lg text-app-text flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-app-primary/20 to-app-secondary/20 rounded-lg flex items-center justify-center">
                    <SettingsIcon className="h-3 w-3 text-app-primary" />
                  </div>
                  Navigation
                </CardTitle>
                <CardDescription className="text-app-text-light">Gérez vos paramètres</CardDescription>
              </CardHeader>
              <CardContent className="p-0 pb-6">
                <nav className="space-y-2 p-4">
                  {sections.map((section, index) => {
                    const IconComponent = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200 group animate-slide-in-left ${
                          activeSection === section.id
                            ? "bg-app-primary/10 text-app-primary border border-app-primary/20 shadow-elegant-md transform scale-105"
                            : "text-app-text-light hover:bg-app-primary/5 hover:text-app-text"
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                          activeSection === section.id
                            ? "bg-app-primary/20"
                            : "bg-app-surface group-hover:bg-app-primary/10"
                        }`}>
                          <IconComponent className={`h-4 w-4 ${
                            activeSection === section.id ? "text-app-primary" : "text-app-text-light"
                          }`} />
                        </div>
                        <span className="font-medium">{section.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="animate-fade-in">
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
