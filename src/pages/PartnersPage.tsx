
import Partners from "../components/partners/Partners";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const PartnersPage = () => {
  return (
    <ProtectedRoute requiredPage="partners">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 mt-14 sm:mt-16">
        <Partners />
      </div>
    </ProtectedRoute>
  );
};

export default PartnersPage;
