import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

export function CreatePostModal() {
  const { state, dispatch } = useApp();
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(state.selectedGroup || '');

  const handleClose = () => {
    dispatch({ type: 'SET_CREATE_POST_OPEN', payload: false });
    setContent('');
    setSelectedGroup(state.selectedGroup || '');
  };

  const handleSubmit = () => {
    if (!content.trim()) {
      toast({
        title: "Empty post",
        description: "Please write something before posting.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedGroup) {
      toast({
        title: "Select a group",
        description: "Please choose a group for your post.",
        variant: "destructive",
      });
      return;
    }

    if (!state.user) {
      toast({
        title: "Not logged in",
        description: "Please log in to create posts.",
        variant: "destructive",
      });
      return;
    }

    dispatch({
      type: 'ADD_POST',
      payload: {
        username: state.user.username,
        content: content.trim(),
        groupId: selectedGroup,
      },
    });

    toast({
      title: "Post created!",
      description: "Your post has been shared with the community.",
    });
    
    handleClose();
  };

  return (
    <Dialog open={state.isCreatePostOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Create New Post
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Group Selection */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Choose Group
            </label>
            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
              <SelectTrigger>
                <SelectValue placeholder="Select a group..." />
              </SelectTrigger>
              <SelectContent>
                {state.groups.map((group) => (
                  <SelectItem key={group.id} value={group.id}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Content Input */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              What's on your mind?
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts about cars, experiences, or ask questions..."
              rows={4}
              className="resize-none"
              maxLength={500}
            />
            <div className="text-xs text-muted-foreground mt-1 text-right">
              {content.length}/500
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              className="bg-car-accent hover:bg-car-accent/90 text-white"
              disabled={!content.trim() || !selectedGroup}
            >
              Post
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}