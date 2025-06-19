
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Settings } from 'lucide-react';

export const UpcomingBookings = () => {
  const bookings = [
    {
      id: 1,
      equipment: 'PCR Thermal Cycler',
      location: 'Lab A-205',
      time: '10:00 AM - 12:00 PM',
      date: 'Today',
      status: 'confirmed'
    },
    {
      id: 2,
      equipment: 'Flow Cytometer',
      location: 'Lab B-101',
      time: '2:30 PM - 4:30 PM',
      date: 'Today',
      status: 'confirmed'
    },
    {
      id: 3,
      equipment: 'Spectrophotometer',
      location: 'Lab A-203',
      time: '9:00 AM - 11:00 AM',
      date: 'Tomorrow',
      status: 'pending'
    },
    {
      id: 4,
      equipment: 'Microscope',
      location: 'Lab C-102',
      time: '1:00 PM - 3:00 PM',
      date: 'Tomorrow',
      status: 'confirmed'
    }
  ];

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          Upcoming Bookings
          <Badge variant="secondary" className="ml-2">{bookings.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {bookings.map((booking) => (
          <div key={booking.id} className="p-4 bg-gray-50 rounded-lg border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Settings className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">{booking.equipment}</h4>
                  <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {booking.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {booking.location}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Badge 
                  variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                  className={`text-xs ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : ''}`}
                >
                  {booking.status}
                </Badge>
                <p className="text-xs text-gray-500 mt-1">{booking.date}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
