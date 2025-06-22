
import UserManagement from "../components/users/UserManagement";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const UsersPage = () => {
  return (
    <ProtectedRoute requiredPage="users">
      <UserManagement />
    </ProtectedRoute>
  );
};

export default UsersPage;
