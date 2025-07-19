
import Support from "../components/support/Support";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const SupportPage = () => {
  return (
    <ProtectedRoute requiredPage="support">
      <div className="max-w-full mx-auto px-6 lg:px-8 py-8">
        <Support />
      </div>
    </ProtectedRoute>
  );
};

export default SupportPage;
