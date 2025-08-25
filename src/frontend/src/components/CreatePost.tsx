import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Send } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const CreatePost: React.FC = () => {
  const { state, dispatch } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('sports');
  const [author, setAuthor] = useState('Anonymous');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) return;

    dispatch({
      type: 'ADD_POST',
      payload: {
        title: title.trim(),
        content: content.trim(),
        author: author.trim() || 'Anonymous',
        group: selectedGroup,
      },
    });

    // Reset form
    setTitle('');
    setContent('');
    setIsExpanded(false);
  };

  return (
    <Card className="glass-card mb-6 card-glow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <PlusCircle className="w-5 h-5 text-primary" />
          Share Your Car Story
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {!isExpanded ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="cursor-pointer"
            onClick={() => setIsExpanded(true)}
          >
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <PlusCircle className="w-5 h-5 text-primary" />
              </div>
              <span className="text-muted-foreground">What's happening in your garage?</span>
            </div>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="flex gap-3">
              <Input
                placeholder="Your username"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="flex-1"
              />
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select group" />
                </SelectTrigger>
                <SelectContent>
                  {state.groups.filter(g => g.id !== 'all').map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      <span className="flex items-center gap-2">
                        {group.icon} {group.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Input
              placeholder="Post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-medium"
            />
            
            <Textarea
              placeholder="Share your thoughts, experiences, or questions about cars..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px] resize-none"
            />
            
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={!title.trim() || !content.trim()}
                variant="premium"
                size="lg"
                className="flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Post
              </Button>
              <Button
                type="button"
                variant="glass"
                onClick={() => setIsExpanded(false)}
              >
                Cancel
              </Button>
            </div>
          </motion.form>
        )}
      </CardContent>
    </Card>
  );
};