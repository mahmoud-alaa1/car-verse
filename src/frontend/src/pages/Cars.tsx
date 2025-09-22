import React from 'react';
import { Car } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { CarCard } from '@/components/CarCard';
import { useApp } from '@/contexts/AppContext';

const Cars = () => {
  const { state } = useApp();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 max-w-6xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-6">
            <Car className="w-8 h-8 text-car-accent" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Cars</h1>
              <p className="text-muted-foreground">
                Discover amazing vehicles from the community
              </p>
            </div>
          </div>

          {/* Cars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          {/* Empty State (if needed) */}
          {state.cars.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No cars available
              </h3>
              <p className="text-muted-foreground">
                Check back later for new car listings!
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Cars;