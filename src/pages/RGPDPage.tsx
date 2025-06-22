
import RGPD from "../components/rgpd/RGPD";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const RGPDPage = () => {
  return (
    <ProtectedRoute requiredPage="rgpd">
      <RGPD />
    </ProtectedRoute>
  );
};

export default RGPDPage;
