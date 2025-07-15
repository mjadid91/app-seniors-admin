
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, ArrowLeft, Mail, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Déclencher l'animation après un court délai
    setTimeout(() => setIsAnimated(true), 100);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    if (!email.trim()) {
      setError("Veuillez saisir votre adresse email");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setError("Erreur lors de l'envoi de l'email de réinitialisation");
      } else {
        setIsSuccess(true);
        setMessage("Un email de réinitialisation a été envoyé à votre adresse email");
      }
    } catch (err) {
      setError("Une erreur est survenue lors de l'envoi de l'email");
    } finally {
      setIsLoading(false);
    }
  };

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
              Récupération de compte
            </h1>
            <p className="text-slate-600 text-lg">
              Nous allons vous aider à retrouver l'accès à votre compte
            </p>
          </div>

          {/* Formulaire de récupération */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-semibold text-app-text">
                Mot de passe oublié
              </CardTitle>
              <CardDescription className="text-slate-600">
                Saisissez votre adresse email pour recevoir un lien de réinitialisation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isSuccess ? (
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
                      disabled={isLoading}
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
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Envoi en cours...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Envoyer le lien de réinitialisation
                      </div>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{message}</span>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600">
                      Vérifiez votre boîte email et suivez les instructions pour réinitialiser votre mot de passe.
                    </p>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <strong>Conseil :</strong> Vérifiez également votre dossier spam si vous ne recevez pas l'email dans les prochaines minutes.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="pt-4 text-center">
                <Link
                  to="/connexion"
                  className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour à la connexion
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
            <div className="w-32 h-32 bg-white rounded-3xl shadow-lg flex items-center justify-center mx-auto mb-6">
              <Shield className="h-16 w-16 text-blue-600" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-app-text">
              Sécurité et confidentialité
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Votre sécurité est notre priorité. Nous utilisons des protocoles de chiffrement avancés pour protéger vos données personnelles.
            </p>
            
            <div className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-slate-600">Chiffrement SSL/TLS</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-slate-600">Authentification sécurisée</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-slate-600">Conformité RGPD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
