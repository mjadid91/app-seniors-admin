
import RGPD from "../components/rgpd/RGPD";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const RGPDPage = () => {
  return (
    <ProtectedRoute requiredPage="rgpd">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 mt-14 sm:mt-16">
        <RGPD />
      </div>
    </ProtectedRoute>
  );
};

export default RGPDPage;
