
import Moderation from "../components/moderation/Moderation";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const ModerationPage = () => {
  return (
    <ProtectedRoute requiredPage="moderation">
      <div className="max-w-full mx-auto px-6 lg:px-8 py-8">
        <Moderation />
      </div>
    </ProtectedRoute>
  );
};

export default ModerationPage;
