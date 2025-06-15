
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ForumPost, GroupMessage } from './types';
import ModerationStats from './ModerationStats';
import ForumPostsTable from './ForumPostsTable';
import GroupMessagesTable from './GroupMessagesTable';
// Import the new hooks
import { useForumPosts } from './useForumPosts';
import { useGroupMessages } from './useGroupMessages';

const Moderation = () => {
  // Load forum posts from DB
  const {
    data: forumPosts = [],
    isLoading: forumLoading,
    error: forumError,
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

  // Derive final lists to display (local edits have priority)
  const displayedForumPosts =
    localForumPosts.length > 0 ? localForumPosts : forumPosts;
  const displayedGroupMessages =
    localGroupMessages.length > 0 ? localGroupMessages : groupMessages;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Modération</h2>
          <p className="text-slate-600 mt-1">Gestion des contenus des forums et groupes</p>
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
    </div>
  );
};

export default Moderation;
