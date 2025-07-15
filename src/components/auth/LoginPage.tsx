
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";
import { AlertCircle, ArrowRight, Shield, Users, Heart } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { AppLogo } from "../layout/AppLogo";

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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Initialisation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Colonne gauche - Formulaire de connexion */}
      <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className={`mx-auto w-full max-w-md transform transition-all duration-700 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {/* Logo */}
          <div className="mb-8">
            <AppLogo />
          </div>

          {/* En-tête */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Connexion
            </h1>
            <p className="mt-2 text-muted-foreground">
              Accédez à votre interface d'administration
            </p>
          </div>

          {/* Formulaire */}
          <Card className="shadow-none border-0">
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    Adresse email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@appseniors.fr"
                    required
                    className="h-11"
                    disabled={isLoading || authLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Mot de passe
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="h-11"
                    disabled={isLoading || authLoading}
                  />
                </div>
                
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    {error}
                  </div>
                )}
                
                <Button
                  type="submit"
                  className="w-full h-11 font-medium"
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
              
              <div className="mt-6 text-center">
                <Link
                  to="/mot-de-passe-oublie"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Colonne droite - Hero Section */}
      <div className="hidden lg:flex lg:flex-col lg:justify-center bg-muted/30 p-12">
        <div className={`max-w-lg mx-auto text-center transform transition-all duration-1000 delay-300 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {/* Illustration Hero */}
          <div className="mb-12">
            <div className="relative">
              {/* Cercles décoratifs */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 bg-primary/10 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute inset-4 flex items-center justify-center">
                <div className="w-32 h-32 bg-primary/20 rounded-full animate-pulse delay-300"></div>
              </div>
              
              {/* Icône centrale */}
              <div className="relative z-10 flex items-center justify-center h-48">
                <div className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <Shield className="h-12 w-12 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>

          {/* Contenu Hero */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground leading-tight">
              Plateforme d'administration sécurisée
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Gérez votre communauté de seniors et d'aidants avec des outils modernes et intuitifs
            </p>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 gap-6">
            <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg backdrop-blur-sm">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-sm text-foreground">Gestion des utilisateurs</h3>
                <p className="text-xs text-muted-foreground">Interface intuitive et complète</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg backdrop-blur-sm">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-sm text-foreground">Sécurité avancée</h3>
                <p className="text-xs text-muted-foreground">Protection des données garantie</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg backdrop-blur-sm">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-sm text-foreground">Accompagnement</h3>
                <p className="text-xs text-muted-foreground">Au service des seniors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
