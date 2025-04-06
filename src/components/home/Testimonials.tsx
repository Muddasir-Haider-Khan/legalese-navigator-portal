
import { useState } from "react";
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

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="bg-rocket-gray-50 py-16 md:py-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-md mb-4">What Our Clients Say</h2>
          <p className="text-lg text-rocket-gray-500 max-w-3xl mx-auto">
            Join thousands of satisfied clients who have simplified their legal needs with Rocket Lawyer.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 relative">
            <div className="absolute top-8 left-8">
              <Quote className="h-12 w-12 text-rocket-blue-100" />
            </div>
            
            <div className="relative z-10">
              <p className="text-xl md:text-2xl text-rocket-gray-700 italic mb-8 pt-8 pl-6">
                "{testimonials[currentIndex].quote}"
              </p>
              
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].author}
                  className="w-14 h-14 rounded-full object-cover"
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

          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full border border-rocket-gray-200 hover:bg-rocket-blue-50 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-rocket-blue-500" />
            </button>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-rocket-blue-500" : "bg-rocket-gray-300"
                }`}
              />
            ))}
            <button
              onClick={handleNext}
              className="p-2 rounded-full border border-rocket-gray-200 hover:bg-rocket-blue-50 transition-colors"
            >
              <ArrowRight className="h-5 w-5 text-rocket-blue-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
