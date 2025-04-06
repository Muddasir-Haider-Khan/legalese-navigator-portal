
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Rocket Lawyer helped me set up my business with all the legal documents I needed. The process was surprisingly easy and affordable.",
    author: "Sarah Johnson",
    title: "Small Business Owner",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
  },
  {
    quote: "When I needed legal advice quickly, the chatbot guided me through my options and connected me with an attorney who resolved my issue.",
    author: "Michael Rodriguez",
    title: "Homeowner",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
  },
  {
    quote: "Creating my will was something I kept putting off, but Rocket Lawyer made it simple. I completed it in under an hour with their guidance.",
    author: "Emily Chen",
    title: "Healthcare Professional",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handlePrev = () => {
    if (animating) return;
    
    setAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    
    setTimeout(() => setAnimating(false), 500);
  };

  const handleNext = () => {
    if (animating) return;
    
    setAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    
    setTimeout(() => setAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section className="bg-rocket-gray-50 py-20 md:py-28 relative overflow-hidden">
      <div className="hidden md:block absolute -bottom-40 left-20 w-80 h-80 bg-rocket-blue-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="hidden md:block absolute -top-40 right-20 w-80 h-80 bg-rocket-blue-100 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-14 animate-fade-in">
          <h2 className="heading-md mb-4 text-gradient">What Our Clients Say</h2>
          <p className="text-lg text-rocket-gray-500 max-w-3xl mx-auto">
            Join thousands of satisfied clients who have simplified their legal needs with Rocket Lawyer.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-10 md:p-14 relative futuristic-border futuristic-glow">
            <div className="absolute top-8 left-8 opacity-30">
              <Quote className="h-16 w-16 text-rocket-blue-200" />
            </div>
            
            <div className="relative z-10">
              <div key={currentIndex} className={`${animating ? 'animate-fade-in' : ''}`}>
                <p className="text-xl md:text-2xl text-rocket-gray-700 italic mb-10 pt-8 pl-6 leading-relaxed">
                  "{testimonials[currentIndex].quote}"
                </p>
                
                <div className="flex items-center gap-5">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].author}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-rocket-blue-100 p-1"
                  />
                  <div>
                    <h4 className="font-semibold text-lg text-rocket-blue-500">
                      {testimonials[currentIndex].author}
                    </h4>
                    <p className="text-rocket-gray-500">
                      {testimonials[currentIndex].title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10 gap-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full border border-rocket-gray-200 hover:bg-rocket-blue-50 transition-colors hover:shadow-md group"
            >
              <ArrowLeft className="h-5 w-5 text-rocket-blue-500 group-hover:scale-110 transition-transform" />
            </button>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAnimating(true);
                  setCurrentIndex(index);
                  setTimeout(() => setAnimating(false), 500);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-rocket-blue-500 w-6" 
                    : "bg-rocket-gray-300 hover:bg-rocket-gray-400"
                }`}
              />
            ))}
            <button
              onClick={handleNext}
              className="p-2 rounded-full border border-rocket-gray-200 hover:bg-rocket-blue-50 transition-colors hover:shadow-md group"
            >
              <ArrowRight className="h-5 w-5 text-rocket-blue-500 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
