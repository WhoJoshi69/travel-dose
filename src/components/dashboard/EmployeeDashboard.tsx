import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { StatusCard } from "./StatusCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TravelRequestForm } from "../travel-request/TravelRequestForm";
import { fetchTrips } from "@/services/tripService";

interface Trip {
  id: number;
  request_date: string;
  purpose: string;
  from_city: string;
  to_city: string;
  from_date: string;
  to_date: string;
  booking_type: "self" | "team" | "other";
  selected_flight_id: string;
  selected_hotel_id: string;
  document_url?: string;
  status: 'ongoing' | 'upcoming' | 'rejected' | 'pending' | 'to_be_approved';
  approved_by?: string;
  employee_id: string;
  employee_email: string;
  employee_phone?: string;
  company: string;
  total_travelers: number;
  created_at: string;
  updated_at?: string;
}

export function EmployeeDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showTravelForm, setShowTravelForm] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<Trip['status']>('ongoing');

  useEffect(() => {
    fetchTripData();
  }, [searchQuery, selectedStatus]);

  const fetchTripData = async () => {
    try {
      setLoading(true);
      const data = await fetchTrips(selectedStatus, undefined, searchQuery);
      setTrips(data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  const statusCounts = {
    ongoing: trips.filter(t => t.status === 'ongoing').length,
    upcoming: trips.filter(t => t.status === 'upcoming').length,
    rejected: trips.filter(t => t.status === 'rejected').length,
    pending: trips.filter(t => t.status === 'pending').length,
    toBeApproved: trips.filter(t => t.status === 'to_be_approved').length,
  };

  const handleStatusClick = (status: Trip['status']) => {
    setSelectedStatus(status);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header with Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="relative w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search trips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Dialog open={showTravelForm} onOpenChange={setShowTravelForm}>
            <DialogTrigger asChild>
              <Button onClick={() => setShowTravelForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[900px]">
              <TravelRequestForm onClose={() => setShowTravelForm(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-5 gap-4">
        <StatusCard 
          title="Ongoing Trips" 
          count={statusCounts.ongoing} 
          isActive={selectedStatus === 'ongoing'}
          onClick={() => handleStatusClick('ongoing')}
        />
        <StatusCard 
          title="Upcoming Trips" 
          count={statusCounts.upcoming}
          isActive={selectedStatus === 'upcoming'}
          onClick={() => handleStatusClick('upcoming')}
        />
        <StatusCard 
          title="Rejected Trips" 
          count={statusCounts.rejected}
          isActive={selectedStatus === 'rejected'}
          onClick={() => handleStatusClick('rejected')}
        />
        <StatusCard 
          title="Pending Approval" 
          count={statusCounts.pending}
          isActive={selectedStatus === 'pending'}
          onClick={() => handleStatusClick('pending')}
        />
        <StatusCard 
          title="To Be Approved" 
          count={statusCounts.toBeApproved}
          isActive={selectedStatus === 'to_be_approved'}
          onClick={() => handleStatusClick('to_be_approved')}
        />
      </div>

      {/* Updated Trips Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">S.No.</TableHead>
              <TableHead>Trip ID</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-4">
                  Loading...
                </TableCell>
              </TableRow>
            ) : trips.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-4">
                  No trips found
                </TableCell>
              </TableRow>
            ) : (
              trips.map((trip, index) => (
                <TableRow key={trip.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{trip.id}</TableCell>
                  <TableCell>{new Date(trip.request_date).toLocaleDateString()}</TableCell>
                  <TableCell>{trip.from_city}</TableCell>
                  <TableCell>{trip.to_city}</TableCell>
                  <TableCell>{new Date(trip.from_date).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(trip.to_date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(trip.status)}`}>
                      {trip.status}
                    </span>
                  </TableCell>
                  <TableCell>{trip.purpose}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function getStatusColor(status: Trip['status']) {
  const colors = {
    ongoing: 'bg-blue-100 text-blue-800',
    upcoming: 'bg-purple-100 text-purple-800',
    rejected: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
    to_be_approved: 'bg-orange-100 text-orange-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
} 