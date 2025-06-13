
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProtectedRoute from "../auth/ProtectedRoute";
import UserStats from "./UserStats";
import UserSearch from "./UserSearch";
import UserTable from "./UserTable";
import UserManagementActions from "./UserManagementActions";
import UserManagementModals from "./UserManagementModals";
import { useUserManagement } from "./useUserManagement";

const UserManagement = () => {
  const {
    searchTerm,
    users,
    filteredUsers,
    stats,
    isAddUserModalOpen,
    isEditUserModalOpen,
    isDeleteConfirmOpen,
    selectedUser,
    setSearchTerm,
    handleRoleChange,
    handleAddUser,
    handleUserAdded,
    handleEditUser,
    handleUserEdited,
    handleDeleteUser,
    handleUserDeleted,
    setIsAddUserModalOpen,
    setIsEditUserModalOpen,
    setIsDeleteConfirmOpen
  } = useUserManagement();

  return (
    <ProtectedRoute requiredPage="users">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-800">Gestion des utilisateurs</h1>
          <UserManagementActions 
            users={users}
            onAddUser={handleAddUser}
          />
        </div>

        <UserStats stats={stats} />

        <Card>
          <CardHeader>
            <CardTitle>Liste des utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <UserSearch 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <UserTable 
              users={filteredUsers}
              onRoleChange={handleRoleChange}
              onEditUser={handleEditUser}
              onDeleteUser={handleDeleteUser}
            />
          </CardContent>
        </Card>

        <UserManagementModals 
          isAddUserModalOpen={isAddUserModalOpen}
          isEditUserModalOpen={isEditUserModalOpen}
          isDeleteConfirmOpen={isDeleteConfirmOpen}
          selectedUser={selectedUser}
          onCloseAddModal={() => setIsAddUserModalOpen(false)}
          onCloseEditModal={() => setIsEditUserModalOpen(false)}
          onCloseDeleteModal={() => setIsDeleteConfirmOpen(false)}
          onUserAdded={handleUserAdded}
          onUserEdited={handleUserEdited}
          onUserDeleted={handleUserDeleted}
        />
      </div>
    </ProtectedRoute>
  );
};

export default UserManagement;
