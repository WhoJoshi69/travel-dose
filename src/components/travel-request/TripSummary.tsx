import { Button } from "@/components/ui/button";
import { createTrip } from "@/services/tripService";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/toast";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a trip",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const travelers = formData.bookingType === "self" 
        ? [{ 
            employee_id: user.employeeId,
            email: user.email,
            designation: user.designation
          }]
        : formData.selectedTravellers.map(traveler => ({
            employee_id: traveler.employee_id,
            email: traveler.email,
            designation: traveler.designation
          }));

      const tripData = {
        purpose: formData.purpose,
        from_city: formData.fromCity,
        to_city: formData.toCity,
        from_date: formData.fromDate?.toISOString().split('T')[0] || "",
        to_date: formData.toDate?.toISOString().split('T')[0] || "",
        booking_type: formData.bookingType,
        selected_flight_id: selectedFlight,
        selected_hotel_id: selectedHotel,
        document_url: "",
        employee_id: user.employeeId,
        employee_email: user.email,
        employee_phone: user.phone || "",
        company: "ACME Corp",
        travelers: travelers
      };

      await createTrip(tripData);
      
      toast({
        title: "Success",
        description: "Trip request created successfully",
        variant: "success",
      });

      onConfirm();
    } catch (error) {
      console.error("Error creating trip:", error);
      toast({
        title: "Error",
        description: "Failed to create trip request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogContent>
        <DialogTitle>Trip Summary</DialogTitle>
        <DialogDescription>Review your trip details before confirming</DialogDescription>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Employee Name</p>
              <p className="font-medium">{user?.firstName} {user?.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Employee ID</p>
              <p className="font-medium">{user?.employeeId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Purpose</p>
              <p className="font-medium">{formData.purpose}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Booking Type</p>
              <p className="font-medium">{formData.bookingType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">From</p>
              <p className="font-medium">{formData.fromCity}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">To</p>
              <p className="font-medium">{formData.toCity}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Start Date</p>
              <p className="font-medium">{formData.fromDate?.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">End Date</p>
              <p className="font-medium">{formData.toDate?.toLocaleDateString()}</p>
            </div>
          </div>

          {formData.selectedTravellers.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Selected Travelers</p>
              <div className="flex flex-wrap gap-2">
                {formData.selectedTravellers.map((traveler) => (
                  <div
                    key={traveler.id}
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                  >
                    {traveler.email}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
              Back
            </Button>
            <Button 
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="bg-green-500 hover:bg-green-600"
            >
              {isSubmitting ? "Creating..." : "Confirm"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 