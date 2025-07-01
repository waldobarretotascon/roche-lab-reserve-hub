import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        window.location.href = '/';
      }
    };
    checkAuth();
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
            department: department
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Please check your email to confirm your account.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Redirect to main page
      window.location.href = '/';
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with Roche logo */}
      <header className="flex items-center px-8 py-8">
        <img src="/roche-logo.png" alt="Roche Logo" className="w-28 h-auto" />
      </header>
      {/* Blue headline bar */}
      <div className="w-full bg-[#eaf2fb] py-10 px-4 md:px-0 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-black text-center">Book your equipment</h1>
        <p className="text-lg text-gray-700 text-center max-w-2xl">Reserve lab equipment easily and keep your research moving forward.</p>
      </div>
      {/* Main content: image left, form right */}
      <main className="flex-1 w-full flex flex-col md:flex-row justify-center items-stretch bg-[#f4f8fd]">
        {/* Left: Image on white background */}
        <div className="flex-1 flex items-center justify-center bg-white px-8 py-12 border-b md:border-b-0 md:border-r border-gray-200 min-h-[350px]">
          <img src="/login_page_img.png" alt="Lab Equipment" className="rounded-lg shadow-lg w-full max-w-lg object-cover" style={{ maxHeight: 350 }} />
        </div>
        {/* Right: Login form on white background */}
        <div className="flex-1 flex flex-col justify-center bg-white px-8 py-12 min-h-[350px]">
          <div className="w-full max-w-md mx-auto">
            <form onSubmit={isLogin ? handleSignIn : handleSignUp} className="bg-white p-0 md:p-0 rounded-lg">
              <h2 className="text-lg font-medium mb-6">Please enter your credentials</h2>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <label htmlFor="email" className="block text-sm font-normal mb-2">Username</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="sam.doe@roche.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-50 border border-gray-300 focus:border-black focus:ring-0 rounded-md px-3 py-2 w-full"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="password" className="block text-sm font-normal mb-2">Password</label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-gray-50 border border-gray-300 focus:border-black focus:ring-0 rounded-md px-3 py-2 w-full"
                  />
                </div>
              </div>
              <div className="mb-6">
                <a href="#" className="text-sm text-gray-500 hover:underline">Forgot your password?</a>
              </div>
              <Button
                type="submit"
                className="w-full bg-black text-white text-lg py-3 rounded-md hover:bg-gray-900 transition"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Log In'}
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
