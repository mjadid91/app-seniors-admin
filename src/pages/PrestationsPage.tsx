
import PrestationTracking from "../components/prestations/PrestationTracking";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const PrestationsPage = () => {
  return (
    <ProtectedRoute requiredPage="prestations">
      <PrestationTracking />
    </ProtectedRoute>
  );
};

export default PrestationsPage;
