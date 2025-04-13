
import { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, you would send this message to your backend
      console.log("Sending message:", message);
      setMessage("");
    }
  };
  
  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={chatRef}>
      {/* Chat Popup */}
      {isOpen && (
        <div className="mb-4 w-80 rounded-lg shadow-lg overflow-hidden animate-fade-in">
          {/* Chat Header */}
          <div className="bg-emerald-700 text-white p-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2 border-2 border-white">
                <div className="bg-red-500 w-full h-full flex items-center justify-center text-white text-xs font-bold">
                  <span>LG</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Legal Gram Support</h3>
                <p className="text-xs opacity-90">Typically replies within 1 hour</p>
              </div>
            </div>
            <button 
              onClick={toggleChat} 
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="bg-gray-100 h-60 overflow-auto p-3 bg-[url('/lovable-uploads/386a6ab3-6e61-47e3-ac6e-8da415db5752.png')] bg-opacity-10">
            <div className="bg-white rounded-lg p-3 shadow-sm max-w-[80%] mb-2">
              <p className="text-xs text-gray-500 font-medium mb-1">Legal Gram Support</p>
              <p className="text-gray-800">Hello there! 👋</p>
              <p className="text-gray-800">How can we help?</p>
              <p className="text-xs text-gray-400 text-right mt-1">02:55 AM ✓✓</p>
            </div>
          </div>
          
          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="bg-white p-2 flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <button 
              type="submit" 
              className="ml-2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors"
            >
              <Send size={18} className="text-gray-600" />
            </button>
          </form>
        </div>
      )}
      
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="bg-green-500 hover:bg-green-600 transition-colors rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
        aria-label="Open chat"
      >
        {!isOpen && <MessageCircle size={28} className="text-white" />}
      </button>
    </div>
  );
};

export default ChatWidget;
