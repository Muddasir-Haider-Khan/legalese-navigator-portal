
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Clock, Users, MessageSquare } from "lucide-react";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSchedule = () => {
    if (!date || !selectedTime || !selectedLawyerType || !name || !email) {
      toast.error("Please fill in all required fields");
      return;
    }

    // In a real app, we would send this data to the backend
    toast.success("Consultation request submitted successfully!");
    
    // Reset form
    setDate(undefined);
    setSelectedTime("");
    setSelectedLawyerType("");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Book a Consultation</h1>
        <p className="text-muted-foreground mb-6">
          Fill out the form below to schedule a consultation with one of our legal experts.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Your Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name *</label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="John Doe" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address *</label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="john@example.com" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="(555) 123-4567" 
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Additional Details</label>
                  <Textarea 
                    id="message" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder="Please describe your legal issue briefly..." 
                    rows={4} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5" />
                Select Date
              </h2>
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
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Select Time
              </h2>
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
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Select Legal Area
              </h2>
              <div className="space-y-3">
                {lawyerTypes.map((lawyer) => (
                  <Card key={lawyer.id} className={`cursor-pointer transition-all ${selectedLawyerType === lawyer.name ? 'ring-2 ring-primary' : ''}`} onClick={() => setSelectedLawyerType(lawyer.name)}>
                    <CardContent className="p-3">
                      <div className="font-medium">{lawyer.name}</div>
                      <div className="text-sm text-muted-foreground">{lawyer.description}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Button 
            className="w-full mt-6" 
            size="lg"
            disabled={!date || !selectedTime || !selectedLawyerType || !name || !email}
            onClick={handleSchedule}
          >
            Book Consultation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleMeeting;
