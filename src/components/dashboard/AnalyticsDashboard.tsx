import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import jsPDF from 'jspdf';
import Papa from 'papaparse';

const FILTERS = {
  dateRange: ['Last 7 days', 'Last 30 days', 'This year'],
  userOrTeam: ['All', 'User', 'Team'],
  equipment: ['All'], // Will be populated from Supabase
  location: ['All'], // Will be populated from Supabase
};

export const AnalyticsDashboard = () => {
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [equipmentOptions, setEquipmentOptions] = useState<string[]>([]);
  const [locationOptions, setLocationOptions] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    dateRange: FILTERS.dateRange[0],
    userOrTeam: FILTERS.userOrTeam[0],
    equipment: 'All',
    location: 'All',
  });
  const [metrics, setMetrics] = useState({
    totalBookings: 0,
    avgBookingTime: 0,
    cancellations: 0,
    cancellationsPercent: 0,
    activeUsers: 0,
  });
  const [bookingsOverTime, setBookingsOverTime] = useState<any[]>([]);
  // Add more state for other charts as needed

  useEffect(() => {
    const fetchProfileAndOptions = async () => {
      setLoading(true);
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return;
      // Fetch profile (including siteName)
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(profile);
      // Fetch equipment and location options
      const { data: rocheData } = await supabase.from('roche').select('equipment, location');
      if (rocheData) {
        setEquipmentOptions(['All', ...Array.from(new Set(rocheData.map((r: any) => r.equipment)).values())]);
        setLocationOptions(['All', ...Array.from(new Set(rocheData.map((r: any) => r.location)).values())]);
      }
      // If lab manager, auto-set location filter to their sitename
      if (profile?.role === 'lab manager' && profile.sitename) {
        setFilters(f => ({ ...f, location: profile.sitename }));
      }
      setLoading(false);
    };
    fetchProfileAndOptions();
  }, []);

  useEffect(() => {
    if (!profile) return;
    const fetchAnalytics = async () => {
      setLoading(true);
      let query = supabase.from('bookings').select('*');
      // Apply location filter only once
      if (profile.role === 'lab manager' && profile.sitename) {
        query = query.eq('location', profile.sitename);
      } else if (filters.location !== 'All') {
        query = query.eq('location', filters.location);
      }
      // Apply equipment filter if needed
      if (filters.equipment !== 'All') {
        query = query.eq('equipment_id', filters.equipment);
      }
      const { data: bookings, error } = await query;
      if (error || !bookings) {
        setLoading(false);
        return;
      }
      // Debug log
      console.log('Role:', profile.role, 'sitename:', profile.sitename, 'Bookings locations:', (bookings as any[]).map(b => b.location));
      const totalBookings = (bookings as any[]).length;
      let avgBookingTime = 0;
      if ((bookings as any[]).length > 0) {
        const totalMinutes = (bookings as any[]).reduce((sum, b) => {
          const start = b.start_date ? new Date(b.start_date) : null;
          const end = b.end_date ? new Date(b.end_date) : null;
          if (start && end) {
            return sum + Math.round((end.getTime() - start.getTime()) / 60000);
          }
          return sum;
        }, 0);
        avgBookingTime = Math.round(totalMinutes / (bookings as any[]).length);
      }
      const cancellations = (bookings as any[]).filter(b => b.status === 'cancelled').length;
      const cancellationsPercent = totalBookings > 0 ? Math.round((cancellations / totalBookings) * 100) : 0;
      const activeUsers = new Set((bookings as any[]).map(b => b.user_id)).size;
      const bookingsByDay: Record<string, number> = {};
      (bookings as any[]).forEach(b => {
        if (b.day_booked) {
          bookingsByDay[b.day_booked] = (bookingsByDay[b.day_booked] || 0) + 1;
        }
      });
      const bookingsOverTime = Object.entries(bookingsByDay).map(([date, bookings]) => ({ date, bookings }));
      setMetrics({
        totalBookings,
        avgBookingTime,
        cancellations,
        cancellationsPercent,
        activeUsers,
      });
      setBookingsOverTime(bookingsOverTime);
      setLoading(false);
    };
    fetchAnalytics();
  }, [filters, profile]);

  const handleExport = (type: 'csv' | 'pdf') => {
    // Example: Export bookingsOverTime
    if (type === 'csv') {
      const csv = Papa.unparse(bookingsOverTime);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } else if (type === 'pdf') {
      const doc = new jsPDF();
      doc.text('Lab Bookings Overview', 10, 10);
      bookingsOverTime.forEach((row, i) => {
        doc.text(`${row.date}: ${row.bookings} bookings`, 10, 20 + i * 10);
      });
      doc.save('report.pdf');
    }
  };

  if (loading) return <div>Loading analytics...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-wrap gap-4 mb-4">
        <select value={filters.dateRange} onChange={e => setFilters(f => ({ ...f, dateRange: e.target.value }))}>
          {FILTERS.dateRange.map(opt => <option key={opt}>{opt}</option>)}
        </select>
        <select value={filters.userOrTeam} onChange={e => setFilters(f => ({ ...f, userOrTeam: e.target.value }))}>
          {FILTERS.userOrTeam.map(opt => <option key={opt}>{opt}</option>)}
        </select>
        <select value={filters.equipment} onChange={e => setFilters(f => ({ ...f, equipment: e.target.value }))}>
          {equipmentOptions.map(opt => <option key={opt}>{opt}</option>)}
        </select>
        <select
          value={filters.location}
          onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}
          disabled={profile?.role === 'lab manager'}
        >
          {locationOptions.map(opt => <option key={opt}>{opt}</option>)}
        </select>
        <button className="ml-auto bg-blue-600 text-white px-4 py-2 rounded" onClick={() => handleExport('csv')}>Export CSV</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => handleExport('pdf')}>Export PDF</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-100 rounded p-4 text-center">
          <div className="text-2xl font-bold">{metrics.totalBookings}</div>
          <div className="text-gray-600">Total bookings</div>
        </div>
        <div className="bg-gray-100 rounded p-4 text-center">
          <div className="text-2xl font-bold">{(metrics.avgBookingTime / 60).toFixed(0)} h {metrics.avgBookingTime % 60} min</div>
          <div className="text-gray-600">Average booking time</div>
        </div>
        <div className="bg-gray-100 rounded p-4 text-center">
          <div className="text-2xl font-bold">{metrics.cancellations} ({metrics.cancellationsPercent}%)</div>
          <div className="text-gray-600">Cancellations</div>
        </div>
        <div className="bg-gray-100 rounded p-4 text-center">
          <div className="text-2xl font-bold">{metrics.activeUsers}</div>
          <div className="text-gray-600">Active users</div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="font-semibold mb-2">Bookings over time</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={bookingsOverTime}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="bookings" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Add more charts here as needed */}
    </div>
  );
}; 