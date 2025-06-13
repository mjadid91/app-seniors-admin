
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "../../stores/authStore";

const ProfileSection = () => {
  const { user } = useAuthStore();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    prenom: user?.prenom || "",
    nom: user?.nom || "",
    email: user?.email || "",
    telephone: "",
    langue: "fr",
    devise: "EUR"
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
    
    setIsLoading(false);
  };

  return (
    <Card className="animate-scale-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-xl">👤</span>
          Profil administrateur
        </CardTitle>
        <CardDescription>
          Gérez vos informations personnelles et préférences de compte
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="prenom">Prénom</Label>
            <Input
              id="prenom"
              value={formData.prenom}
              onChange={(e) => handleInputChange("prenom", e.target.value)}
              className="transition-all duration-200 focus:scale-[1.02]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="nom">Nom</Label>
            <Input
              id="nom"
              value={formData.nom}
              onChange={(e) => handleInputChange("nom", e.target.value)}
              className="transition-all duration-200 focus:scale-[1.02]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="transition-all duration-200 focus:scale-[1.02]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="telephone">Téléphone</Label>
          <Input
            id="telephone"
            type="tel"
            value={formData.telephone}
            onChange={(e) => handleInputChange("telephone", e.target.value)}
            placeholder="+33 1 23 45 67 89"
            className="transition-all duration-200 focus:scale-[1.02]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Langue</Label>
            <Select value={formData.langue} onValueChange={(value) => handleInputChange("langue", value)}>
              <SelectTrigger className="transition-all duration-200 hover:border-blue-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Devise</Label>
            <Select value={formData.devise} onValueChange={(value) => handleInputChange("devise", value)}>
              <SelectTrigger className="transition-all duration-200 hover:border-blue-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EUR">Euro (€)</SelectItem>
                <SelectItem value="USD">Dollar ($)</SelectItem>
                <SelectItem value="GBP">Livre (£)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <Button 
            onClick={handleSave} 
            disabled={isLoading}
            className="w-full md:w-auto transition-all duration-200 hover:scale-105"
          >
            {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
