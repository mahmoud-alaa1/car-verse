import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Plus, Calendar, Wrench, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';

export const CarList: React.FC = () => {
  const { state } = useApp();

  useEffect(() => {
    // Enable dark mode by default
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-page bg-pattern">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground">Car Community</h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Discover amazing cars from enthusiasts around the world
              </p>
            </div>
            
            <Link to="/car-info">
              <Button className="gradient-primary hover:scale-105 transition-all duration-300">
                <Plus className="w-4 h-4 mr-2" />
                Add Your Car
              </Button>
            </Link>
          </div>

          {/* Cars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {state.cars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link to={`/car/${car.id}`}>
                  <Card className="glass border-border/30 backdrop-blur-xl h-full hover:scale-105 transition-all duration-300 cursor-pointer group">
                    {/* Car Image Placeholder */}
                    <div className="w-full h-48 rounded-t-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-b border-border/30 relative overflow-hidden">
                      <div className="text-center">
                        <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground">Car Image</p>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="text-xs">
                          {car.mods.length} mods
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowRight className="w-5 h-5 text-primary" />
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                            {car.year} {car.make} {car.model}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            by {car.owner}
                          </p>
                        </div>

                        {/* Modifications Preview */}
                        {car.mods.length > 0 && (
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <Wrench className="w-4 h-4 text-muted-foreground" />
                              <span className="text-xs font-medium text-muted-foreground">Modifications</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {car.mods.slice(0, 2).map((mod, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {mod}
                                </Badge>
                              ))}
                              {car.mods.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{car.mods.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t border-border/30">
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{car.year}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Click to view details
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {state.cars.length === 0 && (
            <Card className="glass border-border/30 backdrop-blur-xl">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No Cars Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Be the first to add a car to the community!
                </p>
                <Link to="/car-info">
                  <Button className="gradient-primary hover:scale-105 transition-all duration-300">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Car
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CarList;
