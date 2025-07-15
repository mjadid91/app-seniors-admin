
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";
import { AlertCircle, Users, Shield, Heart, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const { signIn, user, isAuthenticated, loading: authLoading, isInitialized } = useSupabaseAuth();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  // S'assurer que l'état de connexion est nettoyé au chargement de la page
  useEffect(() => {
    console.log('LoginPage: Ensuring clean state on load');
    logout();
    // Déclencher l'animation après un court délai
    setTimeout(() => setIsAnimated(true), 100);
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
      <div className="min-h-screen flex items-center justify-center bg-app-background p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Initialisation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-background flex">
      {/* Section gauche - Formulaire */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-md lg:max-w-lg mx-auto lg:mx-0">
        <div className={`transform transition-all duration-700 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {/* En-tête avec titre et sous-titre */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">AS</span>
            </div>
            <h1 className="text-3xl font-bold text-app-text mb-2">
              Bienvenue sur AppSeniors Admin
            </h1>
            <p className="text-slate-600 text-lg">
              La gestion simplifiée pour les aidants et les partenaires
            </p>
          </div>

          {/* Formulaire de connexion */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-semibold text-app-text">
                Connexion
              </CardTitle>
              <CardDescription className="text-slate-600">
                Accédez à votre interface d'administration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-app-text font-medium">
                    Adresse email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@appseniors.fr"
                    required
                    className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 h-12"
                    disabled={isLoading || authLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-app-text font-medium">
                    Mot de passe
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 h-12"
                    disabled={isLoading || authLoading}
                  />
                </div>
                
                {error && (
                  <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm animate-fade-in">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    {error}
                  </div>
                )}
                
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg transition-all duration-200 hover:shadow-xl h-12 text-base font-medium"
                  disabled={isLoading || authLoading}
                >
                  {isLoading || authLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Connexion...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Se connecter
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </form>
              
              <div className="text-center pt-4">
                <Link
                  to="/mot-de-passe-oublie"
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Section droite - Zone visuelle */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-50 to-blue-100 items-center justify-center p-8">
        <div className={`text-center max-w-lg transform transition-all duration-1000 delay-300 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {/* Illustration avec icônes */}
          <div className="relative mb-8">
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="font-semibold text-app-text">Gestion des utilisateurs</h3>
              </div>
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="font-semibold text-app-text">Sécurité avancée</h3>
              </div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="font-semibold text-app-text">Au service des seniors</h3>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-app-text">
              Gérez votre plateforme en toute simplicité
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Accédez à tous les outils nécessaires pour accompagner les seniors et coordonner les aidants dans un environnement sécurisé et intuitif.
            </p>
            
            <div className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-blue-600">1000+</div>
                  <div className="text-sm text-slate-600">Utilisateurs</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-slate-600">Aidants</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-blue-600">24/7</div>
                  <div className="text-sm text-slate-600">Support</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-blue-600">99.9%</div>
                  <div className="text-sm text-slate-600">Disponibilité</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
