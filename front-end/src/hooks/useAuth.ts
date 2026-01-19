'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/auth.service';
import { Credentials } from '@/Dto/credentials';


export function useAuth() {
//   const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function login(credentials: Credentials) {
    try {
      setError(null);

      const data = await AuthService.login(credentials);

      if (!data.token) {
        setError('Credenciais inválidas');
        return;
      }

      localStorage.setItem('token', data.token);
      router.push('/home');

    } catch (err: any) {
      setError('Credenciais inválidas');
    } finally {
    }
  }

  function logout() {
    AuthService.logout();
    router.push('/login');
  }

  return {
    login,
    logout,
    error,
  };
}
