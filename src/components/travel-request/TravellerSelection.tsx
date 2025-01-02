import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

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
  onSelect: (selectedUsers: User[]) => void;
  defaultSelectedUsers?: User[];
}

export function TravellerSelection({ 
  fromCity, 
  toCity, 
  onClose, 
  onSelect,
  defaultSelectedUsers = []
}: TravellerSelectionProps) {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(
    new Set(defaultSelectedUsers.map(u => u.id))
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/users");
      const data = await response.json();
      setUsers(data);
      
      // Add current user to selection if not already selected
      if (currentUser && !selectedUsers.has(currentUser.id)) {
        setSelectedUsers(new Set([currentUser.id]));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.employee_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          Confirm Selection ({selectedUsers.size} selected)
        </Button>
      </div>
    </div>
  );
} 