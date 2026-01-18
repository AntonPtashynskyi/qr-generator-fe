'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from "@/components/ui/button";

export const LogoutButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? 'Logging out...' : 'Logout'}
    </Button>
  );
};
