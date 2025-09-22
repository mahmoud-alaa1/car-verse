import React, { memo, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { PostItem } from './PostItem';

export const PostFeed = memo(() => {
  const { state, dispatch } = useApp();
  const { toast } = useToast();

  // Filter posts based on selected group
  const filteredPosts = useMemo(() => {
    if (!state.selectedGroup) {
      return state.posts;
    }
    return state.posts.filter(post => post.groupId === state.selectedGroup);
  }, [state.posts, state.selectedGroup]);

  const handleCreatePost = () => {
    if (!state.isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in to create posts.",
        variant: "destructive",
      });
      return;
    }
    
    dispatch({ type: 'SET_CREATE_POST_OPEN', payload: true });
  };

  const groupName = state.selectedGroup 
    ? state.groups.find(g => g.id === state.selectedGroup)?.name 
    : 'All Groups';

  return (
    <main className="flex-1 max-w-2xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {groupName}
          </h2>
          <p className="text-muted-foreground">
            {filteredPosts.length} posts
          </p>
        </div>
        
        <Button
          onClick={handleCreatePost}
          className="bg-car-accent hover:bg-car-accent/90 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No posts yet in {groupName}
            </h3>
            <p className="text-muted-foreground mb-4">
              Be the first to share something with the community!
            </p>
            <Button
              onClick={handleCreatePost}
              variant="outline"
            >
              Create First Post
            </Button>
          </div>
        )}
      </div>
    </main>
  );
});

PostFeed.displayName = 'PostFeed';