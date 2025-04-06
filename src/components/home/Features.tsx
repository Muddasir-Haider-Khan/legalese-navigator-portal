
import { FileText, MessageSquare, Users, Check, Shield } from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: <FileText className="h-10 w-10 text-rocket-blue-500" />,
    title: "Legal Document Generation",
    description:
      "Create legally binding documents in minutes with our intelligent document generator",
    benefits: ["Customizable templates", "Expert-reviewed content", "Download as PDF or Word"]
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-rocket-blue-500" />,
    title: "Legal Advice Bot",
    description:
      "Get preliminary legal guidance through our interactive advisor chatbot",
    benefits: ["Step-by-step guidance", "Personalized responses", "Secure and confidential"]
  },
  {
    icon: <Users className="h-10 w-10 text-rocket-blue-500" />,
    title: "Expert Legal Consultation",
    description:
      "Connect with qualified legal professionals for personalized assistance",
    benefits: ["Verified attorneys", "Affordable consultations", "Quick response times"]
  }
];

const Features = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="container-custom section-padding relative overflow-hidden">
      <div className="text-center mb-14 animate-fade-in">
        <h2 className="heading-md mb-4 text-gradient">How Rocket Lawyer Works</h2>
        <p className="text-lg text-rocket-gray-500 max-w-3xl mx-auto">
          Our platform simplifies legal services, making them accessible and affordable for everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index}
            className={`glass-card futuristic-border rounded-xl p-8 transition-all duration-300 animate-fade-in ${
              hoveredIndex === index ? 'futuristic-glow scale-[1.02]' : ''
            }`}
            style={{ animationDelay: `${index * 0.2}s` }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="mb-4 transform transition-transform duration-300">
              <div className={`rounded-full w-16 h-16 flex items-center justify-center bg-rocket-blue-50 ${
                hoveredIndex === index ? 'animate-pulse' : ''
              }`}>
                {feature.icon}
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-rocket-blue-500">{feature.title}</h3>
            <p className="text-rocket-gray-500 mb-6">{feature.description}</p>
            <ul className="space-y-3">
              {feature.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-3 group">
                  <div className="rounded-full bg-rocket-blue-50 p-1 group-hover:bg-rocket-blue-100 transition-colors">
                    <Check className="h-4 w-4 text-rocket-blue-500" />
                  </div>
                  <span className="text-sm text-rocket-gray-500 group-hover:text-rocket-gray-700 transition-colors">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="hidden md:block absolute -bottom-40 -left-40 w-80 h-80 bg-rocket-blue-50 rounded-full opacity-30 blur-3xl"></div>
      <div className="hidden md:block absolute -top-40 -right-40 w-80 h-80 bg-rocket-blue-50 rounded-full opacity-20 blur-3xl"></div>
    </section>
  );
};

export default Features;
