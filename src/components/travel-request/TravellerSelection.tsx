import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: number;
  email: string;
  employee_id: string;
  designation: string;
}

interface TravellerSelectionProps {
  fromCity: string;
  toCity: string;
  onClose: () => void;
  onSelect: (users: User[]) => void;
  defaultSelectedUsers?: User[];
}

export function TravellerSelection({ 
  fromCity, 
  toCity, 
  onClose, 
  onSelect,
  defaultSelectedUsers = []
}: TravellerSelectionProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(
    new Set(defaultSelectedUsers.map(user => user.id))
  );
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/users/employees", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
      
      // Assuming the first user is the current user for now
      if (data.length > 0) {
        setCurrentUser(data[0]);
        setSelectedUsers(new Set([data[0].id]));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.employee_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUser = (userId: number) => {
    const newSelected = new Set(selectedUsers);
    if (userId === currentUser?.id) {
      // Don't allow deselecting current user
      return;
    }
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const handleSubmit = () => {
    const selectedUsersList = users.filter(user => selectedUsers.has(user.id));
    onSelect(selectedUsersList);
    onClose();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Select Employees travelling from {fromCity} to {toCity}
        </h2>
      </div>

      <div className="relative w-full">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search employees..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="rounded-md border max-h-[400px] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Select</TableHead>
              <TableHead>S.No.</TableHead>
              <TableHead>Employee ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Designation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.has(user.id)}
                    onCheckedChange={() => toggleUser(user.id)}
                    disabled={user.id === currentUser?.id}
                  />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.employee_id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.designation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onClose}>
          Back
        </Button>
        <Button onClick={handleSubmit}>
          Next
        </Button>
      </div>
    </div>
  );
} 