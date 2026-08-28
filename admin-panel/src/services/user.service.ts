import api from './api';
import { User } from '../types';

export const userService = {
  getUsers: async () => {
    const response = await api.get<User[]>('/users');
    return response.data;
  },
  getUser: async (id: string) => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },
  createUser: async (user: Partial<User>) => {
    const response = await api.post<User>('/users', user);
    return response.data;
  },
  updateUser: async (id: string, user: Partial<User>) => {
    const response = await api.put<User>(`/users/${id}`, user);
    return response.data;
  },
  deleteUser: async (id: string) => {
    await api.delete(`/users/${id}`);
  }
};
