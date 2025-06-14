
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import DeleteUserConfirm from "./DeleteUserConfirm";
import { User } from "../../stores/authStore";
import { CreateUserData } from "./userTypes";

interface UserManagementModalsProps {
  isAddUserModalOpen: boolean;
  isEditUserModalOpen: boolean;
  isDeleteConfirmOpen: boolean;
  selectedUser: User | null;
  onCloseAddModal: () => void;
  onCloseEditModal: () => void;
  onCloseDeleteModal: () => void;
  onUserAdded: (newUserData: CreateUserData, userPassword: string) => void;
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

      {selectedUser && (
        <EditUserModal
          isOpen={isEditUserModalOpen}
          onClose={onCloseEditModal}
          user={selectedUser}
          onEditUser={onUserEdited}
        />
      )}

      {selectedUser && (
        <DeleteUserConfirm
          isOpen={isDeleteConfirmOpen}
          onClose={onCloseDeleteModal}
          user={selectedUser}
          onConfirm={() => onUserDeleted(selectedUser.id)}
        />
      )}
    </>
  );
};

export default UserManagementModals;
