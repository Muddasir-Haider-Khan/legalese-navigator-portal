
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Users, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ScheduleMeeting = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSchedule = async () => {
    if (!name || !email) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app with Supabase, this would store the consultation
      // const { data, error } = await supabase
      //   .from('consultations')
      //   .insert([
      //     { name, email, phone, message, status: 'pending' }
      //   ]);
      
      // if (error) throw error;

      // For now, we're just showing a success toast
      toast.success("Consultation request submitted successfully!");
      
      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting consultation:", error);
      toast.error("There was a problem submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Book a Consultation</h1>
        <p className="text-muted-foreground mb-6">
          Fill out the form below to schedule a consultation with one of our legal experts.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
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
                <label htmlFor="message" className="block text-sm font-medium mb-1 flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Additional Details
                </label>
                <Textarea 
                  id="message" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  placeholder="Please describe your legal issue briefly..." 
                  rows={4} 
                />
              </div>
            </div>
            <Button 
              className="w-full mt-6" 
              size="lg"
              disabled={!name || !email || isSubmitting}
              onClick={handleSchedule}
            >
              {isSubmitting ? "Submitting..." : "Book Consultation"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScheduleMeeting;
