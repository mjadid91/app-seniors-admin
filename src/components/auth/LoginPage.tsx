
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";
import { AlertCircle, Users, Shield, Heart, BarChart3, Headphones, Wifi } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { AppLogo } from "../layout/AppLogo";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user, isAuthenticated, loading: authLoading, isInitialized } = useSupabaseAuth();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  // S'assurer que l'état de connexion est nettoyé au chargement de la page
  useEffect(() => {
    console.log('LoginPage: Ensuring clean state on load');
    logout();
  }, [logout]);

  // Rediriger vers dashboard si déjà authentifié
  useEffect(() => {
    if (isInitialized && !authLoading && isAuthenticated && user) {
      console.log('LoginPage: User already authenticated, redirecting to dashboard');
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, user, authLoading, isInitialized, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email.trim() || !password) {
      setError("Veuillez saisir votre email et mot de passe");
      setIsLoading(false);
      return;
    }

    try {
      console.log('LoginPage: Attempting login for:', email);
      const result = await signIn(email.trim(), password);

      if (!result.success) {
        setError(result.error || "Erreur de connexion");
      } else {
        console.log('LoginPage: Login successful');
        // La redirection sera gérée par useEffect quand l'état d'auth changera
      }
    } catch (err) {
      console.error('LoginPage: Login error:', err);
      setError("Une erreur est survenue lors de la connexion");
    } finally {
      setIsLoading(false);
    }
  };

  // Afficher le chargement si l'auth n'est pas encore initialisée
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Initialisation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Partie gauche - Formulaire */}
      <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-fade-in">
          {/* Logo et titre */}
          <div className="text-center mb-8">
            <AppLogo />
            <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-2">
              Connexion à l'interface
            </h1>
            <p className="text-gray-600">
              Gérez les utilisateurs, les prestations et plus encore.
            </p>
          </div>

          {/* Formulaire */}
          <Card className="shadow-md border-0 bg-white">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Adresse email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@appseniors.fr"
                    required
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                    disabled={isLoading || authLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Mot de passe
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                    disabled={isLoading || authLoading}
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-primary text-white hover:bg-primary/90 shadow-lg transition-all duration-200 hover:shadow-xl"
                  disabled={isLoading || authLoading}
                >
                  {isLoading || authLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Connexion...
                    </div>
                  ) : (
                    "Se connecter"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Mot de passe oublié ?
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Partie droite - Message visuel */}
      <div className="hidden lg:flex w-1/2 bg-blue-50 items-center justify-center p-8">
        <div className="max-w-md text-center">
          {/* Icônes et fonctionnalités */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Gestion des utilisateurs</h3>
                <p className="text-sm text-gray-600">Administration complète</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Sécurité avancée</h3>
                <p className="text-sm text-gray-600">Protection des données</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Au service des seniors</h3>
                <p className="text-sm text-gray-600">Accompagnement personnalisé</p>
              </div>
            </div>
          </div>

          {/* Message principal */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Gérez votre plateforme en toute simplicité
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Interface d'administration intuitive pour superviser et optimiser 
              votre écosystème AppSeniors. Contrôlez les utilisateurs, les prestations 
              et assurez un service de qualité.
            </p>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white/70 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="font-bold text-gray-900">1000+</span>
              </div>
              <p className="text-sm text-gray-600">Utilisateurs</p>
            </div>

            <div className="bg-white/70 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-green-600" />
                <span className="font-bold text-gray-900">500+</span>
              </div>
              <p className="text-sm text-gray-600">Aidants</p>
            </div>

            <div className="bg-white/70 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Headphones className="h-4 w-4 text-purple-600" />
                <span className="font-bold text-gray-900">24/7</span>
              </div>
              <p className="text-sm text-gray-600">Support</p>
            </div>

            <div className="bg-white/70 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Wifi className="h-4 w-4 text-emerald-600" />
                <span className="font-bold text-gray-900">99.9%</span>
              </div>
              <p className="text-sm text-gray-600">Disponibilité</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
