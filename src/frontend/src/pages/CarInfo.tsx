import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Zap, Settings, Gauge } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { useApp } from '@/contexts/AppContext';

const CarInfo = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  const car = state.cars.find(c => c.id === carId);

  useEffect(() => {
    if (carId) {
      dispatch({ type: 'SET_SELECTED_CAR', payload: carId });
    }
    
    return () => {
      dispatch({ type: 'SET_SELECTED_CAR', payload: null });
    };
  }, [carId, dispatch]);

  if (!car) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 max-w-4xl mx-auto p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Car not found
              </h3>
              <p className="text-muted-foreground mb-4">
                The car you're looking for doesn't exist.
              </p>
              <Button onClick={() => navigate('/cars')} variant="outline">
                Back to Cars
              </Button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 max-w-4xl mx-auto p-6">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/cars')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cars
          </Button>

          {/* Car Header */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl text-foreground mb-2">
                    {car.name}
                  </CardTitle>
                  <p className="text-xl text-muted-foreground">{car.model}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="secondary">{car.year}</Badge>
                    <Badge variant="outline">{car.type}</Badge>
                  </div>
                </div>
                
                {/* Car ASCII Art */}
                <div className="hidden md:block text-car-accent font-mono text-sm leading-tight">
                  <pre>{`    ____
  /|_||_\`\`.
 (   _    _ _\\
=\`-(_)--(_)-'`}</pre>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Car Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-car-accent" />
                  <span>Engine Specifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Engine Type:</span>
                  <span className="font-medium text-foreground">{car.engine}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Horsepower:</span>
                  <span className="font-medium text-foreground">{car.horsepower} HP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vehicle Type:</span>
                  <span className="font-medium text-foreground">{car.type}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gauge className="w-5 h-5 text-car-accent" />
                  <span>Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Model Year:</span>
                  <span className="font-medium text-foreground">{car.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Power Output:</span>
                  <span className="font-medium text-foreground">{car.horsepower} HP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium text-foreground">{car.type}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About the {car.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {car.description}
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default CarInfo;