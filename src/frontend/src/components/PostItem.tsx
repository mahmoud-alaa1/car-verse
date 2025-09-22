import React, { memo } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { Post } from '@/contexts/AppContext';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface PostItemProps {
  post: Post;
}

export const PostItem = memo(({ post }: PostItemProps) => {
  const { state, dispatch } = useApp();
  const { toast } = useToast();

  const handleLike = () => {
    if (!state.isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in to like posts.",
        variant: "destructive",
      });
      return;
    }

    dispatch({ type: 'TOGGLE_LIKE', payload: { postId: post.id } });
  };

  const handleComment = () => {
    if (!state.isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in to comment on posts.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Comments",
      description: "Comment feature coming soon!",
    });
  };

  const handleShare = () => {
    if (!state.isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in to share posts.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Shared!",
      description: "Post shared successfully.",
    });
  };

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        {/* Post Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-car-navy to-car-gray rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {post.username[0].toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-foreground">{post.username}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(post.timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-foreground leading-relaxed">{post.content}</p>
        </div>

        {/* Post Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                "flex items-center space-x-1 text-muted-foreground hover:text-red-500",
                post.liked && "text-red-500"
              )}
            >
              <Heart className={cn("w-4 h-4", post.liked && "fill-current")} />
              <span className="text-sm">{post.likes}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleComment}
              className="flex items-center space-x-1 text-muted-foreground hover:text-car-accent"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{post.comments}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="flex items-center space-x-1 text-muted-foreground hover:text-car-accent"
            >
              <Share className="w-4 h-4" />
              <span className="text-sm">{post.shares}</span>
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            in {state.groups.find(g => g.id === post.groupId)?.name}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

PostItem.displayName = 'PostItem';