import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";

const Index = () => {
  const { user, isAuthenticated, loading, isInitialized } = useSupabaseAuth();
  const navigate = useNavigate();
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    if (!isInitialized || loading || hasNavigated) return;

    console.log("Index navigation check:", {
      isAuthenticated,
      hasUser: !!user,
    });

    if (isAuthenticated && user) {
      setHasNavigated(true);
      navigate("/dashboard", { replace: true });
    } else {
      setHasNavigated(true);
      navigate("/connexion", { replace: true });
    }
  }, [isAuthenticated, user, loading, isInitialized, hasNavigated, navigate]);

  if (!isInitialized || loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600" />
        </div>
    );
  }

  return null;
};

export default Index;