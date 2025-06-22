
import Finances from "../components/finances/Finances";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const FinancesPage = () => {
  return (
    <ProtectedRoute requiredPage="finances">
      <Finances />
    </ProtectedRoute>
  );
};

export default FinancesPage;
