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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FlightSelection } from "./FlightSelection";

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
  const [showFlightSelection, setShowFlightSelection] = useState(false);
  const [formData, setFormData] = useState({
    purpose: travelPurposes[0],
    fromCity: "",
    toCity: "",
    fromDate: undefined as Date | undefined,
    toDate: undefined as Date | undefined,
    bookingType: "self" as "self" | "team" | "other",
    selectedTravellers: [] as User[],
    documents: null as File | null,
  });

  const handleSubmit = () => {
    setShowFlightSelection(true);
    const dialogTrigger = document.querySelector('[aria-label="Close"]');
    if (dialogTrigger instanceof HTMLButtonElement) {
      dialogTrigger.click();
    }
  };

  if (showFlightSelection) {
    return (
      <Dialog open={showFlightSelection} onOpenChange={setShowFlightSelection}>
        <DialogContent className="sm:max-w-[900px]">
          <FlightSelection
            fromCity={formData.fromCity}
            toCity={formData.toCity}
            formData={formData}
            onBack={() => setShowFlightSelection(false)}
            onNext={() => {
              setShowFlightSelection(false);
              onClose();
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-semibold">Let's Plan Your Travel</h2>

      <div className="space-y-4">
        <Select 
          defaultValue={travelPurposes[0]}
          onValueChange={(value) => setFormData(prev => ({ ...prev, purpose: value }))}
        >
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
                value={formData.fromCity}
                onChange={(city) => setFormData(prev => ({ ...prev, fromCity: city }))}
                cities={usCities}
              />
              <DateSelect
                value={formData.fromDate}
                onChange={(date) => setFormData(prev => ({ ...prev, fromDate: date }))}
              />
              <TimeSelect />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">To</p>
            <div className="grid grid-cols-3 gap-4">
              <CitySelect
                value={formData.toCity}
                onChange={(city) => setFormData(prev => ({ ...prev, toCity: city }))}
                cities={usCities}
              />
              <DateSelect
                value={formData.toDate}
                onChange={(date) => setFormData(prev => ({ ...prev, toDate: date }))}
              />
              <TimeSelect />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <RadioGroup 
            value={formData.bookingType}
            onValueChange={(value: "self" | "team" | "other") => 
              setFormData(prev => ({ ...prev, bookingType: value, selectedTravellers: [] }))
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="self" id="self" />
              <Label htmlFor="self">I am travelling alone</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="team" id="team" />
              <Label htmlFor="team">I am travelling with a team</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">I am booking for someone</Label>
            </div>
          </RadioGroup>

          {(formData.bookingType === "team" || formData.bookingType === "other") && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  Select All Travellers
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[900px]">
                <TravellerSelection
                  fromCity={formData.fromCity}
                  toCity={formData.toCity}
                  onClose={() => {
                    const dialogTrigger = document.querySelector('[aria-label="Close"]');
                    if (dialogTrigger instanceof HTMLButtonElement) {
                      dialogTrigger.click();
                    }
                  }}
                  onSelect={(users) => setFormData(prev => ({ ...prev, selectedTravellers: users }))}
                  defaultSelectedUsers={formData.selectedTravellers}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="documents" className="text-sm font-medium">
              Attach Relevant Documents
            </label>
            <Input
              id="documents"
              type="file"
              multiple
              className="cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setFormData(prev => ({ ...prev, documents: file }));
              }}
            />
          </div>

          {formData.selectedTravellers.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.selectedTravellers.map((traveller) => (
                <div
                  key={traveller.id}
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                >
                  {traveller.email}
                </div>
              ))}
            </div>
          )}

          <Button className="w-full" onClick={handleSubmit}>
            Submit
          </Button>
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