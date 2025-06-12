
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "../../stores/authStore";
import { AlertCircle, Crown, Shield, Headphones, Eye } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError("Identifiants invalides ou accès non autorisé");
      }
    } catch (err) {
      setError("Une erreur est survenue lors de la connexion");
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    {
      role: "administrateur",
      email: "admin@appseniors.fr",
      name: "Marie Dubois",
      icon: Crown,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Accès complet"
    },
    {
      role: "moderateur", 
      email: "moderateur@appseniors.fr",
      name: "Sophie Durand",
      icon: Shield,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Modération uniquement"
    },
    {
      role: "support",
      email: "support@appseniors.fr", 
      name: "Pierre Martin",
      icon: Headphones,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Support uniquement"
    },
    {
      role: "visualisateur",
      email: "viewer@appseniors.fr",
      name: "Jean Leclerc", 
      icon: Eye,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      description: "Lecture seule"
    }
  ];

  const handleDemoLogin = (email: string) => {
    setEmail(email);
    setPassword("demo123");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]" />
      
      <div className="w-full max-w-4xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulaire de connexion */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">AS</span>
            </div>
            <CardTitle className="text-2xl font-bold text-slate-800">AppSeniors Admin</CardTitle>
            <CardDescription className="text-slate-600">
              Connexion à l'interface d'administration
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">Adresse email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@appseniors.fr"
                  required
                  className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-medium">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm animate-fade-in">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg transition-all duration-200 hover:shadow-xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connexion...
                  </div>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Comptes de démonstration */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800">Comptes de démonstration</CardTitle>
            <CardDescription className="text-slate-600">
              Cliquez sur un compte pour vous connecter instantanément
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-3">
            {demoAccounts.map((account) => {
              const Icon = account.icon;
              return (
                <button
                  key={account.email}
                  onClick={() => handleDemoLogin(account.email)}
                  className={`w-full p-4 rounded-lg border-2 border-transparent ${account.bgColor} hover:border-slate-200 transition-all duration-200 text-left group hover:shadow-md`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${account.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-5 w-5 ${account.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-slate-800">{account.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${account.bgColor} ${account.color} font-medium capitalize`}>
                          {account.role}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">{account.email}</p>
                      <p className="text-xs text-slate-500 mt-1">{account.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 font-medium mb-2">Informations de connexion :</p>
              <div className="text-xs text-blue-700 space-y-1">
                <div><strong>Mot de passe universel :</strong> demo123</div>
                <div><strong>Ou utilisez :</strong> Cliquez directement sur un compte ci-dessus</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
