import React, { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const CarMascot = memo(() => {
  return (
    <aside className="w-64 p-4 hidden lg:block">
      <Card className="sticky top-4">
        <CardContent className="p-6">
          {/* ASCII Art Car */}
          <div className="text-center mb-4">
            <pre className="text-xs font-mono text-muted-foreground leading-tight">
{`     ______
    /|_||_\\
   (   o    )
    > _-_ <
   /       \\
  (_)     (_)`}
            </pre>
          </div>
          
          <div className="text-center">
            <h3 className="font-bold text-foreground mb-2">CarBot</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your friendly car community guide!
            </p>
            
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="bg-muted p-2 rounded">
                💡 <strong>Tip:</strong> Join specific groups to connect with enthusiasts who share your interests!
              </div>
              
              <div className="bg-muted p-2 rounded">
                🚗 <strong>Today:</strong> {Math.floor(Math.random() * 1000 + 500)} active members online
              </div>
              
              <div className="bg-muted p-2 rounded">
                ⚡ <strong>Trending:</strong> Electric vehicle discussions are up 45% this week!
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
});

CarMascot.displayName = 'CarMascot';