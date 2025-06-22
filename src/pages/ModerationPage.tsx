
import Moderation from "../components/moderation/Moderation";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const ModerationPage = () => {
  return (
    <ProtectedRoute requiredPage="moderation">
      <Moderation />
    </ProtectedRoute>
  );
};

export default ModerationPage;
