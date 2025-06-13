
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProtectedRoute from "../auth/ProtectedRoute";
import SeniorsStats from "./SeniorsStats";
import SeniorsList from "./SeniorsList";
import AidantsList from "./AidantsList";
import { useSeniors } from "./useSeniors";

const Seniors = () => {
  const { seniors, aidants, stats } = useSeniors();

  return (
    <ProtectedRoute requiredPage="seniors">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-800">Seniors & Aidants</h1>
        </div>

        <SeniorsStats stats={stats} />

        <Tabs defaultValue="seniors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="seniors">Seniors</TabsTrigger>
            <TabsTrigger value="aidants">Aidants</TabsTrigger>
          </TabsList>

          <TabsContent value="seniors">
            <Card>
              <CardHeader>
                <CardTitle>Liste des seniors</CardTitle>
              </CardHeader>
              <CardContent>
                <SeniorsList seniors={seniors} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aidants">
            <Card>
              <CardHeader>
                <CardTitle>Liste des aidants</CardTitle>
              </CardHeader>
              <CardContent>
                <AidantsList aidants={aidants} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
};

export default Seniors;
