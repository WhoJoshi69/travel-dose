import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { hotels } from "@/data/hotels";
import { TripSummary } from "@/components/travel-request/TripSummary";

interface HotelSelectionProps {
  city: string;
  formData: {
    purpose: string;
    fromCity: string;
    toCity: string;
    fromDate?: Date;
    toDate?: Date;
    bookingType: "self" | "team" | "other";
    selectedTravellers: any[];
    documents: File | null;
  };
  selectedFlight: string;
  onBack: () => void;
  onNext: () => void;
}

export function HotelSelection({ 
  city, 
  formData,
  selectedFlight,
  onBack, 
  onNext 
}: HotelSelectionProps) {
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [occupancyFilter, setOccupancyFilter] = useState<"single" | "double">("single");
  const [showTripSummary, setShowTripSummary] = useState(false);

  if (showTripSummary && selectedHotel) {
    return (
      <TripSummary
        formData={formData}
        selectedFlight={selectedFlight}
        selectedHotel={selectedHotel}
        onBack={() => setShowTripSummary(false)}
        onConfirm={onNext}
      />
    );
  }

  const cityHotels = hotels[city] || [];
  const filteredHotels = cityHotels.filter(hotel => 
    hotel.occupancyTypes.includes(occupancyFilter)
  );

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-semibold">Let's Finalize Your Stay</h2>

      <div className="bg-card rounded-lg border shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Hotel Name</th>
              <th className="text-left p-4">Hotel Address</th>
              <th className="text-left p-4">Distance</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredHotels.map((hotel) => (
              <tr key={hotel.id} className="border-b last:border-0">
                <td className="p-4">{hotel.name}</td>
                <td className="p-4">{hotel.address}</td>
                <td className="p-4">{hotel.distanceFromAirport}km from Airport</td>
                <td className="p-4">${hotel.price}/night</td>
                <td className="p-4">
                  <Button
                    variant={selectedHotel === hotel.id ? "default" : "outline"}
                    onClick={() => setSelectedHotel(hotel.id)}
                    size="sm"
                  >
                    Select
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-2">
        <p className="font-medium">Preferences</p>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={occupancyFilter === "single"}
              onChange={() => setOccupancyFilter("single")}
              className="radio"
            />
            Single Occupancy
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={occupancyFilter === "double"}
              onChange={() => setOccupancyFilter("double")}
              className="radio"
            />
            Double Occupancy
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={() => setShowTripSummary(true)}
          disabled={!selectedHotel}
          className="bg-green-500 hover:bg-green-600"
        >
          Next
        </Button>
      </div>
    </div>
  );
} 