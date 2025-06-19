
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
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recently Used Equipment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {equipment.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Settings className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.model} • Last used {item.lastUsed}</p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                </div>
              </div>
            </div>
            <Button 
              size="sm" 
              variant={item.available ? "default" : "secondary"}
              disabled={!item.available}
            >
              {item.available ? 'Book Again' : 'Unavailable'}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
