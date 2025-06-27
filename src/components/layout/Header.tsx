import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, Search, User, Calendar, FlaskConical, AlertTriangle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const Header = () => {
  const { signOut, user } = useAuth();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      if (!user) return;
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      setRole(profile?.role ?? null);
    };
    fetchRole();
  }, [user]);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <img src="/roche-logo.png" alt="Roche Logo" className="h-10 w-auto" />
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link to="/new-booking" className="text-gray-700 hover:text-blue-600 font-medium">Book Now</Link>
            <Link to="/my-bookings" className="text-gray-700 hover:text-blue-600 font-medium">My Bookings</Link>
            <Link to="/report-issue" className="text-gray-700 hover:text-blue-600 font-medium">Report an Issue</Link>
            {role === 'lab manager' || role === 'general manager' ? (
              <Link to="/analytics" className="text-gray-700 hover:text-blue-600 font-medium">Analytics</Link>
            ) : null}
            <a href="#" className="bg-black text-white px-4 py-2 rounded font-medium">My Profile</a>
          </nav>
        </div>
      </div>
    </header>
  );
};
