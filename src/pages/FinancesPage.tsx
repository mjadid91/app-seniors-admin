
import Finances from "../components/finances/Finances";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const FinancesPage = () => {
  return (
    <ProtectedRoute requiredPage="finances">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 mt-14 sm:mt-16">
        <Finances />
      </div>
    </ProtectedRoute>
  );
};

export default FinancesPage;
