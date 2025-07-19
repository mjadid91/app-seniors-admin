
import Partners from "../components/partners/Partners";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const PartnersPage = () => {
  return (
    <ProtectedRoute requiredPage="partners">
      <div className="max-w-full mx-auto px-6 lg:px-8 py-8">
        <Partners />
      </div>
    </ProtectedRoute>
  );
};

export default PartnersPage;
