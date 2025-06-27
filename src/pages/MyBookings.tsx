import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { supabase } from '@/integrations/supabase/client';

const MyBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data: userData } = await supabase.auth.getUser();
      setUser(userData.user);
      if (userData.user) {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', userData.user.id)
          .order('start_date', { ascending: false });
        if (!error && data) setBookings(data);
      }
      setLoading(false);
    };
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 pt-4">
        <button
          onClick={() => { window.location.href = '/'; }}
          className="inline-block bg-white border border-gray-300 rounded px-4 py-2 text-blue-600 font-semibold shadow hover:bg-blue-50 transition mb-4"
        >
          &larr; Home
        </button>
      </div>
      <div className="bg-[#eaf6ff] py-12 text-center border-b border-blue-200">
        <h1 className="text-4xl font-bold mb-2 text-black">My Bookings</h1>
        <p className="text-lg text-gray-700">View all your equipment bookings below.</p>
      </div>
      <div className="max-w-5xl mx-auto mt-12 bg-white p-8 rounded shadow">
        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center text-gray-600">You have no bookings.</div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Equipment</th>
                <th className="p-2 border">Location</th>
                <th className="p-2 border">Start Date</th>
                <th className="p-2 border">End Date</th>
                <th className="p-2 border">Day Booked</th>
                <th className="p-2 border">Note</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.booking_id} className="text-center">
                  <td className="p-2 border">{booking.equipment_id || booking.equipment || '-'}</td>
                  <td className="p-2 border">{booking.location || '-'}</td>
                  <td className="p-2 border">{booking.start_date}</td>
                  <td className="p-2 border">{booking.end_date}</td>
                  <td className="p-2 border">{booking.day_booked}</td>
                  <td className="p-2 border">{booking.note || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyBookings; 