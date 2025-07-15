
import PrestationTracking from "../components/prestations/PrestationTracking";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const PrestationsPage = () => {
  return (
    <ProtectedRoute requiredPage="prestations">
      <div className="max-w-full mx-auto px-6 lg:px-8 py-8">
        <PrestationTracking />
      </div>
    </ProtectedRoute>
  );
};

export default PrestationsPage;
