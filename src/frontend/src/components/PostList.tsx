import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { PostCard } from './PostCard';
import { CreatePost } from './CreatePost';

export const PostList: React.FC = () => {
  const { filteredPosts, state } = useApp();

  const currentGroupName = state.groups.find(g => g.id === state.currentGroup)?.name || 'All Cars';

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.div
        key={state.currentGroup}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {currentGroupName}
        </h1>
        <p className="text-muted-foreground">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} in this group
        </p>
      </motion.div>

      <CreatePost />

      <AnimatePresence mode="wait">
        <motion.div
          key={state.currentGroup}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <span className="text-2xl">🚗</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No posts yet
              </h3>
              <p className="text-muted-foreground">
                Be the first to share something in this group!
              </p>
            </motion.div>
          ) : (
            <div className="space-y-0">
              {filteredPosts.map((post, index) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  index={index}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};