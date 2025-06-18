
import { Card, CardContent } from "@/components/ui/card";

const ProfileLoading = () => {
  return (
    <Card className="animate-scale-in">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Chargement de votre profil...</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileLoading;
