import React, { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { CreatePost } from '@/components/CreatePost';
import { PostList } from '@/components/PostList';

export const Home: React.FC = () => {
  useEffect(() => {
    // Enable dark mode by default for the enhanced design
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-page bg-pattern">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto">
          <CreatePost />
          <PostList />
        </main>
      </div>
    </div>
  );
};

export default Home;