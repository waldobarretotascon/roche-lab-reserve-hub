
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
    }
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Upcoming Bookings</CardTitle>
        <Badge variant="secondary">{bookings.length}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Settings className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{booking.equipment}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {booking.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {booking.location}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <Badge 
                variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                className={booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
              >
                {booking.status}
              </Badge>
              <p className="text-sm text-gray-500 mt-1">{booking.date}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
