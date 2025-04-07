
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const lawyerTypes = [
  { id: 1, name: "Family Law", description: "Divorce, custody, adoption" },
  { id: 2, name: "Corporate Law", description: "Business formation, contracts" },
  { id: 3, name: "Real Estate", description: "Property transactions, landlord-tenant" },
  { id: 4, name: "Intellectual Property", description: "Patents, trademarks, copyrights" },
  { id: 5, name: "Criminal Defense", description: "Criminal charges, DUI/DWI" }
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", 
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

const ScheduleMeeting = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedLawyerType, setSelectedLawyerType] = useState<string>("");

  const handleSchedule = () => {
    if (!date || !selectedTime || !selectedLawyerType) {
      toast.error("Please select all required fields");
      return;
    }

    // In a real app, we would send this data to the backend
    toast.success("Meeting scheduled successfully!");
    
    // Reset form
    setDate(undefined);
    setSelectedTime("");
    setSelectedLawyerType("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-lg mb-2">Schedule a Meeting</h1>
        <p className="text-rocket-gray-500 mb-6">
          Select a date, time, and lawyer type to schedule your consultation.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="heading-sm mb-4">Select Date & Time</h2>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(date) => {
                // Disable past dates and weekends
                const now = new Date();
                now.setHours(0, 0, 0, 0);
                
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                return date < now || isWeekend;
              }}
            />
            
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Select Time</label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="heading-sm mb-4">Select Lawyer Type</h2>
          <div className="space-y-4">
            {lawyerTypes.map((lawyer) => (
              <Card key={lawyer.id} className={`cursor-pointer transition-all ${selectedLawyerType === lawyer.name ? 'ring-2 ring-rocket-blue-500' : ''}`} onClick={() => setSelectedLawyerType(lawyer.name)}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{lawyer.name}</CardTitle>
                  <CardDescription>{lawyer.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          
          <Button 
            className="w-full mt-6" 
            disabled={!date || !selectedTime || !selectedLawyerType}
            onClick={handleSchedule}
          >
            Schedule Consultation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleMeeting;
