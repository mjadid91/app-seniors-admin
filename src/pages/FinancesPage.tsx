
import Finances from "../components/finances/Finances";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const FinancesPage = () => {
  return (
    <ProtectedRoute requiredPage="finances">
      <div className="max-w-full mx-auto px-6 lg:px-8 py-8">
        <Finances />
      </div>
    </ProtectedRoute>
  );
};

export default FinancesPage;
