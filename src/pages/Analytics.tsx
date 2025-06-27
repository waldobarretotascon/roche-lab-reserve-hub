import React, { useEffect, useState } from 'react';
import { AnalyticsDashboard } from '@/components/dashboard/AnalyticsDashboard';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

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
        <div className="container mx-auto px-4 pt-4">
          <button
            onClick={() => { window.location.href = '/'; }}
            className="inline-block bg-white border border-gray-300 rounded px-4 py-2 text-blue-600 font-semibold shadow hover:bg-blue-50 transition mb-4"
          >
            &larr; Home
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