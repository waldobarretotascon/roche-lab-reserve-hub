import React, { useEffect, useState } from 'react';
import { AnalyticsDashboard } from '@/components/dashboard/AnalyticsDashboard';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';

const Analytics = () => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) {
        setLoading(false);
        return;
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      setRole(profile?.role ?? null);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) return <div>Loading analytics...</div>;
  if (role !== 'lab manager' && role !== 'general manager') {
    return <div className="text-red-600 font-semibold">You do not have access to this page.</div>;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 pt-4">
          <button
            onClick={() => { window.location.href = '/'; }}
            className="flex items-center text-blue-600 font-medium text-lg mb-4 hover:underline focus:outline-none bg-transparent border-none p-0"
            style={{ boxShadow: 'none' }}
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Home
          </button>
        </div>
        <main className="container mx-auto px-4 py-6">
          <AnalyticsDashboard />
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Analytics; 