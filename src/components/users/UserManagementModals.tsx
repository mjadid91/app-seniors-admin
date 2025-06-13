
import { User } from "../../stores/authStore";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import DeleteUserConfirm from "./DeleteUserConfirm";

interface UserManagementModalsProps {
  isAddUserModalOpen: boolean;
  isEditUserModalOpen: boolean;
  isDeleteConfirmOpen: boolean;
  selectedUser: User | null;
  onCloseAddModal: () => void;
  onCloseEditModal: () => void;
  onCloseDeleteModal: () => void;
  onUserAdded: (newUserData: Omit<User, 'id'>) => void;
  onUserEdited: (userId: string, updatedData: Partial<User>) => void;
  onUserDeleted: (userId: string) => void;
}

const UserManagementModals = ({
  isAddUserModalOpen,
  isEditUserModalOpen,
  isDeleteConfirmOpen,
  selectedUser,
  onCloseAddModal,
  onCloseEditModal,
  onCloseDeleteModal,
  onUserAdded,
  onUserEdited,
  onUserDeleted
}: UserManagementModalsProps) => {
  return (
    <>
      <AddUserModal 
        isOpen={isAddUserModalOpen}
        onClose={onCloseAddModal}
        onAddUser={onUserAdded}
      />

      <EditUserModal 
        isOpen={isEditUserModalOpen}
        onClose={onCloseEditModal}
        user={selectedUser}
        onEditUser={onUserEdited}
      />

      <DeleteUserConfirm 
        isOpen={isDeleteConfirmOpen}
        onClose={onCloseDeleteModal}
        user={selectedUser}
        onConfirmDelete={onUserDeleted}
      />
    </>
  );
};

export default UserManagementModals;
