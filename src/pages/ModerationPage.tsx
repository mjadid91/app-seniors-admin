
import Moderation from "../components/moderation/Moderation";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const ModerationPage = () => {
  return (
    <ProtectedRoute requiredPage="moderation">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Moderation />
      </div>
    </ProtectedRoute>
  );
};

export default ModerationPage;
