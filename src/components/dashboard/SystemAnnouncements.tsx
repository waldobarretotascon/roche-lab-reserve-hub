
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, AlertTriangle, CheckCircle } from 'lucide-react';

export const SystemAnnouncements = () => {
  const announcements = [
    {
      id: 1,
      type: 'maintenance',
      title: 'Scheduled Maintenance',
      message: 'Flow Cytometer in Lab B-101 will be offline for maintenance on Dec 20, 2024 from 9:00 AM - 12:00 PM.',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'success',
      title: 'New Equipment Available',
      message: 'The new Automated Liquid Handler is now available for booking in Lab C-305.',
      timestamp: '1 day ago'
    },
    {
      id: 3,
      type: 'info',
      title: 'System Update',
      message: 'The booking system will receive updates tonight at 11:00 PM. No service interruption expected.',
      timestamp: '2 days ago'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'maintenance':
        return <AlertTriangle className="h-4 w-4" />;
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getVariant = (type: string) => {
    switch (type) {
      case 'maintenance':
        return 'destructive' as const;
      case 'success':
        return 'default' as const;
      default:
        return 'default' as const;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">System Announcements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {announcements.map((announcement) => (
          <Alert key={announcement.id} variant={getVariant(announcement.type)} className="border">
            {getIcon(announcement.type)}
            <AlertDescription>
              <div className="flex justify-between items-start">
                <div>
                  <strong className="text-sm">{announcement.title}</strong>
                  <p className="mt-1 text-sm">{announcement.message}</p>
                </div>
                <span className="text-xs text-gray-500 ml-4 whitespace-nowrap">
                  {announcement.timestamp}
                </span>
              </div>
            </AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
};
