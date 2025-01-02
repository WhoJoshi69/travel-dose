interface Hotel {
  id: string;
  name: string;
  address: string;
  distanceFromAirport: number;
  price: number;
  occupancyTypes: ("single" | "double")[];
  city: string;
}

export const hotels: { [city: string]: Hotel[] } = {
  "New York": [
    {
      id: "nyc-1",
      name: "Grand Hyatt",
      address: "109 East 42nd Street, New York",
      distanceFromAirport: 2.5,
      price: 350,
      occupancyTypes: ["single", "double"],
      city: "New York"
    },
    {
      id: "nyc-2",
      name: "Marriott Downtown",
      address: "85 West Street, New York",
      distanceFromAirport: 3.2,
      price: 280,
      occupancyTypes: ["single"],
      city: "New York"
    }
  ],
  "Los Angeles": [
    {
      id: "la-1",
      name: "LA Downtown Hotel",
      address: "333 S Figueroa St, Los Angeles",
      distanceFromAirport: 2.1,
      price: 250,
      occupancyTypes: ["single", "double"],
      city: "Los Angeles"
    }
  ]
}; 