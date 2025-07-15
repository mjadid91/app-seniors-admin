import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import ProtectedRoute from "../auth/ProtectedRoute";
import UserStats from "./UserStats";
import UserSearch from "./UserSearch";
import UserTable from "./UserTable";
import UserManagementActions from "./UserManagementActions";
import UserManagementModals from "./UserManagementModals";
import SeniorsTable from "./SeniorsTable";
import AidantsTable from "./AidantsTable";
import SeniorsStats from "../seniors/SeniorsStats";
import EditSeniorModal from "./EditSeniorModal";
import EditAidantModal from "./EditAidantModal";
import DeleteSeniorModal from "./DeleteSeniorModal";
import DeleteAidantModal from "./DeleteAidantModal";
import AddSeniorModal from "./AddSeniorModal";
import AddAidantModal from "./AddAidantModal";
import { useUserManagement } from "./useUserManagement";
import { useSupabaseUsers } from "../../hooks/useSupabaseUsers";
import { useSeniors } from "../seniors/useSeniors";
import { usePermissions, PERMISSIONS } from "../../hooks/usePermissions";

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

  const { loading: usersLoading, error: usersError, fetchUsers } = useSupabaseUsers();
  const { hasPermission } = usePermissions();
  const canManageUsers = hasPermission(PERMISSIONS.MANAGE_USERS);

  const {
    searchTerm: seniorsSearchTerm,
    seniors,
    aidants,
    filteredSeniors,
    filteredAidants,
    stats: seniorsStats,
    loading: seniorsLoading,
    error: seniorsError,
    setSearchTerm: setSeniorsSearchTerm,
    handleAddSenior,
    handleAddAidant,
    handleEditSenior,
    handleDeleteSenior,
    handleEditAidant,
    handleDeleteAidant,
    handleAddSeniorSubmit,
    handleAddAidantSubmit,
    handleSaveSenior,
    handleSaveAidant,
    handleConfirmDeleteSenior,
    handleConfirmDeleteAidant,
    refetch: refetchSeniors,
    // Modal states
    isAddSeniorModalOpen,
    isAddAidantModalOpen,
    isEditSeniorModalOpen,
    isEditAidantModalOpen,
    isDeleteSeniorModalOpen,
    isDeleteAidantModalOpen,
    selectedSenior,
    selectedAidant,
    setIsAddSeniorModalOpen,
    setIsAddAidantModalOpen,
    setIsEditSeniorModalOpen,
    setIsEditAidantModalOpen,
    setIsDeleteSeniorModalOpen,
    setIsDeleteAidantModalOpen
  } = useSeniors();

  console.log('UserManagement render:', { 
    usersLoading, 
    usersError, 
    users: users.length,
    seniorsLoading,
    seniorsError,
    seniors: seniors.length,
    aidants: aidants.length
  });

  if (usersLoading || seniorsLoading) {
    return (
      <ProtectedRoute requiredPage="users">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600">Chargement des utilisateurs...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (usersError || seniorsError) {
    const error = usersError || seniorsError;
    return (
      <ProtectedRoute requiredPage="users">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-xl">⚠</span>
            </div>
            <h3 className="text-lg font-medium text-slate-800 mb-2">Erreur de chargement</h3>
            <p className="text-slate-600 mb-4">{error}</p>
            <div className="space-y-2">
              <Button 
                onClick={() => {
                  fetchUsers();
                  refetchSeniors();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Réessayer
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.reload()}
                className="px-4 py-2"
              >
                Recharger la page
              </Button>
            </div>
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
        </div>

        <Tabs defaultValue="admins" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="admins">Administratifs ({users.length})</TabsTrigger>
            <TabsTrigger value="seniors">Seniors ({seniors.length})</TabsTrigger>
            <TabsTrigger value="aidants">Aidants ({aidants.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="admins" className="space-y-6">
            <UserStats stats={stats} />
            
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Utilisateurs administratifs</h2>
              <UserManagementActions 
                users={users}
                onAddUser={handleAddUser}
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>
                  Utilisateurs administratifs ({users.length})
                </CardTitle>
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
                  onRefresh={fetchUsers}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seniors" className="space-y-6">
            <SeniorsStats stats={seniorsStats} />
            
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Seniors</h2>
              {canManageUsers && (
                <Button onClick={handleAddSenior} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Ajouter un senior
                </Button>
              )}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>
                  Seniors ({seniors.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <UserSearch 
                  searchTerm={seniorsSearchTerm}
                  onSearchChange={setSeniorsSearchTerm}
                />
                <SeniorsTable 
                  seniors={filteredSeniors}
                  onEditSenior={handleEditSenior}
                  onDeleteSenior={handleDeleteSenior}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aidants" className="space-y-6">
            <SeniorsStats stats={seniorsStats} />
            
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Aidants</h2>
              {canManageUsers && (
                <Button onClick={handleAddAidant} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Ajouter un aidant
                </Button>
              )}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>
                  Aidants ({aidants.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <UserSearch 
                  searchTerm={seniorsSearchTerm}
                  onSearchChange={setSeniorsSearchTerm}
                />
                <AidantsTable 
                  aidants={filteredAidants}
                  onEditAidant={handleEditAidant}
                  onDeleteAidant={handleDeleteAidant}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

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

        {/* Modal d'ajout de senior */}
        <AddSeniorModal
          isOpen={isAddSeniorModalOpen}
          onClose={() => setIsAddSeniorModalOpen(false)}
          onAddSenior={handleAddSeniorSubmit}
        />

        {/* Modal d'ajout d'aidant */}
        <AddAidantModal
          isOpen={isAddAidantModalOpen}
          onClose={() => setIsAddAidantModalOpen(false)}
          onAddAidant={handleAddAidantSubmit}
        />

        {/* Modales pour les seniors */}
        <EditSeniorModal
          isOpen={isEditSeniorModalOpen}
          onClose={() => setIsEditSeniorModalOpen(false)}
          senior={selectedSenior}
          onSave={handleSaveSenior}
        />

        <DeleteSeniorModal
          isOpen={isDeleteSeniorModalOpen}
          onClose={() => setIsDeleteSeniorModalOpen(false)}
          senior={selectedSenior}
          onConfirm={handleConfirmDeleteSenior}
        />

        {/* Modales pour les aidants */}
        <EditAidantModal
          isOpen={isEditAidantModalOpen}
          onClose={() => setIsEditAidantModalOpen(false)}
          aidant={selectedAidant}
          onSave={handleSaveAidant}
        />

        <DeleteAidantModal
          isOpen={isDeleteAidantModalOpen}
          onClose={() => setIsDeleteAidantModalOpen(false)}
          aidant={selectedAidant}
          onConfirm={handleConfirmDeleteAidant}
        />
      </div>
    </ProtectedRoute>
  );
};

export default UserManagement;
