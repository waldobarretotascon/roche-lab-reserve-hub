
import React from 'react';
import { WelcomeBanner } from './WelcomeBanner';
import { QuickActions } from './QuickActions';
import { UpcomingBookings } from './UpcomingBookings';
import { RecentEquipment } from './RecentEquipment';
import { SystemAnnouncements } from './SystemAnnouncements';

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <WelcomeBanner />
      <QuickActions />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingBookings />
        <RecentEquipment />
      </div>
      
      <SystemAnnouncements />
    </div>
  );
};
