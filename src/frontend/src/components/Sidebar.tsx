import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Sidebar: React.FC = () => {
  const { state, dispatch } = useApp();

  const handleGroupSelect = (groupId: string) => {
    dispatch({ type: 'SET_CURRENT_GROUP', payload: { groupId } });
  };

  return (
    <aside className="w-64 bg-card border-r border-border h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-foreground mb-4">Car Groups</h2>
        
        <div className="space-y-2">
          {state.groups.map((group) => (
            <motion.div
              key={group.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
            <Button
              variant={state.currentGroup === group.id ? "premium" : "glass"}
              className={cn(
                "w-full justify-start text-left h-12 transition-smooth",
                state.currentGroup === group.id 
                  ? "animate-pulse-glow" 
                  : "hover:bg-accent/60 hover:text-accent-foreground"
              )}
              onClick={() => handleGroupSelect(group.id)}
            >
                <span className="text-lg mr-3">{group.icon}</span>
                <span className="font-medium">{group.name}</span>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Community Stats */}
        <div className="mt-8 p-4 glass-card rounded-lg animate-float">
          <h3 className="text-sm font-semibold text-foreground mb-2">Community Stats</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Total Posts</span>
              <span className="font-medium">{state.posts.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Active Groups</span>
              <span className="font-medium">{state.groups.length - 1}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Likes</span>
              <span className="font-medium">
                {state.posts.reduce((sum, post) => sum + post.likes, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};