
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ProtectedRoute from "../auth/ProtectedRoute";
import UserStats from "./UserStats";
import UserSearch from "./UserSearch";
import UserTable from "./UserTable";
import UserManagementActions from "./UserManagementActions";
import UserManagementModals from "./UserManagementModals";
import SeniorsTable from "./SeniorsTable";
import AidantsTable from "./AidantsTable";
import { useUserManagement } from "./useUserManagement";
import { useSupabaseSeniors } from "../../hooks/useSupabaseSeniors";
import { useSupabaseUsers } from "../../hooks/useSupabaseUsers";

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

  const { seniors, aidants, loading: seniorsLoading, error: seniorsError } = useSupabaseSeniors();
  const { loading, error } = useSupabaseUsers();

  console.log('UserManagement render:', { loading, seniorsLoading, error, seniorsError, users: users.length });

  if (loading || seniorsLoading) {
    return (
      <ProtectedRoute requiredPage="users">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600">Chargement des utilisateurs...</p>
            <p className="text-slate-400 text-sm mt-2">
              Utilisateurs: {loading ? 'Chargement...' : 'Chargé'} | 
              Seniors: {seniorsLoading ? 'Chargement...' : 'Chargé'}
            </p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error || seniorsError) {
    return (
      <ProtectedRoute requiredPage="users">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-xl">⚠</span>
            </div>
            <h3 className="text-lg font-medium text-slate-800 mb-2">Erreur de chargement</h3>
            <p className="text-slate-600 mb-4">{error || seniorsError}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Réessayer
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

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

        <Accordion type="multiple" defaultValue={["utilisateurs"]} className="space-y-4">
          <AccordionItem value="utilisateurs">
            <Card>
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <CardTitle className="text-left">
                  Utilisateurs ({users.length})
                </CardTitle>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="pt-0">
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
              </AccordionContent>
            </Card>
          </AccordionItem>

          <AccordionItem value="seniors">
            <Card>
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <CardTitle className="text-left">
                  Seniors ({seniors.length})
                </CardTitle>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="pt-0">
                  {seniors.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-slate-500 text-lg">Aucun senior trouvé dans la base de données</p>
                      <p className="text-slate-400 text-sm mt-2">Les seniors apparaîtront ici une fois qu'ils seront créés</p>
                    </div>
                  ) : (
                    <SeniorsTable seniors={seniors} />
                  )}
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>

          <AccordionItem value="aidants">
            <Card>
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <CardTitle className="text-left">
                  Aidants ({aidants.length})
                </CardTitle>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="pt-0">
                  {aidants.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-slate-500 text-lg">Aucun aidant trouvé dans la base de données</p>
                      <p className="text-slate-400 text-sm mt-2">Les aidants apparaîtront ici une fois qu'ils seront créés</p>
                    </div>
                  ) : (
                    <AidantsTable aidants={aidants} />
                  )}
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>
        </Accordion>

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
