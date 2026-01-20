'use client';

import { useRouter } from 'next/navigation';
import { useSignInMutation,} from '@/graphql/generated';

export function useAuth() {
 const [signInMutation, { data, loading, error }] = useSignInMutation();
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    try {
      const result = await signInMutation({
        variables: {
          args: { email, password },
        },
      });

      return result.data?.signIn.token ?? null;
    } catch (err) {
      console.error('Erro no login:', err);
      return null;
    }
  };

  function logout() {
    // AuthService.logout();
    router.push('/login');
  }

  return {
    signIn,
    data,
    loading,
    error,
  };

}
