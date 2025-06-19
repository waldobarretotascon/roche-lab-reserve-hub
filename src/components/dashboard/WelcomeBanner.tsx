
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, CheckCircle } from 'lucide-react';

export const WelcomeBanner = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome back, Dr. Smith
            </h1>
            <p className="text-blue-100 text-lg">
              You have 3 upcoming reservations today
            </p>
          </div>
          
          <div className="flex space-x-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Calendar className="h-5 w-5 mr-1" />
                <span className="text-2xl font-bold">5</span>
              </div>
              <p className="text-sm text-blue-100">Active Bookings</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Clock className="h-5 w-5 mr-1" />
                <span className="text-2xl font-bold">12</span>
              </div>
              <p className="text-sm text-blue-100">Hours This Week</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <CheckCircle className="h-5 w-5 mr-1" />
                <span className="text-2xl font-bold">98%</span>
              </div>
              <p className="text-sm text-blue-100">Completion Rate</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
