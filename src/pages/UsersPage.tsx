
import { Users } from "lucide-react";
import UserManagement from "../components/users/UserManagement";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PageContainer from "../components/layout/PageContainer";

const UsersPage = () => {
  return (
    <ProtectedRoute requiredPage="users">
      <PageContainer 
        title="Gestion des utilisateurs"
        description="Administrez les comptes utilisateurs de la plateforme"
        icon={Users}
      >
        <UserManagement />
      </PageContainer>
    </ProtectedRoute>
  );
};

export default UsersPage;
