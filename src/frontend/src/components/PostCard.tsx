import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Clock } from 'lucide-react';
import { Post, useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  index: number;
}

export const PostCard: React.FC<PostCardProps> = ({ post, index }) => {
  const { state, dispatch } = useApp();

  const handleLike = () => {
    dispatch({ type: 'TOGGLE_LIKE', payload: { postId: post.id } });
  };

  const getGroupInfo = () => {
    return state.groups.find(g => g.id === post.group) || state.groups[0];
  };

  const groupInfo = getGroupInfo();

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      className="animate-fade-in"
    >
      <Card className="glass-card mb-4 card-glow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {post.author.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{post.author}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {formatTimeAgo(post.timestamp)}
                </div>
              </div>
            </div>
            
            <Badge 
              variant="secondary" 
              className={cn(
                "flex items-center gap-1",
                groupInfo.color === 'racing' && "bg-racing/10 text-racing border-racing/20",
                groupInfo.color === 'electric' && "bg-electric/10 text-electric border-electric/20"
              )}
            >
              {groupInfo.icon}
              {groupInfo.name}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2 leading-tight">
              {post.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {post.content}
            </p>
          </div>
          
          <div className="flex items-center gap-4 pt-2 border-t border-border/50">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "flex items-center gap-2 transition-smooth",
                  post.likedByUser 
                    ? "text-racing hover:text-racing/80" 
                    : "text-muted-foreground hover:text-racing"
                )}
                onClick={handleLike}
              >
                <motion.div
                  animate={post.likedByUser ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.2 }}
                >
                  <Heart 
                    className={cn(
                      "w-5 h-5",
                      post.likedByUser && "fill-current"
                    )} 
                  />
                </motion.div>
                <span className="font-medium">{post.likes}</span>
              </Button>
            </motion.div>
            
            <Button variant="glass" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300">
              <MessageCircle className="w-5 h-5" />
              <span>Comment</span>
            </Button>
            
            <Button variant="glass" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300">
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};