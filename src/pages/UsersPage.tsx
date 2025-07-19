
import UserManagement from "../components/users/UserManagement";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const UsersPage = () => {
  return (
    <ProtectedRoute requiredPage="users">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 mt-14 sm:mt-16">
        <UserManagement />
      </div>
    </ProtectedRoute>
  );
};

export default UsersPage;
