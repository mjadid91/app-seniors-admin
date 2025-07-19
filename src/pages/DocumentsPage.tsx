
import Documents from "../components/documents/Documents";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const DocumentsPage = () => {
  return (
    <ProtectedRoute requiredPage="documents">
      <div className="max-w-full mx-auto px-6 lg:px-8 py-8">
        <Documents />
      </div>
    </ProtectedRoute>
  );
};

export default DocumentsPage;
