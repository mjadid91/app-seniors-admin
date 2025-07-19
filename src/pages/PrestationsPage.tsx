
import PrestationTracking from "../components/prestations/PrestationTracking";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const PrestationsPage = () => {
  return (
    <ProtectedRoute requiredPage="prestations">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 mt-14 sm:mt-16">
        <PrestationTracking />
      </div>
    </ProtectedRoute>
  );
};

export default PrestationsPage;
