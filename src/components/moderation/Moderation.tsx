
import { useState } from "react";
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

  const handleSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
    refetchForumPosts();
    refetchGroupMessages();
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Modération</h1>
      </div>

      <ModerationStats />

      <Tabs defaultValue="forums" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="forums" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Forums
          </TabsTrigger>
          <TabsTrigger value="groupes" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Groupes
          </TabsTrigger>
          <TabsTrigger value="signalements" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Signalements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="forums" className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Button 
              onClick={() => setIsAddForumModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Ajouter un forum
            </Button>
            <Button 
              onClick={() => setIsAddForumSubjectModalOpen(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Ajouter un sujet
            </Button>
          </div>
          <ForumPostsTable 
            forumPosts={forumPosts}
            setForumPosts={() => {}} // This will be handled by React Query refetch
          />
        </TabsContent>

        <TabsContent value="groupes" className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Button 
              onClick={() => setIsAddGroupModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Ajouter un groupe
            </Button>
            <Button 
              onClick={() => setIsAddGroupMessageModalOpen(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Ajouter un message
            </Button>
            <Button 
              onClick={() => setIsAddGroupMembersModalOpen(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <UserCheck className="h-4 w-4" />
              Ajouter des membres
            </Button>
          </div>
          <GroupMessagesTable 
            groupMessages={groupMessages}
            setGroupMessages={() => {}} // This will be handled by React Query refetch
          />
        </TabsContent>

        <TabsContent value="signalements" className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Button 
              onClick={() => setIsAddSignalementModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Ajouter un signalement
            </Button>
          </div>
          <SignalementsTable refreshTrigger={refreshTrigger} />
        </TabsContent>
      </Tabs>

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
    </div>
  );
};

export default Moderation;
