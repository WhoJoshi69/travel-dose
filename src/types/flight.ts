interface Flight {
  id: string;
  airline: string;
  logo: string;
  departureTime: string;
  arrivalTime: string;
  duration: {
    hours: number;
    minutes: number;
  };
  price: number;
} 