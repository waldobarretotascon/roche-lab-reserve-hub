
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const Index = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <Dashboard />
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Index;
