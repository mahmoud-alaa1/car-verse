import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Edit, Car, Calendar, MapPin, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useApp } from '@/context/AppContext';
import { PostCard } from '@/components/PostCard';
import { Navbar } from '@/components/Navbar';
import { toast } from 'sonner';

export const Profile: React.FC = () => {
  const { state, dispatch } = useApp();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    bio: '',
  });

  useEffect(() => {
    // Enable dark mode by default
    document.documentElement.classList.add('dark');
    
    // Initialize edit form with current user data
    if (state.currentUser) {
      setEditForm({
        username: state.currentUser.username,
        bio: state.currentUser.bio,
      });
    }
  }, [state.currentUser]);

  // Filter posts by current user
  const userPosts = state.posts.filter(post => post.author === state.currentUser?.username);

  const handleEditProfile = () => {
    if (editForm.username.trim() && editForm.bio.trim()) {
      dispatch({
        type: 'UPDATE_USER',
        payload: {
          username: editForm.username,
          bio: editForm.bio,
        },
      });
      setIsEditModalOpen(false);
      toast.success('Profile updated successfully!');
    } else {
      toast.error('Please fill in all fields');
    }
  };

  if (!state.currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-page bg-pattern">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Profile Header */}
          <Card className="glass border-border/30 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={state.currentUser.avatarUrl} alt={state.currentUser.username} />
                  <AvatarFallback className="text-2xl bg-gradient-primary">
                    {state.currentUser.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground">{state.currentUser.username}</h1>
                      <p className="text-muted-foreground mt-1">Car Enthusiast</p>
                    </div>
                    
                    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex items-center space-x-2">
                          <Edit className="w-4 h-4" />
                          <span>Edit Profile</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="glass border-border/30 backdrop-blur-xl">
                        <DialogHeader>
                          <DialogTitle>Edit Profile</DialogTitle>
                          <DialogDescription>
                            Update your profile information
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="username">Username</Label>
                            <Input
                              id="username"
                              value={editForm.username}
                              onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                              placeholder="Enter username"
                            />
                          </div>
                          <div>
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                              id="bio"
                              value={editForm.bio}
                              onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                              placeholder="Tell us about yourself"
                              rows={4}
                            />
                          </div>
                          <div className="flex space-x-2">
                            <Button onClick={handleEditProfile} className="flex-1">
                              Save Changes
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => setIsEditModalOpen(false)}
                              className="flex-1"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  <p className="text-foreground/80 leading-relaxed">{state.currentUser.bio}</p>
                  
                  <div className="flex items-center space-x-6 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Member since 2024</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Car className="w-4 h-4" />
                      <span>{userPosts.length} posts</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User's Cars */}
          <Card className="glass border-border/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Car className="w-5 h-5" />
                <span>My Cars</span>
              </CardTitle>
              <CardDescription>
                Cars owned by {state.currentUser.username}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {state.cars
                  .filter(car => car.owner === state.currentUser?.username)
                  .map(car => (
                    <div key={car.id} className="p-4 rounded-lg border border-border/30 bg-background/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                          <Car className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {car.year} {car.make} {car.model}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {car.mods.length} modifications
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                {state.cars.filter(car => car.owner === state.currentUser?.username).length === 0 && (
                  <p className="text-muted-foreground col-span-full text-center py-8">
                    No cars added yet. Add your first car in the Car Info section!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* User's Posts */}
          <Card className="glass border-border/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>My Posts</span>
              </CardTitle>
              <CardDescription>
                Posts created by {state.currentUser.username}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userPosts.length > 0 ? (
                <div className="space-y-4">
                  {userPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No posts yet. Start sharing your car experiences!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
