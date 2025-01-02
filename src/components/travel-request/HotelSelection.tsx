import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { hotels } from "@/data/hotels";
import { TripSummary } from "@/components/travel-request/TripSummary";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface HotelSelectionProps {
  city: string;
  formData: any;
  selectedFlight: string;
  onBack: () => void;
  onNext: () => void;
  showTripSummary: boolean;
  setShowTripSummary: (show: boolean) => void;
}

export function HotelSelection({ 
  city, 
  formData,
  selectedFlight,
  onBack, 
  onNext,
  showTripSummary,
  setShowTripSummary
}: HotelSelectionProps) {
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [occupancyFilter, setOccupancyFilter] = useState<"single" | "double">("single");

  const handleNext = () => {
    if (selectedHotel) {
      setShowTripSummary(true);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <Dialog open={showTripSummary} onOpenChange={setShowTripSummary}>
        <DialogContent className="sm:max-w-[600px]">
          <TripSummary
            formData={formData}
            selectedFlight={selectedFlight}
            selectedHotel={selectedHotel || ''}
            onBack={() => setShowTripSummary(false)}
            onConfirm={() => {
              setShowTripSummary(false);
              onNext();
            }}
            open={showTripSummary}
            onOpenChange={setShowTripSummary}
          />
        </DialogContent>
      </Dialog>

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
            {hotels[city]?.filter(hotel => 
              hotel.occupancyTypes.includes(occupancyFilter)
            ).map((hotel) => (
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

      <div className="flex justify-end gap-4 mt-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={handleNext}
          disabled={!selectedHotel}
        >
          Next
        </Button>
      </div>
    </div>
  );
} 