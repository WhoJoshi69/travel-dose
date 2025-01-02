import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { StatusCard } from "../dashboard/StatusCard";
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

interface Expense {
  id: number;
  request_date: string;
  purpose: string;
  amount: number;
  status: 'pending' | 'approved' | 'to_be_approved';
  employee_id: string;
  employee_email: string;
  created_at: string;
}

export function ExpensesDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<Expense['status']>('pending');

  // Mock data - replace with actual API call
  useEffect(() => {
    // Simulating API call
    setLoading(true);
    setTimeout(() => {
      setExpenses([
        // Add mock expenses here
      ]);
      setLoading(false);
    }, 1000);
  }, [searchQuery, selectedStatus]);

  const statusCounts = {
    pending: expenses.filter(e => e.status === 'pending').length,
    approved: expenses.filter(e => e.status === 'approved').length,
    toBeApproved: expenses.filter(e => e.status === 'to_be_approved').length,
  };

  const handleStatusClick = (status: Expense['status']) => {
    setSelectedStatus(status);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header with Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Expenses</h1>
        <div className="flex items-center gap-4">
          <div className="relative w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search claims..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Dialog open={showExpenseForm} onOpenChange={setShowExpenseForm}>
            <DialogTrigger asChild>
              <Button onClick={() => setShowExpenseForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create New Claim
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[900px]">
              {/* Add ExpenseForm component here */}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-3 gap-4">
        <StatusCard 
          title="Pending Claims" 
          count={statusCounts.pending}
          isActive={selectedStatus === 'pending'}
          onClick={() => handleStatusClick('pending')}
        />
        <StatusCard 
          title="Approved Claims" 
          count={statusCounts.approved}
          isActive={selectedStatus === 'approved'}
          onClick={() => handleStatusClick('approved')}
        />
        <StatusCard 
          title="Claims to Approve" 
          count={statusCounts.toBeApproved}
          isActive={selectedStatus === 'to_be_approved'}
          onClick={() => handleStatusClick('to_be_approved')}
        />
      </div>

      {/* Claims Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">S.No.</TableHead>
              <TableHead>Claim ID</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[200px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  Loading...
                </TableCell>
              </TableRow>
            ) : expenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No claims found
                </TableCell>
              </TableRow>
            ) : (
              expenses.map((expense, index) => (
                <TableRow key={expense.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{expense.id}</TableCell>
                  <TableCell>{new Date(expense.request_date).toLocaleDateString()}</TableCell>
                  <TableCell>{expense.purpose}</TableCell>
                  <TableCell>${expense.amount}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(expense.status)}`}>
                      {expense.status}
                    </span>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                    {expense.status === 'to_be_approved' && (
                      <>
                        <Button variant="ghost" size="sm" className="text-green-600">
                          Approve
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          Reject
                        </Button>
                      </>
                    )}
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

function getStatusColor(status: Expense['status']) {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    to_be_approved: 'bg-orange-100 text-orange-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
} 