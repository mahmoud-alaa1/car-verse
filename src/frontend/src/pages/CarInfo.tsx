import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Car, 
  ArrowLeft, 
  Calendar, 
  Wrench, 
  User, 
  Image as ImageIcon,
  MapPin,
  Settings,
  Heart,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';

export const CarInfo: React.FC = () => {
  const { carId } = useParams<{ carId: string }>();
  const { state } = useApp();

  useEffect(() => {
    // Enable dark mode by default
    document.documentElement.classList.add('dark');
  }, []);

  // Find the car by ID
  const car = state.cars.find(c => c.id === carId);

  // If car doesn't exist, show not found
  if (!car) {
    return (
      <div className="min-h-screen bg-gradient-page bg-pattern">
        <Navbar />
        <div className="max-w-4xl mx-auto p-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-6">
              <Car className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Car Not Found</h1>
            <p className="text-muted-foreground mb-8 text-lg">
              The car you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/cars">
              <Button className="gradient-primary hover:scale-105 transition-all duration-300">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Cars
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-page bg-pattern">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Back Button */}
          <div className="flex items-center justify-between">
            <Link to="/cars">
              <Button variant="ghost" className="flex items-center space-x-2 hover:scale-105 transition-all duration-300">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Cars</span>
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="hover:scale-105 transition-all duration-300">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:scale-105 transition-all duration-300">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Hero Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="w-full h-80 rounded-2xl bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/10 flex items-center justify-center border border-border/30 relative overflow-hidden">
              <div className="text-center">
                <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Car Image</p>
              </div>
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="text-sm">
                  {car.mods.length} Modifications
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* Car Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title and Owner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">
                      {car.year} {car.make} {car.model}
                    </h1>
                    <div className="flex items-center space-x-4 text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{car.year}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>United States</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Owner Info */}
                <Card className="glass border-border/30 backdrop-blur-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="/placeholder-avatar.jpg" alt={car.owner} />
                        <AvatarFallback className="bg-gradient-primary">
                          {car.owner.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">{car.owner}</h3>
                        <p className="text-sm text-muted-foreground">Car Enthusiast</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="glass border-border/30 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-xl">About This Car</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80 leading-relaxed text-lg">
                      {car.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Modifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="glass border-border/30 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Wrench className="w-5 h-5" />
                      <span>Modifications</span>
                    </CardTitle>
                    <CardDescription>
                      Performance and aesthetic upgrades
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {car.mods.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {car.mods.map((mod, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 p-3 rounded-lg bg-background/50 border border-border/30"
                          >
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <span className="text-foreground">{mod}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No modifications listed</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="glass border-border/30 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-lg">Car Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Make</span>
                      <span className="font-semibold">{car.make}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Model</span>
                      <span className="font-semibold">{car.model}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Year</span>
                      <span className="font-semibold">{car.year}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Modifications</span>
                      <span className="font-semibold">{car.mods.length}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Owner's Other Cars */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card className="glass border-border/30 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-lg">More from {car.owner}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {state.cars
                      .filter(c => c.owner === car.owner && c.id !== car.id)
                      .slice(0, 2)
                      .map(otherCar => (
                        <Link key={otherCar.id} to={`/car/${otherCar.id}`}>
                          <div className="p-3 rounded-lg bg-background/50 border border-border/30 hover:bg-background/70 transition-colors duration-300 mb-3 last:mb-0">
                            <h4 className="font-semibold text-foreground">
                              {otherCar.year} {otherCar.make} {otherCar.model}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {otherCar.mods.length} modifications
                            </p>
                          </div>
                        </Link>
                      ))}
                    {state.cars.filter(c => c.owner === car.owner && c.id !== car.id).length === 0 && (
                      <p className="text-muted-foreground text-sm">No other cars from this owner</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CarInfo;
