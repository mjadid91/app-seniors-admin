
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";
import { AlertCircle, ArrowRight, Shield, Users, Heart, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useAdminEmail } from "../../hooks/useAdminEmail";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const { signIn, user, isAuthenticated, loading: authLoading, isInitialized } = useSupabaseAuth();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const { adminEmail } = useAdminEmail();

  // S'assurer que l'état de connexion est nettoyé au chargement de la page
  useEffect(() => {
    logout();
    // Déclencher l'animation après un court délai
    setTimeout(() => setIsAnimated(true), 100);
  }, [logout]);

  // Rediriger vers dashboard si déjà authentifié
  useEffect(() => {
    if (isInitialized && !authLoading && isAuthenticated && user) {
      navigate("/", { replace: true });
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
      <div className="min-h-screen flex items-center justify-center bg-app-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-app-primary mx-auto mb-4"></div>
          <p className="text-app-text-light">Initialisation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-app-background via-app-surface to-app-background">
      <div className="min-h-screen grid lg:grid-cols-2">
        {/* Colonne gauche - Formulaire de connexion */}
        <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-app-background/80 backdrop-blur-sm">
          <div className={`mx-auto w-full max-w-md transform transition-all duration-700 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            
            {/* En-tête principal */}
            <div className="text-center mb-8">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-app-primary to-app-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-elegant">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-app-text mb-2">
                AppSeniors Admin
              </h1>
              <p className="text-app-text-light">
                Accédez à votre espace d'administration
              </p>
            </div>

            {/* Formulaire */}
            <Card className="shadow-elegant border-app-border bg-app-surface/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-app-text">
                      Adresse email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@appseniors.fr"
                      required
                      className="h-12 text-base"
                      disabled={isLoading || authLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-app-text">
                      Mot de passe
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="h-12 text-base pr-12"
                        disabled={isLoading || authLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-app-text-light hover:text-app-text transition-colors duration-200"
                        disabled={isLoading || authLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {error && (
                    <div className="flex items-center gap-3 p-4 bg-app-error/10 border border-app-error/20 rounded-lg text-app-error text-sm animate-fade-in">
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium"
                    disabled={isLoading || authLoading}
                  >
                    {isLoading || authLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Connexion en cours...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Se connecter
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    )}
                  </Button>
                </form>
                
                {adminEmail && (
                  <div className="mt-6 text-center">
                    <p className="text-sm text-app-text-light">
                      Mot de passe oublié ? Contactez un administrateur à l'adresse :{" "}
                      <a 
                        href={`mailto:${adminEmail}`}
                        className="text-app-primary hover:text-app-primary/80 transition-colors duration-200 font-medium"
                      >
                        {adminEmail}
                      </a>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Colonne droite - Hero Section */}
        <div className="hidden lg:flex lg:flex-col lg:justify-center bg-gradient-to-br from-app-primary/5 via-app-accent/5 to-app-primary/10 p-12 relative overflow-hidden">
          {/* Motifs décoratifs de fond */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 bg-app-primary rounded-full blur-3xl"></div>
            <div className="absolute bottom-32 right-20 w-40 h-40 bg-app-accent rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-app-primary rounded-full blur-2xl"></div>
          </div>
          
          <div className={`max-w-lg mx-auto text-center relative z-10 transform transition-all duration-1000 delay-300 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {/* Illustration Hero */}
            <div className="mb-12">
              <div className="relative">
                {/* Cercles décoratifs */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-app-primary/20 to-app-accent/20 rounded-full blur-sm animate-pulse"></div>
                </div>
                <div className="absolute inset-4 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-app-primary/30 to-app-accent/30 rounded-full blur-sm animate-pulse delay-300"></div>
                </div>
                
                {/* Icône centrale */}
                <div className="relative z-10 flex items-center justify-center h-48">
                  <div className="w-24 h-24 bg-gradient-to-br from-app-primary to-app-accent rounded-2xl flex items-center justify-center shadow-elegant">
                    <Shield className="h-12 w-12 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Contenu Hero */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-app-text leading-tight">
                Plateforme d'administration sécurisée
              </h2>
              <p className="text-lg text-app-text-light leading-relaxed">
                Gérez votre communauté de seniors et d'aidants avec des outils modernes et intuitifs
              </p>
            </div>

            {/* Features */}
            <div className="mt-12 space-y-4">
              <div className="flex items-center gap-4 p-4 bg-app-surface/30 backdrop-blur-sm border border-app-border/50 rounded-xl hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-app-primary/20 to-app-accent/20 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-app-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-app-text">Gestion des utilisateurs</h3>
                  <p className="text-sm text-app-text-light">Interface intuitive et complète</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-app-surface/30 backdrop-blur-sm border border-app-border/50 rounded-xl hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-app-primary/20 to-app-accent/20 rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-app-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-app-text">Sécurité avancée</h3>
                  <p className="text-sm text-app-text-light">Protection des données garantie</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-app-surface/30 backdrop-blur-sm border border-app-border/50 rounded-xl hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-app-primary/20 to-app-accent/20 rounded-xl flex items-center justify-center">
                  <Heart className="h-6 w-6 text-app-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-app-text">Accompagnement</h3>
                  <p className="text-sm text-app-text-light">Au service des seniors</p>
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
