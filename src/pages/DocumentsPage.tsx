
import Documents from "../components/documents/Documents";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const DocumentsPage = () => {
  return (
    <ProtectedRoute requiredPage="documents">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 mt-14 sm:mt-16">
        <Documents />
      </div>
    </ProtectedRoute>
  );
};

export default DocumentsPage;
