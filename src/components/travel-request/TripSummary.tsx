import { Button } from "@/components/ui/button";
import { hotels } from "@/data/hotels";
import { flights } from "@/data/flights";

interface TripSummaryProps {
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
  selectedHotel: string;
  onBack: () => void;
  onConfirm: () => void;
}

export function TripSummary({
  formData,
  selectedFlight,
  selectedHotel,
  onBack,
  onConfirm,
}: TripSummaryProps) {
  // Add null checks
  if (!formData || !formData.fromCity || !formData.toCity) {
    return (
      <div className="p-4">
        <p>Missing required travel information</p>
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>
    );
  }

  // Get flight details with null safety
  const routeKey = Object.keys(flights).find(key => 
    key.startsWith(formData.fromCity) && key.endsWith(formData.toCity)
  ) || "";
  const flightDetails = flights[routeKey]?.find(f => f.id === selectedFlight);

  // Get hotel details with null safety
  const hotelDetails = hotels[formData.toCity]?.find(h => h.id === selectedHotel);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Trip Request Details</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Employee Name</p>
            <p className="font-medium">John Doe</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Employee ID</p>
            <p className="font-medium">EMP123</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Employee Phone Number</p>
            <p className="font-medium">+1 234 567 8900</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Employee Email ID</p>
            <p className="font-medium">john.doe@company.com</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Company</p>
            <p className="font-medium">ACME Corp</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Trip Start Date</p>
            <p className="font-medium">
              {formData.fromDate?.toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Trip End Date</p>
            <p className="font-medium">
              {formData.toDate?.toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Purpose of Travel</p>
            <p className="font-medium">{formData.purpose}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Trip From</p>
            <p className="font-medium">{formData.fromCity}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Trip To</p>
            <p className="font-medium">{formData.toCity}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Flight Details</p>
          <p className="font-medium">
            {flightDetails?.airline} - {flightDetails?.departureTime} to {flightDetails?.arrivalTime}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Hotel Details</p>
          <p className="font-medium">
            {hotelDetails?.name} - {hotelDetails?.address}
          </p>
        </div>

        {formData.documents && (
          <div>
            <p className="text-sm text-muted-foreground">Attached Documents</p>
            <p className="font-medium">{formData.documents.name}</p>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={onConfirm}
          className="bg-green-500 hover:bg-green-600"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
} 