import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Car, Plus, Settings, Calendar, Wrench, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { toast } from 'sonner';

export const CarManagement: React.FC = () => {
  const { state, dispatch } = useApp();
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
  const [carForm, setCarForm] = useState({
    make: '',
    model: '',
    year: '',
    mods: '',
    description: '',
    imageUrl: '/placeholder-car.jpg',
  });

  useEffect(() => {
    // Enable dark mode by default
    document.documentElement.classList.add('dark');
  }, []);

  const handleAddCar = () => {
    if (carForm.make.trim() && carForm.model.trim() && carForm.year.trim() && carForm.description.trim()) {
      const modsArray = carForm.mods
        .split(',')
        .map(mod => mod.trim())
        .filter(mod => mod.length > 0);

      dispatch({
        type: 'ADD_CAR',
        payload: {
          make: carForm.make,
          model: carForm.model,
          year: parseInt(carForm.year),
          mods: modsArray,
          description: carForm.description,
          imageUrl: carForm.imageUrl,
          owner: state.currentUser?.username || 'Unknown',
        },
      });

      // Reset form
      setCarForm({
        make: '',
        model: '',
        year: '',
        mods: '',
        description: '',
        imageUrl: '/placeholder-car.jpg',
      });

      setIsAddCarModalOpen(false);
      toast.success('Car added successfully!');
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const userCars = state.cars.filter(car => car.owner === state.currentUser?.username);

  return (
    <div className="min-h-screen bg-gradient-page bg-pattern">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Cars</h1>
              <p className="text-muted-foreground mt-1">
                Manage your car collection and modifications
              </p>
            </div>
            
            <Dialog open={isAddCarModalOpen} onOpenChange={setIsAddCarModalOpen}>
              <DialogTrigger asChild>
                <Button className="gradient-primary hover:scale-105 transition-all duration-300">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Car
                </Button>
              </DialogTrigger>
              <DialogContent className="glass border-border/30 backdrop-blur-xl max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Car</DialogTitle>
                  <DialogDescription>
                    Add a new car to your collection
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="make">Make *</Label>
                      <Input
                        id="make"
                        value={carForm.make}
                        onChange={(e) => setCarForm({ ...carForm, make: e.target.value })}
                        placeholder="e.g., Porsche"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="model">Model *</Label>
                      <Input
                        id="model"
                        value={carForm.model}
                        onChange={(e) => setCarForm({ ...carForm, model: e.target.value })}
                        placeholder="e.g., 911"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="year">Year *</Label>
                    <Input
                      id="year"
                      type="number"
                      value={carForm.year}
                      onChange={(e) => setCarForm({ ...carForm, year: e.target.value })}
                      placeholder="e.g., 2023"
                      min="1900"
                      max="2030"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={carForm.description}
                      onChange={(e) => setCarForm({ ...carForm, description: e.target.value })}
                      placeholder="Tell us about your car..."
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="mods">Modifications</Label>
                    <Textarea
                      id="mods"
                      value={carForm.mods}
                      onChange={(e) => setCarForm({ ...carForm, mods: e.target.value })}
                      placeholder="e.g., Sport Exhaust, Carbon Fiber Wheels, Lowered Suspension"
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Separate modifications with commas
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleAddCar} className="flex-1">
                      Add Car
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddCarModalOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Cars Grid */}
          {userCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userCars.map(car => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="glass border-border/30 backdrop-blur-xl h-full hover:scale-105 transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                          <Car className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {car.mods.length} mods
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">
                            {car.year} {car.make} {car.model}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Added to your collection
                          </p>
                        </div>

                        {/* Car Image Placeholder */}
                        <div className="w-full h-32 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-border/30">
                          <div className="text-center">
                            <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground">Car Image</p>
                          </div>
                        </div>

                        {/* Modifications */}
                        {car.mods.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                              <Wrench className="w-4 h-4 mr-1" />
                              Modifications
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {car.mods.map((mod, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {mod}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t border-border/30">
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{car.year}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="glass border-border/30 backdrop-blur-xl">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No Cars Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start building your car collection by adding your first vehicle
                </p>
                <Button 
                  onClick={() => setIsAddCarModalOpen(true)}
                  className="gradient-primary hover:scale-105 transition-all duration-300"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Car
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CarManagement;
