import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ExpenseItem {
  category: string;
  amount: string;
  bill: File | null;
}

interface ExpenseFormProps {
  onClose: () => void;
  trips: { id: number; from_city: string; to_city: string }[];
}

const currencies = ["USD", "INR", "EUR", "GBP", "AUD"];
const categories = ["Food", "Hotel", "Cab", "Other"];

export function ExpenseForm({ onClose, trips }: ExpenseFormProps) {
  const [selectedTrip, setSelectedTrip] = useState<string>("");
  const [currency, setCurrency] = useState<string>("USD");
  const [expenseItems, setExpenseItems] = useState<ExpenseItem[]>([
    { category: "", amount: "", bill: null },
  ]);

  const handleAddExpenseItem = () => {
    setExpenseItems([...expenseItems, { category: "", amount: "", bill: null }]);
  };

  const handleRemoveExpenseItem = (index: number) => {
    setExpenseItems(expenseItems.filter((_, i) => i !== index));
  };

  const handleExpenseItemChange = (
    index: number,
    field: keyof ExpenseItem,
    value: string | File
  ) => {
    const newExpenseItems = [...expenseItems];
    if (field === "bill" && value instanceof File) {
      newExpenseItems[index][field] = value;
    } else {
      newExpenseItems[index][field] = value as string;
    }
    setExpenseItems(newExpenseItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      tripId: selectedTrip,
      currency,
      expenseItems,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <DialogHeader>
        <DialogTitle>Create New Expense Claim</DialogTitle>
      </DialogHeader>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Trip ID</label>
          <Select value={selectedTrip} onValueChange={setSelectedTrip}>
            <SelectTrigger>
              <SelectValue placeholder="Select trip" />
            </SelectTrigger>
            <SelectContent>
              {trips.map((trip) => (
                <SelectItem key={trip.id} value={trip.id.toString()}>
                  {trip.id} ({trip.from_city} - {trip.to_city})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Currency</label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((curr) => (
                <SelectItem key={curr} value={curr}>
                  {curr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {expenseItems.map((item, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="flex-1">
              <Select
                value={item.category}
                onValueChange={(value) =>
                  handleExpenseItemChange(index, "category", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Input
                type="number"
                placeholder="Amount"
                value={item.amount}
                onChange={(e) =>
                  handleExpenseItemChange(index, "amount", e.target.value)
                }
              />
            </div>
            <div className="flex-1">
              <Input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleExpenseItemChange(index, "bill", file);
                  }
                }}
              />
            </div>
            {index > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveExpenseItem(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={handleAddExpenseItem}
          className="flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Expense Item
        </Button>
        <div className="space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Submit Claim</Button>
        </div>
      </div>
    </form>
  );
} 