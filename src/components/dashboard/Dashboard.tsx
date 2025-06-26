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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <img src="/new-booking.png" alt="Create a new booking" className="w-full object-contain rounded mb-4" style={{ maxHeight: 180 }} />
            <h3 className="font-bold text-lg mb-2">Create a new booking</h3>
            <p className="text-gray-600 text-center mb-4">Reserve lab equipment quickly to ensure availability.</p>
            <Link to="/new-booking" className="text-blue-600 font-medium">Book Now</Link>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <img src="/manage-bookings.png" alt="Manage my bookings" className="w-full object-contain rounded mb-4" style={{ maxHeight: 180 }} />
            <h3 className="font-bold text-lg mb-2">Manage my bookings</h3>
            <p className="text-gray-600 text-center mb-4">View, edit or cancel your existing bookings with just a few clicks.</p>
            <a href="#" className="text-blue-600 font-medium">My Bookings</a>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <img src="/report-issue.png" alt="Report an issue" className="w-full object-contain rounded mb-4" style={{ maxHeight: 180 }} />
            <h3 className="font-bold text-lg mb-2">Report an issue</h3>
            <p className="text-gray-600 text-center mb-4">Notify us about any problems with equipment in the lab.</p>
            <Link to="/report-issue" className="text-blue-600 font-medium">Report Issue</Link>
          </div>
        </div>
      </section>
      <footer className="mt-16 border-t pt-6 text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
        <span>Site name</span>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <span>Topic</span>
          <span>Topic</span>
          <span>Topic</span>
        </div>
      </footer>
    </div>
  );
};
