
import Moderation from "../components/moderation/Moderation";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const ModerationPage = () => {
  return (
    <ProtectedRoute requiredPage="moderation">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 mt-14 sm:mt-16">
        <Moderation />
      </div>
    </ProtectedRoute>
  );
};

export default ModerationPage;
