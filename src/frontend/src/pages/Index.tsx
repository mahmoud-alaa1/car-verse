import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { PostFeed } from '@/components/PostFeed';
import { CarMascot } from '@/components/CarMascot';
import { CreatePostModal } from '@/components/CreatePostModal';
import { FloatingCreateButton } from '@/components/FloatingCreateButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        <PostFeed />
        <CarMascot />
      </div>

      <CreatePostModal />
      <FloatingCreateButton />
    </div>
  );
};

export default Index;
