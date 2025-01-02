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
  expenseLimit?: number;
}

interface FlightMap {
  [key: string]: Flight[];
}

export const flights: FlightMap = {
  "New York-Los Angeles": [
    {
      id: "1",
      airline: "American Airlines",
      logo: "/airlines/aa.png",
      departureTime: "10:00",
      arrivalTime: "12:30",
      duration: { hours: 2, minutes: 30 },
      price: 450,
      expenseLimit: 400
    },
    {
      id: "2",
      airline: "Delta Airlines",
      logo: "/airlines/delta.png",
      departureTime: "14:00",
      arrivalTime: "16:15",
      duration: { hours: 2, minutes: 15 },
      price: 380,
      expenseLimit: 400
    }
  ],
  "Los Angeles-New York": [
    {
      id: "3",
      airline: "United Airlines",
      logo: "/airlines/united.png",
      departureTime: "09:00",
      arrivalTime: "17:15",
      duration: { hours: 5, minutes: 15 },
      price: 420,
      expenseLimit: 400
    }
  ],
  "Chicago-Houston": [
    {
      id: "4",
      airline: "Southwest Airlines",
      logo: "/airlines/southwest.png",
      departureTime: "11:30",
      arrivalTime: "13:45",
      duration: { hours: 2, minutes: 15 },
      price: 310,
      expenseLimit: 400
    }
  ]
}; 