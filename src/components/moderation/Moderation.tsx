
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageSquare, FileText, AlertTriangle, UserPlus, MessageCircle, Plus, UserCheck } from "lucide-react";
import ModerationStats from "./ModerationStats";
import ForumPostsTable from "./ForumPostsTable";
import GroupMessagesTable from "./GroupMessagesTable";
import SignalementsTable from "./SignalementsTable";
import AddForumModal from "./AddForumModal";
import AddForumSubjectModal from "./AddForumSubjectModal";
import AddGroupModal from "../groups/AddGroupModal";
import AddGroupMessageModal from "./AddGroupMessageModal";
import AddSignalementModal from "./AddSignalementModal";
import AddGroupMembersModal from "./AddGroupMembersModal";
import { useForumPosts } from "./useForumPosts";
import { useGroupMessages } from "./useGroupMessages";

const Moderation = () => {
  const queryClient = useQueryClient();
  const [isAddForumModalOpen, setIsAddForumModalOpen] = useState(false);
  const [isAddForumSubjectModalOpen, setIsAddForumSubjectModalOpen] = useState(false);
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  const [isAddGroupMessageModalOpen, setIsAddGroupMessageModalOpen] = useState(false);
  const [isAddSignalementModalOpen, setIsAddSignalementModalOpen] = useState(false);
  const [isAddGroupMembersModalOpen, setIsAddGroupMembersModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Fetch forum posts and group messages
  const { data: forumPosts = [], refetch: refetchForumPosts } = useForumPosts();
  const { data: groupMessages = [], refetch: refetchGroupMessages } = useGroupMessages();

  // Local state for immediate UI updates
  const [localForumPosts, setLocalForumPosts] = useState(forumPosts);
  const [localGroupMessages, setLocalGroupMessages] = useState(groupMessages);

  // Update local state when React Query data changes
  useEffect(() => {
    setLocalForumPosts(forumPosts);
  }, [forumPosts]);

  useEffect(() => {
    setLocalGroupMessages(groupMessages);
  }, [groupMessages]);

  const handleSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
    refetchForumPosts();
    refetchGroupMessages();
    // Invalider la query des forums pour mettre à jour la liste dans AddForumSubjectModal
    queryClient.invalidateQueries({ queryKey: ['forums'] });
    // Invalider aussi les queries des utilisateurs pour s'assurer que tout est à jour
    queryClient.invalidateQueries({ queryKey: ['utilisateurs'] });
  };

  return (
    <>
      {/* Header Section */}
      <div>
        <div className="max-w-full mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Modération
              </h1>
              <p className="text-slate-600 mt-2">
                Gérez les contenus et surveillez l'activité de la plateforme
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-full mx-auto px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Statistics Cards */}
          <ModerationStats />

          {/* Moderation Tabs */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <Tabs defaultValue="forums" className="w-full">
              <div className="border-b border-slate-200 bg-slate-50/50">
                <div className="px-6">
                  <TabsList className="grid w-full max-w-md grid-cols-3 bg-transparent h-auto p-0">
                    <TabsTrigger 
                      value="forums" 
                      className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-sm rounded-none border-b-2 border-transparent"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span className="hidden sm:inline">Forums</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="groupes" 
                      className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-sm rounded-none border-b-2 border-transparent"
                    >
                      <Users className="h-4 w-4" />
                      <span className="hidden sm:inline">Groupes</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="signalements" 
                      className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-sm rounded-none border-b-2 border-transparent"
                    >
                      <AlertTriangle className="h-4 w-4" />
                      <span className="hidden sm:inline">Signalements</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <div className="p-6">
                <TabsContent value="forums" className="space-y-6 mt-0">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={() => setIsAddForumModalOpen(true)}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un forum
                    </Button>
                    <Button 
                      onClick={() => setIsAddForumSubjectModalOpen(true)}
                      variant="outline"
                      className="border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Ajouter un sujet
                    </Button>
                  </div>
                  <ForumPostsTable 
                    forumPosts={localForumPosts}
                    setForumPosts={setLocalForumPosts}
                  />
                </TabsContent>

                <TabsContent value="groupes" className="space-y-6 mt-0">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={() => setIsAddGroupModalOpen(true)}
                      className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un groupe
                    </Button>
                    <Button 
                      onClick={() => setIsAddGroupMessageModalOpen(true)}
                      variant="outline"
                      className="border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Ajouter un message
                    </Button>
                    <Button 
                      onClick={() => setIsAddGroupMembersModalOpen(true)}
                      variant="outline"
                      className="border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                    >
                      <UserCheck className="h-4 w-4 mr-2" />
                      Ajouter des membres
                    </Button>
                  </div>
                  <GroupMessagesTable 
                    groupMessages={localGroupMessages}
                    setGroupMessages={setLocalGroupMessages}
                  />
                </TabsContent>

                <TabsContent value="signalements" className="space-y-6 mt-0">
                  <div>
                    <Button 
                      onClick={() => setIsAddSignalementModalOpen(true)}
                      className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un signalement
                    </Button>
                  </div>
                  <SignalementsTable refreshTrigger={refreshTrigger} />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddForumModal
        isOpen={isAddForumModalOpen}
        onClose={() => setIsAddForumModalOpen(false)}
        onSuccess={handleSuccess}
      />

      <AddForumSubjectModal
        isOpen={isAddForumSubjectModalOpen}
        onClose={() => setIsAddForumSubjectModalOpen(false)}
        onSuccess={handleSuccess}
      />

      <AddGroupModal
        isOpen={isAddGroupModalOpen}
        onClose={() => setIsAddGroupModalOpen(false)}
        onSuccess={handleSuccess}
      />

      <AddGroupMessageModal
        isOpen={isAddGroupMessageModalOpen}
        onClose={() => setIsAddGroupMessageModalOpen(false)}
        onSuccess={handleSuccess}
      />

      <AddSignalementModal
        isOpen={isAddSignalementModalOpen}
        onClose={() => setIsAddSignalementModalOpen(false)}
        onSuccess={handleSuccess}
      />

      <AddGroupMembersModal
        isOpen={isAddGroupMembersModalOpen}
        onClose={() => setIsAddGroupMembersModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
};

export default Moderation;
