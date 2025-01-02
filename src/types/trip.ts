export interface Trip {
  id: number;
  request_date: string;
  purpose: string;
  from_city: string;
  to_city: string;
  from_date: string;
  to_date: string;
  booking_type: "self" | "team" | "other";
  selected_flight_id: string;
  selected_hotel_id: string;
  document_url?: string;
  status: 'ongoing' | 'upcoming' | 'rejected' | 'pending' | 'to_be_approved';
  approved_by?: string;
  employee_id: string;
  employee_email: string;
  employee_phone?: string;
  company: string;
  total_travelers: number;
  created_at: string;
  updated_at?: string;
} 