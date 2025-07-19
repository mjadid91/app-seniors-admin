
import Support from "../components/support/Support";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const SupportPage = () => {
  return (
    <ProtectedRoute requiredPage="support">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 mt-14 sm:mt-16">
        <Support />
      </div>
    </ProtectedRoute>
  );
};

export default SupportPage;
