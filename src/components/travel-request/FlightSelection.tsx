import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { flights } from "@/data/flights";
import { HotelSelection } from "@/components/travel-request/HotelSelection";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface FlightSelectionProps {
  fromCity: string;
  toCity: string;
  onBack: () => void;
  onNext: () => void;
}

export function FlightSelection({ fromCity, toCity, onBack, onNext }: FlightSelectionProps) {
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [justification, setJustification] = useState("");
  const [showHotelSelection, setShowHotelSelection] = useState(false);

  // Get flights for the selected route
  const routeKey = Object.keys(flights).find(key => 
    key.startsWith(fromCity) && key.endsWith(toCity)
  ) || "";
  const availableFlights = flights[routeKey] || [];

  const selectedFlightDetails = selectedFlight 
    ? availableFlights.find(f => f.id === selectedFlight)
    : null;

  const needsJustification = selectedFlightDetails?.price > (selectedFlightDetails?.expenseLimit || Infinity);

  if (showHotelSelection) {
    return (
      <Dialog open={showHotelSelection} onOpenChange={setShowHotelSelection}>
        <DialogContent className="sm:max-w-[900px]">
          <HotelSelection
            city={toCity}
            onBack={() => setShowHotelSelection(false)}
            onNext={onNext}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        Let's Choose Your Itinerary
      </h2>
      <p className="text-muted-foreground">
        Flights Available
      </p>
      <p className="text-sm font-medium">
        {fromCity} → {toCity}
      </p>

      <div className="space-y-4">
        {availableFlights.map((flight) => (
          <Card
            key={flight.id}
            className={cn(
              "flex items-center justify-between p-4",
              selectedFlight === flight.id && "border-primary"
            )}
          >
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <img 
                  src={flight.logo} 
                  alt={flight.airline}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <p className="font-medium">{flight.airline}</p>
                <p className="text-sm text-muted-foreground">
                  [{flight.departureTime}] - [{flight.arrivalTime}]
                </p>
                <p className="text-sm text-muted-foreground">
                  {flight.duration.hours}h {flight.duration.minutes}m A-B-C
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={selectedFlight === flight.id ? "default" : "outline"}
                onClick={() => setSelectedFlight(flight.id)}
              >
                Select
              </Button>
              <Button variant="outline">
                Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {needsJustification && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex flex-col gap-2">
            This flight exceeds your expense limit. Please provide a justification to proceed.
            <Input
              placeholder="Write the reason here"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
            />
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={() => setShowHotelSelection(true)}
          disabled={!selectedFlight || (needsJustification && !justification)}
          className="bg-green-500 hover:bg-green-600"
        >
          Next
        </Button>
      </div>
    </div>
  );
} 