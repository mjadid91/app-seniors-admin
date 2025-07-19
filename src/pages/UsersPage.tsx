
import UserManagement from "../components/users/UserManagement";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const UsersPage = () => {
  return (
    <ProtectedRoute requiredPage="users">
      <div className="max-w-full mx-auto px-6 lg:px-8 py-8">
        <UserManagement />
      </div>
    </ProtectedRoute>
  );
};

export default UsersPage;
