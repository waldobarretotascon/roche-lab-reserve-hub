import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { supabase } from '@/integrations/supabase/client';

const NewBooking = () => {
  const [equipmentId, setEquipmentId] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dayBooked, setDayBooked] = useState('');
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');
  const [siteNames, setSiteNames] = useState<string[]>([]);
  const [equipmentCategories, setEquipmentCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchRocheData = async () => {
      const { data, error } = await supabase.from('roche').select('siteName, equipmentCategory');
      console.log('Supabase roche data:', data, 'Error:', error);
      if (!error && data) {
        setSiteNames(Array.from(new Set(data.map((row: any) => row.siteName).filter(Boolean))));
        setEquipmentCategories(Array.from(new Set(data.map((row: any) => row.equipmentCategory).filter(Boolean))));
      }
    };
    fetchRocheData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      setMessage('You must be logged in to book.');
      return;
    }
    if (!location || !equipmentId) {
      setMessage('Location and Equipment are required.');
      return;
    }
    const { error } = await supabase.from('bookings').insert([
      {
        equipment_id: equipmentId,
        user_id: user.id,
        start_date: startDate,
        end_date: endDate,
        day_booked: dayBooked,
        note: note,
        location: location,
      },
    ]);
    if (error) {
      setMessage('Booking failed: ' + error.message);
    } else {
      setMessage('Thank you for your reservation!');
      setEquipmentId('');
      setLocation('');
      setStartDate('');
      setEndDate('');
      setDayBooked('');
      setNote('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="bg-gray-300 py-12 text-center">
        <h1 className="text-5xl font-bold text-white mb-2">Create a New Booking</h1>
        <p className="text-xl text-white">Reserve lab equipment quickly to ensure availability.</p>
      </div>
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto mt-8 p-8 bg-white rounded shadow flex flex-col space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block mb-2 font-medium">Equipment</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={equipmentId}
              onChange={e => setEquipmentId(e.target.value)}
              required
            >
              <option value="" disabled>Select equipment</option>
              {equipmentCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Location</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={location}
              onChange={e => setLocation(e.target.value)}
              required
            >
              <option value="" disabled>Select location</option>
              {siteNames.map((site) => (
                <option key={site} value={site}>{site}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Start Date</label>
            <input type="date" className="w-full border rounded px-3 py-2" value={startDate} onChange={e => setStartDate(e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">End Date</label>
            <input type="date" className="w-full border rounded px-3 py-2" value={endDate} onChange={e => setEndDate(e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 font-medium">Day Booked</label>
            <input type="date" className="w-full border rounded px-3 py-2" value={dayBooked} onChange={e => setDayBooked(e.target.value)} />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block mb-2 font-medium">Note</label>
            <textarea className="w-full border rounded px-3 py-2" value={note} onChange={e => setNote(e.target.value)} placeholder="Optional note..." />
          </div>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700">Submit Booking</button>
        {message && <div className="text-center text-lg font-semibold text-green-700 bg-green-100 border border-green-300 rounded p-4 mt-4">{message}</div>}
      </form>
    </div>
  );
};

export default NewBooking; 