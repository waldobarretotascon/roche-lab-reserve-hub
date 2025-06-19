
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, AlertTriangle, Calendar } from 'lucide-react';

export const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-6 w-6" />
            <span className="text-sm">New Booking</span>
          </Button>
          
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
            <Search className="h-6 w-6" />
            <span className="text-sm">Find Equipment</span>
          </Button>
          
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
            <Calendar className="h-6 w-6" />
            <span className="text-sm">View Calendar</span>
          </Button>
          
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
            <AlertTriangle className="h-6 w-6" />
            <span className="text-sm">Report Issue</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
