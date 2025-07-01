import React from 'react';
import { WelcomeBanner } from './WelcomeBanner';
import { QuickActions } from './QuickActions';
import { UpcomingBookings } from './UpcomingBookings';
import { RecentEquipment } from './RecentEquipment';
import { SystemAnnouncements } from './SystemAnnouncements';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <WelcomeBanner />
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">I want to...</h2>
        <div className="flex flex-row gap-6 overflow-x-auto">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center min-w-[260px] max-w-xs w-full">
            <img src="/new-booking.png" alt="Create a new booking" className="w-full object-contain rounded mb-4" style={{ maxHeight: 180 }} />
            <h3 className="font-bold text-lg mb-2">Create a new booking</h3>
            <p className="text-gray-600 text-center mb-4">Reserve lab equipment quickly to ensure availability.</p>
            <Link to="/new-booking" className="text-blue-600 font-medium">Book Now</Link>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center min-w-[260px] max-w-xs w-full">
            <img src="/manage-bookings.png" alt="Manage my bookings" className="w-full object-contain rounded mb-4" style={{ maxHeight: 180 }} />
            <h3 className="font-bold text-lg mb-2">Manage my bookings</h3>
            <p className="text-gray-600 text-center mb-4">View, edit or cancel your existing bookings with just a few clicks.</p>
            <Link to="/my-bookings" className="text-blue-600 font-medium">My Bookings</Link>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center min-w-[260px] max-w-xs w-full">
            <img src="/report-issue.png" alt="Report an issue" className="w-full object-contain rounded mb-4" style={{ maxHeight: 180 }} />
            <h3 className="font-bold text-lg mb-2">Report an issue</h3>
            <p className="text-gray-600 text-center mb-4">Notify us about any problems with equipment in the lab.</p>
            <Link to="/report-issue" className="text-blue-600 font-medium">Report Issue</Link>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center min-w-[260px] max-w-xs w-full">
            <img src="/Analytics.png" alt="Analytics" className="w-full object-contain rounded mb-4" style={{ maxHeight: 180 }} />
            <h3 className="font-bold text-lg mb-2">Analytics</h3>
            <p className="text-gray-600 text-center mb-4">View equipment usage trends and lab analytics.</p>
            <Link to="/analytics" className="text-blue-600 font-medium">Go to Analytics</Link>
          </div>
        </div>
      </section>
    </div>
  );
};
