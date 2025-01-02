import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { hotels } from "@/data/hotels";

interface HotelSelectionProps {
  city: string;
  onBack: () => void;
  onNext: () => void;
}

export function HotelSelection({ city, onBack, onNext }: HotelSelectionProps) {
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [occupancyFilter, setOccupancyFilter] = useState<"single" | "double">("single");

  const cityHotels = hotels[city] || [];
  const filteredHotels = cityHotels.filter(hotel => 
    hotel.occupancyTypes.includes(occupancyFilter)
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        Let's Finalize Your Stay
      </h2>

      <div className="space-y-4">
        <Card className="p-4">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="py-2">Hotel Name</th>
                <th>Hotel Address</th>
                <th>Distance</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredHotels.map((hotel) => (
                <tr key={hotel.id} className="border-t">
                  <td className="py-3">{hotel.name}</td>
                  <td>{hotel.address}</td>
                  <td>{hotel.distanceFromAirport}km from Airport</td>
                  <td>${hotel.price}/night</td>
                  <td>
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
        </Card>

        <div className="space-y-2">
          <p className="text-sm font-medium">Preferences</p>
          <RadioGroup
            value={occupancyFilter}
            onValueChange={(value: "single" | "double") => setOccupancyFilter(value)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="single" id="single" />
              <Label htmlFor="single">Single Occupancy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="double" id="double" />
              <Label htmlFor="double">Double Occupancy</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={onNext}
          disabled={!selectedHotel}
          className="bg-green-500 hover:bg-green-600"
        >
          Next
        </Button>
      </div>
    </div>
  );
} 