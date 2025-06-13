
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ForumPost, GroupMessage } from './types';
import { mockForumPosts, mockGroupMessages } from './mockData';
import ModerationStats from './ModerationStats';
import ForumPostsTable from './ForumPostsTable';
import GroupMessagesTable from './GroupMessagesTable';

const Moderation = () => {
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(mockForumPosts);
  const [groupMessages, setGroupMessages] = useState<GroupMessage[]>(mockGroupMessages);

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
          <ForumPostsTable 
            forumPosts={forumPosts} 
            setForumPosts={setForumPosts} 
          />
        </TabsContent>

        <TabsContent value="groupes">
          <GroupMessagesTable 
            groupMessages={groupMessages} 
            setGroupMessages={setGroupMessages} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Moderation;
