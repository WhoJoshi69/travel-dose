import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TravellerSelection } from "./TravellerSelection";

const travelPurposes = [
  "Meeting with Client",
  "Vendor",
  "Conference",
  "Visiting Head Office",
  "Other",
] as const;

// Major US cities
const usCities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "San Francisco",
  "Charlotte",
  "Indianapolis",
  "Seattle",
  "Denver",
  "Boston",
];

interface TravelRequestFormProps {
  onClose: () => void;
}

export function TravelRequestForm({ onClose }: TravelRequestFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isTeamTravel, setIsTeamTravel] = useState(false);
  const [isBookingForOther, setIsBookingForOther] = useState(false);
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [selectedTravellers, setSelectedTravellers] = useState<User[]>([]);

  const handleNext = () => {
    setCurrentStep((prev) => {
      const nextStep = Math.min(prev + 1, 4);
      return nextStep;
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Progress Steps with Animated Trail */}
      <div className="flex items-center justify-between mb-8 relative">
        {/* Animated trail line */}
        <div
          className="absolute top-4 left-0 h-[2px] bg-primary transition-all duration-500 ease-in-out"
          style={{
            width: currentStep === 1 ? "0%" : "33%",
            transform: `translateX(${(currentStep - 1) * 100}%)`,
          }}
        />
        {/* Background trail */}
        <div className="absolute top-4 left-0 h-[2px] w-full bg-muted" />
        
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="relative z-10 flex items-center">
            <div
              className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center text-sm transition-all duration-300",
                currentStep >= step
                  ? "bg-primary text-primary-foreground scale-110"
                  : "bg-muted text-muted-foreground scale-100"
              )}
            >
              {step}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold">Let's Plan Your Travel</h2>

      <div className="space-y-4">
        <Select defaultValue={travelPurposes[0]}>
          <SelectTrigger>
            <SelectValue placeholder="Select Purpose of Travel" />
          </SelectTrigger>
          <SelectContent>
            {travelPurposes.map((purpose) => (
              <SelectItem key={purpose} value={purpose}>
                {purpose}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">From</p>
            <div className="grid grid-cols-3 gap-4">
              <CitySelect
                value={fromCity}
                onChange={setFromCity}
                cities={usCities}
              />
              <DateSelect
                value={fromDate}
                onChange={setFromDate}
              />
              <TimeSelect />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">To</p>
            <div className="grid grid-cols-3 gap-4">
              <CitySelect
                value={toCity}
                onChange={setToCity}
                cities={usCities}
              />
              <DateSelect
                value={toDate}
                onChange={setToDate}
              />
              <TimeSelect />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="team"
              checked={isTeamTravel}
              onCheckedChange={(checked) => setIsTeamTravel(!!checked)}
            />
            <label htmlFor="team" className="text-sm">
              I am travelling with a team
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="booking"
              checked={isBookingForOther}
              onCheckedChange={(checked) => setIsBookingForOther(!!checked)}
            />
            <label htmlFor="booking" className="text-sm">
              I am booking for someone
            </label>
          </div>
        </div>

        {(isTeamTravel || isBookingForOther) && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                Select All Travellers
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[900px]">
              <TravellerSelection
                fromCity={fromCity}
                toCity={toCity}
                onClose={() => {
                  const dialogTrigger = document.querySelector('[aria-label="Close"]');
                  if (dialogTrigger instanceof HTMLButtonElement) {
                    dialogTrigger.click();
                  }
                }}
                onSelect={(selectedUsers) => {
                  setSelectedTravellers(selectedUsers);
                  const dialogTrigger = document.querySelector('[aria-label="Close"]');
                  if (dialogTrigger instanceof HTMLButtonElement) {
                    dialogTrigger.click();
                  }
                }}
                defaultSelectedUsers={selectedTravellers}
              />
            </DialogContent>
          </Dialog>
        )}

        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function CitySelect({ value, onChange, cities }: { 
  value: string; 
  onChange: (value: string) => void;
  cities: string[];
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
        >
          {value || "Select city"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command>
          <CommandInput placeholder="" />
          <CommandEmpty>No city found.</CommandEmpty>
          <CommandGroup className="max-h-60 overflow-auto">
            {cities.map((city) => (
              <CommandItem
                key={city}
                onSelect={() => onChange(city)}
              >
                {city}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function DateSelect({ value, onChange }: {
  value?: Date;
  onChange: (date?: Date) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : "Pick date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

function TimeSelect() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
        >
          <Clock className="mr-2 h-4 w-4" />
          Select time
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="grid gap-2">
          <Input type="time" className="w-[160px]" />
        </div>
      </PopoverContent>
    </Popover>
  );
} 