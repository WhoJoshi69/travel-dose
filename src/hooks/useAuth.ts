import { create } from 'zustand';

interface User {
  id: number;
  email: string;
  employee_id: string;
  designation: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
})); 