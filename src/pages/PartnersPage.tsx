
import Partners from "../components/partners/Partners";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const PartnersPage = () => {
  return (
    <ProtectedRoute requiredPage="partners">
      <Partners />
    </ProtectedRoute>
  );
};

export default PartnersPage;
