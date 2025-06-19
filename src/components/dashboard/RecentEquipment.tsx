
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Star } from 'lucide-react';

export const RecentEquipment = () => {
  const equipment = [
    {
      id: 1,
      name: 'PCR Thermal Cycler',
      model: 'TC-5000',
      lastUsed: '2 days ago',
      rating: 4.8,
      available: true
    },
    {
      id: 2,
      name: 'Flow Cytometer',
      model: 'FC-Pro 200',
      lastUsed: '1 week ago', 
      rating: 4.6,
      available: false
    },
    {
      id: 3,
      name: 'Spectrophotometer',
      model: 'SP-UV 300',
      lastUsed: '3 days ago',
      rating: 4.9,
      available: true
    },
    {
      id: 4,
      name: 'Centrifuge',
      model: 'CF-X1000',
      lastUsed: '5 days ago',
      rating: 4.7,
      available: true
    }
  ];

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Recently Used Equipment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {equipment.map((item) => (
          <div key={item.id} className="p-4 bg-gray-50 rounded-lg border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Settings className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-500">{item.model} • Last used {item.lastUsed}</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600 ml-1">{item.rating}</span>
                  </div>
                </div>
              </div>
              <Button 
                size="sm" 
                variant={item.available ? "default" : "secondary"}
                disabled={!item.available}
                className="text-xs px-3 py-1 h-7"
              >
                {item.available ? 'Book Again' : 'Unavailable'}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
