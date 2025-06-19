
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const WelcomeBanner = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <CardContent className="p-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome Dashboard
        </h1>
        <p className="text-blue-100 text-lg">
          Manage your laboratory equipment bookings efficiently
        </p>
      </CardContent>
    </Card>
  );
};
