import { create } from 'zustand';

interface User {
  id: number;
  employeeId: string;
  email: string;
  designation: string;
  phone?: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Initialize with mock data for development
export const useAuth = create<AuthState>((set) => ({
  user: {
    id: 1,
    employeeId: 'EMP123',
    email: 'john.doe@company.com',
    designation: 'Software Engineer',
    phone: '+1 234 567 8900',
    firstName: 'John',
    lastName: 'Doe'
  },
  setUser: (user) => set({ user }),
})); 