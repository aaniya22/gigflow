import api from './axios';
import type { AuthResponse } from '../types';

export const loginApi = async (email: string, password: string): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
  return data;
};

export const registerApi = async (
  name: string, email: string, password: string, role: 'admin' | 'sales'
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/register', { name, email, password, role });
  return data;
};