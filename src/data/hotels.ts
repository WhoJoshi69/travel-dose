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
  "Los Angeles": [
    {
      id: "la-1",
      name: "LA Downtown Hotel",
      address: "333 S Figueroa St, Los Angeles, CA 90071",
      distanceFromAirport: 2.1,
      price: 250,
      occupancyTypes: ["single", "double"],
      city: "Los Angeles"
    },
    {
      id: "la-2",
      name: "Beverly Hills Hotel",
      address: "9641 Sunset Blvd, Beverly Hills, CA 90210",
      distanceFromAirport: 3.5,
      price: 450,
      occupancyTypes: ["double"],
      city: "Los Angeles"
    },
    {
      id: "la-3",
      name: "Airport Inn Express",
      address: "5249 W Century Blvd, Los Angeles, CA 90045",
      distanceFromAirport: 0.5,
      price: 180,
      occupancyTypes: ["single"],
      city: "Los Angeles"
    }
  ],
  "Houston": [
    {
      id: "hou-1",
      name: "Houston Downtown Marriott",
      address: "1777 Walker St, Houston, TX 77010",
      distanceFromAirport: 2.8,
      price: 280,
      occupancyTypes: ["single", "double"],
      city: "Houston"
    },
    {
      id: "hou-2",
      name: "Airport Plaza Hotel",
      address: "2900 North Terminal Rd, Houston, TX 77032",
      distanceFromAirport: 0.3,
      price: 220,
      occupancyTypes: ["single"],
      city: "Houston"
    }
  ],
  "Dallas": [
    {
      id: "dal-1",
      name: "Dallas Grand Hotel",
      address: "555 S Lamar St, Dallas, TX 75202",
      distanceFromAirport: 3.0,
      price: 300,
      occupancyTypes: ["single", "double"],
      city: "Dallas"
    }
  ],
  "Chicago": [
    {
      id: "chi-1",
      name: "Magnificent Mile Hotel",
      address: "540 N Michigan Ave, Chicago, IL 60611",
      distanceFromAirport: 2.5,
      price: 290,
      occupancyTypes: ["single", "double"],
      city: "Chicago"
    },
    {
      id: "chi-2",
      name: "O'Hare Airport Inn",
      address: "10000 W O'Hare Ave, Chicago, IL 60666",
      distanceFromAirport: 0.2,
      price: 200,
      occupancyTypes: ["single"],
      city: "Chicago"
    }
  ]
}; 