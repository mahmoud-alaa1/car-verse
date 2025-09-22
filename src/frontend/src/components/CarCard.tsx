import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car as CarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Car } from '@/contexts/AppContext';

interface CarCardProps {
  car: Car;
}

export const CarCard = memo(({ car }: CarCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/cars/${car.id}`);
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-foreground">
            {car.name}
          </CardTitle>
          <CarIcon className="w-5 h-5 text-car-accent" />
        </div>
        <p className="text-sm text-muted-foreground">{car.model}</p>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary">{car.year}</Badge>
          <Badge variant="outline">{car.type}</Badge>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Engine:</span>
            <span className="text-foreground font-medium">{car.engine}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Power:</span>
            <span className="text-foreground font-medium">{car.horsepower} HP</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {car.description}
        </p>
      </CardContent>
    </Card>
  );
});

CarCard.displayName = 'CarCard';