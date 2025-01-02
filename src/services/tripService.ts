import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:8000'  // Update this to match your FastAPI backend URL
});

export interface CreateTripRequest {
  purpose: string;
  from_city: string;
  to_city: string;
  from_date: string;
  to_date: string;
  booking_type: "self" | "team" | "other";
  selected_flight_id: string;
  selected_hotel_id: string;
  document_url?: string;
  employee_id: string;
  employee_email: string;
  employee_phone?: string;
  company: string;
  travelers: {
    employee_id: string;
    email: string;
    designation: string;
  }[];
}

export const createTrip = async (tripData: CreateTripRequest) => {
  try {
    const response = await api.post('/api/trips/', tripData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Failed to create trip');
    }
    throw error;
  }
};

export const fetchTrips = async (
  status?: string,
  employeeId?: string,
  search?: string
): Promise<Trip[]> => {
  const params = new URLSearchParams();
  if (status) params.append('status', status);
  if (employeeId) params.append('employee_id', employeeId);
  if (search) params.append('search', search);

  const response = await api.get(`/api/trips?${params.toString()}`);
  return response.data;
}; 