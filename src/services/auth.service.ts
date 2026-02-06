import { api, setToken, setRefreshToken, clearTokens } from './api';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: 'buyer' | 'supplier' | 'market' | 'visitor' | 'admin';
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  role: 'buyer' | 'supplier' | 'market' | 'visitor';
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export const authService = {
  // Register a new user
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    setToken(response.token);
    setRefreshToken(response.refreshToken);
    return response;
  },

  // Login
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    setToken(response.token);
    setRefreshToken(response.refreshToken);
    return response;
  },

  // Logout
  logout(): void {
    clearTokens();
  },

  // Get current user
  async me(): Promise<User> {
    return api.get<User>('/me');
  },

  // Refresh token
  async refresh(refreshToken: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/refresh', { refreshToken });
    setToken(response.token);
    setRefreshToken(response.refreshToken);
    return response;
  },
};
