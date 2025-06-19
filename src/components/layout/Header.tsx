
import React from 'react';
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

export const Header = () => {
  const { signOut } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FlaskConical className="h-8 w-8 text-blue-600" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">Roche Lab</span>
                <span className="text-sm text-gray-500">Reserve Hub</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Button>
            <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
              Equipment
            </Button>
            <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
              My Bookings
            </Button>
            <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
              Issues
            </Button>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-700">
              <Search className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="text-gray-700 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  My Calendar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600" 
                  onClick={signOut}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
