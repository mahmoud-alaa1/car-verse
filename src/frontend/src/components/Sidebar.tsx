import React, { memo } from 'react';
import { TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

export const Sidebar = memo(() => {
  const { state, dispatch } = useApp();

  const handleGroupSelect = (groupId: string | null) => {
    dispatch({ type: 'SET_SELECTED_GROUP', payload: groupId });
  };

  return (
    <aside className="w-64 bg-primary text-primary-foreground border-r border-border flex-shrink-0">
      <div className="p-4 space-y-6">
        {/* Groups Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Groups</span>
          </h2>
          
          <div className="space-y-1">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-normal",
                "text-primary-foreground hover:bg-primary/80 hover:text-car-accent",
                !state.selectedGroup && "bg-primary/60 text-car-accent"
              )}
              onClick={() => handleGroupSelect(null)}
            >
              All Groups
            </Button>
            
            {state.groups.map((group) => (
              <Button
                key={group.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  "text-primary-foreground hover:bg-primary/80 hover:text-car-accent",
                  state.selectedGroup === group.id && "bg-primary/60 text-car-accent"
                )}
                onClick={() => handleGroupSelect(group.id)}
              >
                {group.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Trending Section */}
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Live an</span>
          </h3>
          
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-left font-normal text-sm text-primary-foreground hover:bg-primary/80 hover:text-car-accent"
            >
              Trending on
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';