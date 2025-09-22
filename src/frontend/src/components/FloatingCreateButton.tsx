import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

export function FloatingCreateButton() {
  const { state, dispatch } = useApp();
  const { toast } = useToast();

  const handleClick = () => {
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

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-car-accent hover:bg-car-accent/90 text-white shadow-lg hover:shadow-xl transition-all z-50"
      size="icon"
    >
      <Plus className="w-6 h-6" />
    </Button>
  );
}