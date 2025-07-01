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
  const [equipmentNetworkData, setEquipmentNetworkData] = useState<{ network: string, count: number }[]>([]);

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
      const { data: rocheData } = await (supabase as any).from('roche').select('equipment, location');
      if (rocheData) {
        const rocheArr = rocheData as any[];
        setEquipmentOptions(['All', ...Array.from(new Set(rocheArr.map(r => String(r.equipment))).values())]);
        setLocationOptions(['All', ...Array.from(new Set(rocheArr.map(r => String(r.location))).values())]);
      }
      // If lab manager, auto-set location filter to their siteName
      if (profile?.role === 'lab manager' && profile.siteName) {
        setFilters(f => ({ ...f, location: profile.siteName }));
      }
      setLoading(false);
    };
    fetchProfileAndOptions();
  }, []);

  useEffect(() => {
    if (!profile) return;
    const fetchAnalytics = async () => {
      setLoading(true);
      let query = (supabase as any).from('bookings').select('*');
      // Apply location filter only once
      if (profile.role === 'lab manager' && profile.siteName) {
        query = query.eq('location', profile.siteName);
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
      console.log('Role:', profile.role, 'sitename:', profile.siteName, 'Bookings locations:', (bookings as any[]).map(b => b.location));
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

  useEffect(() => {
    if (!profile) return;

    const fetchEquipmentNetworkData = async () => {
      let query = (supabase as any).from('roche').select('network, siteName');
      if (profile.role === 'lab manager' && profile.siteName) {
        query = query.eq('siteName', profile.siteName);
      }
      const { data: equipmentData, error } = await query;
      if (error || !equipmentData) {
        setEquipmentNetworkData([]);
        return;
      }
      const networkCounts: Record<string, number> = {};
      (equipmentData as any[]).forEach((item) => {
        const network = item.network || 'Unknown';
        networkCounts[network] = (networkCounts[network] || 0) + 1;
      });
      const chartData = Object.entries(networkCounts).map(([network, count]) => ({
        network,
        count,
      }));
      setEquipmentNetworkData(chartData);
    };
    fetchEquipmentNetworkData();
  }, [profile]);

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
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 bg-white rounded-lg shadow-sm px-4 py-3 border-2 border-gray-300">
        <select className="border rounded px-3 py-2 text-sm" value={filters.dateRange} onChange={e => setFilters(f => ({ ...f, dateRange: e.target.value }))}>
          {FILTERS.dateRange.map(opt => <option key={opt}>{opt}</option>)}
        </select>
        <select className="border rounded px-3 py-2 text-sm" value={filters.userOrTeam} onChange={e => setFilters(f => ({ ...f, userOrTeam: e.target.value }))}>
          {FILTERS.userOrTeam.map(opt => <option key={opt}>{opt}</option>)}
        </select>
        <select className="border rounded px-3 py-2 text-sm" value={filters.equipment} onChange={e => setFilters(f => ({ ...f, equipment: e.target.value }))}>
          {equipmentOptions.map(opt => <option key={opt}>{opt}</option>)}
        </select>
        <select
          className="border rounded px-3 py-2 text-sm"
          value={filters.location}
          onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}
          disabled={profile?.role === 'lab manager'}
        >
          {locationOptions.map(opt => <option key={opt}>{opt}</option>)}
        </select>
        <div className="flex-1" />
        <button className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded mr-2 hover:bg-blue-50 transition" onClick={() => handleExport('csv')}>Export CSV</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" onClick={() => handleExport('pdf')}>Export PDF</button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="flex flex-col items-center bg-gray-50 rounded-lg p-5 shadow-sm border-2 border-gray-300">
          <div className="bg-blue-100 rounded-full p-3 mb-2">
            <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          </div>
          <div className="text-3xl font-extrabold">{metrics.totalBookings}</div>
          <div className="text-gray-500 mt-1 font-medium">Total bookings</div>
        </div>
        <div className="flex flex-col items-center bg-gray-50 rounded-lg p-5 shadow-sm border-2 border-gray-300">
          <div className="bg-yellow-100 rounded-full p-3 mb-2">
            <svg className="w-7 h-7 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          </div>
          <div className="text-3xl font-extrabold">{(metrics.avgBookingTime / 60).toFixed(0)} h {metrics.avgBookingTime % 60} min</div>
          <div className="text-gray-500 mt-1 font-medium">Average booking time</div>
        </div>
        <div className="flex flex-col items-center bg-gray-50 rounded-lg p-5 shadow-sm border-2 border-gray-300">
          <div className="bg-red-100 rounded-full p-3 mb-2">
            <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>
          </div>
          <div className="text-3xl font-extrabold">{metrics.cancellations} <span className="text-base font-semibold">({metrics.cancellationsPercent}%)</span></div>
          <div className="text-gray-500 mt-1 font-medium">Cancellations</div>
        </div>
        <div className="flex flex-col items-center bg-gray-50 rounded-lg p-5 shadow-sm border-2 border-gray-300">
          <div className="bg-green-100 rounded-full p-3 mb-2">
            <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>
          </div>
          <div className="text-3xl font-extrabold">{metrics.activeUsers}</div>
          <div className="text-gray-500 mt-1 font-medium">Active users</div>
        </div>
      </div>

      {/* Charts Row: Bookings Over Time & Equipment Count by Network */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bookings Over Time Chart */}
        <div className="bg-white rounded-lg shadow-sm p-5 border-2 border-gray-300">
          <h3 className="font-semibold text-lg mb-4">Bookings over time</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={bookingsOverTime}>
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="bookings" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="text-center text-blue-600 font-medium mt-2">Total Bookings</div>
        </div>
        {/* Equipment Count by Network Chart */}
        <div className="bg-white rounded-lg shadow-sm p-5 border-2 border-gray-300">
          <h3 className="font-semibold text-lg mb-4">Equipment Count by Network</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={equipmentNetworkData}>
              <XAxis dataKey="network" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}; 