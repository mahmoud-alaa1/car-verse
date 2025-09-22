import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { PostItem } from '@/components/PostItem';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { state } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!state.isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in to view your profile.",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [state.isAuthenticated, navigate, toast]);

  // Filter user's posts
  const userPosts = useMemo(() => {
    if (!state.user) return [];
    return state.posts.filter(post => post.username === state.user.username);
  }, [state.posts, state.user]);

  if (!state.isAuthenticated || !state.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 max-w-4xl mx-auto p-6">
          {/* Profile Header */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-car-navy to-car-gray rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {state.user.username[0].toUpperCase()}
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-foreground">
                      {state.user.username}
                    </CardTitle>
                    <p className="text-muted-foreground">Car enthusiast & community member</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined March 2024</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>Location not set</span>
                </div>
              </div>
              
              {/* Stats */}
              <div className="flex items-center space-x-8 mt-4 pt-4 border-t border-border">
                <div className="text-center">
                  <div className="font-semibold text-foreground">{userPosts.length}</div>
                  <div className="text-xs text-muted-foreground">Posts</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-foreground">
                    {userPosts.reduce((acc, post) => acc + post.likes, 0)}
                  </div>
                  <div className="text-xs text-muted-foreground">Likes</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-foreground">
                    {userPosts.reduce((acc, post) => acc + post.comments, 0)}
                  </div>
                  <div className="text-xs text-muted-foreground">Comments</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User's Posts */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Your Posts ({userPosts.length})
            </h2>
            
            {userPosts.length > 0 ? (
              <div className="space-y-4">
                {userPosts.map((post) => (
                  <PostItem key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No posts yet
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Share your first post with the community!
                  </p>
                  <Button
                    onClick={() => navigate('/')}
                    variant="outline"
                  >
                    Create Your First Post
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;