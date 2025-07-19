
import RGPD from "../components/rgpd/RGPD";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const RGPDPage = () => {
  return (
    <ProtectedRoute requiredPage="rgpd">
      <div className="max-w-full mx-auto px-6 lg:px-8 py-8">
        <RGPD />
      </div>
    </ProtectedRoute>
  );
};

export default RGPDPage;
