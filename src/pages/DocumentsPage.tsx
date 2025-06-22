
import Documents from "../components/documents/Documents";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const DocumentsPage = () => {
  return (
    <ProtectedRoute requiredPage="documents">
      <Documents />
    </ProtectedRoute>
  );
};

export default DocumentsPage;
