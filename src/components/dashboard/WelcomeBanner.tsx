import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

export const WelcomeBanner = () => {
  const [fullName, setFullName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();
        setFullName(data?.full_name || 'User');
      }
    };
    fetchUser();
  }, []);

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <CardContent className="p-8 bg-[#eaf6ff] border-b border-blue-200">
        <h1 className="text-4xl font-bold mb-2 text-black">
          Welcome <span className="italic font-bold">{fullName}!</span>
        </h1>
        <p className="text-gray-700 text-lg">
          Access lab tools, manage your bookings, and report issues, all in one place.
        </p>
      </CardContent>
    </Card>
  );
};
