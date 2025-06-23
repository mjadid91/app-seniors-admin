
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, Flag } from "lucide-react";
import { ForumPost, GroupMessage } from './types';
import ModerationStats from './ModerationStats';
import ForumPostsTable from './ForumPostsTable';
import GroupMessagesTable from './GroupMessagesTable';
import AddForumSubjectModal from './AddForumSubjectModal';
import AddForumModal from './AddForumModal';
import AddGroupModal from '@/components/groups/AddGroupModal';
import AddGroupMessageModal from './AddGroupMessageModal';
import AddSignalementModal from './AddSignalementModal';
// Import the new hooks
import { useForumPosts } from './useForumPosts';
import { useGroupMessages } from './useGroupMessages';

const Moderation = () => {
  // Load forum posts from DB
  const {
    data: forumPosts = [],
    isLoading: forumLoading,
    error: forumError,
    refetch: refetchForumPosts
  } = useForumPosts();

  // Load group messages from DB
  const {
    data: groupMessages = [],
    isLoading: groupsLoading,
    error: groupsError,
  } = useGroupMessages();

  // State for updating in memory the status changes locally after moderation
  const [localForumPosts, setLocalForumPosts] = useState<ForumPost[]>([]);
  const [localGroupMessages, setLocalGroupMessages] = useState<GroupMessage[]>([]);

  // Modal states
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [showAddForumModal, setShowAddForumModal] = useState(false);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [showAddGroupMessageModal, setShowAddGroupMessageModal] = useState(false);
  const [showAddSignalementModal, setShowAddSignalementModal] = useState(false);

  // Derive final lists to display (local edits have priority)
  const displayedForumPosts =
    localForumPosts.length > 0 ? localForumPosts : forumPosts;
  const displayedGroupMessages =
    localGroupMessages.length > 0 ? localGroupMessages : groupMessages;

  const handleSubjectSuccess = () => {
    refetchForumPosts();
  };

  const handleForumSuccess = () => {
    // Les forums sont utilisés dans le modal de sujet, on pourrait aussi refetch ici
  };

  const handleGroupSuccess = () => {
    console.log("Groupe créé avec succès");
  };

  const handleGroupMessageSuccess = () => {
    console.log("Message de groupe ajouté avec succès");
  };

  const handleSignalementSuccess = () => {
    console.log("Signalement créé avec succès");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Modération</h2>
          <p className="text-slate-600 mt-1">Gestion des contenus des forums et groupes</p>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => setShowAddForumModal(true)} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Nouveau Forum
          </Button>
          <Button onClick={() => setShowAddSubjectModal(true)} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Nouveau Sujet
          </Button>
          <Button onClick={() => setShowAddGroupModal(true)} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Nouveau Groupe
          </Button>
          <Button onClick={() => setShowAddGroupMessageModal(true)} variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-1" />
            Message Groupe
          </Button>
          <Button onClick={() => setShowAddSignalementModal(true)} variant="outline" size="sm">
            <Flag className="h-4 w-4 mr-1" />
            Signalement
          </Button>
        </div>
      </div>

      <ModerationStats />

      <Tabs defaultValue="forums" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="forums">Forums</TabsTrigger>
          <TabsTrigger value="groupes">Groupes</TabsTrigger>
        </TabsList>

        <TabsContent value="forums">
          {forumLoading ? (
            <div className="p-4 text-center text-slate-500">Chargement des sujets…</div>
          ) : forumError ? (
            <div className="p-4 text-center text-red-500">Erreur de chargement</div>
          ) : (
            <ForumPostsTable 
              forumPosts={displayedForumPosts} 
              setForumPosts={setLocalForumPosts} 
            />
          )}
        </TabsContent>

        <TabsContent value="groupes">
          {groupsLoading ? (
            <div className="p-4 text-center text-slate-500">Chargement des messages…</div>
          ) : groupsError ? (
            <div className="p-4 text-center text-red-500">Erreur de chargement</div>
          ) : (
            <GroupMessagesTable 
              groupMessages={displayedGroupMessages} 
              setGroupMessages={setLocalGroupMessages} 
            />
          )}
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <AddForumSubjectModal
        isOpen={showAddSubjectModal}
        onClose={() => setShowAddSubjectModal(false)}
        onSuccess={handleSubjectSuccess}
      />

      <AddForumModal
        isOpen={showAddForumModal}
        onClose={() => setShowAddForumModal(false)}
        onSuccess={handleForumSuccess}
      />

      <AddGroupModal
        isOpen={showAddGroupModal}
        onClose={() => setShowAddGroupModal(false)}
        onSuccess={handleGroupSuccess}
      />

      <AddGroupMessageModal
        isOpen={showAddGroupMessageModal}
        onClose={() => setShowAddGroupMessageModal(false)}
        onSuccess={handleGroupMessageSuccess}
      />

      <AddSignalementModal
        isOpen={showAddSignalementModal}
        onClose={() => setShowAddSignalementModal(false)}
        onSuccess={handleSignalementSuccess}
      />
    </div>
  );
};

export default Moderation;
