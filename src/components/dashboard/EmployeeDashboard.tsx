import { useState } from "react";
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

interface Trip {
  id: string;
  requestDate: string;
  destination: string;
  startDate: string;
  endDate: string;
  approvedBy: string;
  purpose: string;
  mode: string;
  status: 'ongoing' | 'upcoming' | 'rejected' | 'pending' | 'to_be_approved';
}

export function EmployeeDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showTravelForm, setShowTravelForm] = useState(false);
  const [trips] = useState<Trip[]>([]); // You'll fetch this data from your API

  const statusCounts = {
    ongoing: trips.filter(t => t.status === 'ongoing').length,
    upcoming: trips.filter(t => t.status === 'upcoming').length,
    rejected: trips.filter(t => t.status === 'rejected').length,
    pending: trips.filter(t => t.status === 'pending').length,
    toBeApproved: trips.filter(t => t.status === 'to_be_approved').length,
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
        <StatusCard title="Ongoing Trips" count={statusCounts.ongoing} isActive />
        <StatusCard title="Upcoming Trips" count={statusCounts.upcoming} />
        <StatusCard title="Rejected Trips" count={statusCounts.rejected} />
        <StatusCard title="Pending Approval" count={statusCounts.pending} />
        <StatusCard title="To Be Approved" count={statusCounts.toBeApproved} />
      </div>

      {/* Trips Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">S.No.</TableHead>
              <TableHead>Trip ID</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Approved By</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trips.map((trip, index) => (
              <TableRow key={trip.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{trip.id}</TableCell>
                <TableCell>{trip.requestDate}</TableCell>
                <TableCell>{trip.destination}</TableCell>
                <TableCell>{trip.startDate}</TableCell>
                <TableCell>{trip.endDate}</TableCell>
                <TableCell>{trip.approvedBy}</TableCell>
                <TableCell>{trip.purpose}</TableCell>
                <TableCell>{trip.mode}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 