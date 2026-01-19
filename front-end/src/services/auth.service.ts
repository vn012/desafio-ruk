// import { http } from '@/infra/http';
import { Credentials } from '@/Dto/credentials';
import { AuthResponse } from '@/Dto/auth-response';

export const AuthService = {
  async login(payload: Credentials): Promise <AuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const obj: AuthResponse = {
          token: "@edsaiTOKEN",
          message: "Login successful"
        };
        resolve(obj);
      }, 1000); 
    });

    const { data } = await http.post<AuthResponse>(
      '/auth/login',
      payload
    );

    return data;
  },

  logout() {
    localStorage.removeItem('token');
  },

};
