
import Support from "../components/support/Support";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const SupportPage = () => {
  return (
    <ProtectedRoute requiredPage="support">
      <Support />
    </ProtectedRoute>
  );
};

export default SupportPage;
