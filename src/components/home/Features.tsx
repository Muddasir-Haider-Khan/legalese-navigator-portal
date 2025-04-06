
import { FileText, MessageSquare, Users, Check } from "lucide-react";
import { useState, memo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: <FileText className="h-12 w-12 text-rocket-blue-400" />,
    title: "Legal Document Generation",
    description:
      "Create legally binding documents in minutes with our intelligent document generator",
    benefits: ["Customizable templates", "Expert-reviewed content", "Download as PDF or Word"]
  },
  {
    icon: <MessageSquare className="h-12 w-12 text-rocket-blue-400" />,
    title: "Legal Advice Bot",
    description:
      "Get preliminary legal guidance through our interactive advisor chatbot",
    benefits: ["Step-by-step guidance", "Personalized responses", "Secure and confidential"]
  },
  {
    icon: <Users className="h-12 w-12 text-rocket-blue-400" />,
    title: "Expert Legal Consultation",
    description:
      "Connect with qualified legal professionals for personalized assistance",
    benefits: ["Verified attorneys", "Affordable consultations", "Quick response times"]
  }
];

const FeatureCard = memo(({ feature, isHovered, onHover, onLeave }: {
  feature: typeof features[0],
  isHovered: boolean,
  onHover: () => void,
  onLeave: () => void
}) => (
  <Card 
    className={`border border-rocket-blue-100 dark:border-rocket-blue-800 shadow-lg transition-all duration-300 bg-white dark:bg-rocket-gray-800 h-full ${
      isHovered ? 'shadow-xl transform scale-[1.02]' : ''
    }`}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    <CardHeader>
      <div className={`mb-4 p-3 rounded-lg inline-flex bg-rocket-blue-50 dark:bg-rocket-blue-900/30 ${
        isHovered ? 'text-rocket-blue-500 dark:text-rocket-blue-300' : 'text-rocket-blue-400 dark:text-rocket-blue-400'
      } transition-colors duration-300`}>
        {feature.icon}
      </div>
      <CardTitle className="text-xl font-semibold text-rocket-blue-500 dark:text-rocket-blue-300">
        {feature.title}
      </CardTitle>
      <CardDescription className="text-rocket-gray-600 dark:text-rocket-gray-300">
        {feature.description}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="space-y-3">
        {feature.benefits.map((benefit, idx) => (
          <li key={idx} className="flex items-center gap-3 group">
            <div className={`rounded-full ${isHovered ? 'bg-rocket-blue-100 dark:bg-rocket-blue-800' : 'bg-rocket-blue-50 dark:bg-rocket-blue-900/30'} p-1 transition-colors duration-300`}>
              <Check className={`h-4 w-4 ${isHovered ? 'text-rocket-blue-600 dark:text-rocket-blue-300' : 'text-rocket-blue-400 dark:text-rocket-blue-400'}`} />
            </div>
            <span className={`text-sm ${isHovered ? 'text-rocket-gray-700 dark:text-rocket-gray-200' : 'text-rocket-gray-600 dark:text-rocket-gray-300'} transition-colors duration-300`}>
              {benefit}
            </span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
));

FeatureCard.displayName = 'FeatureCard';

const Features = memo(() => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-rocket-blue-50 dark:from-rocket-gray-900 dark:to-rocket-gray-800 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-rocket-blue-400 to-rocket-blue-600 dark:from-rocket-blue-300 dark:to-rocket-blue-500 bg-clip-text text-transparent">
            How Rocket Lawyer Works
          </h2>
          <p className="text-lg text-rocket-gray-600 dark:text-rocket-gray-300 max-w-3xl mx-auto">
            Our platform simplifies legal services, making them accessible and affordable for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <FeatureCard 
                feature={feature} 
                isHovered={hoveredIndex === index}
                onHover={() => setHoveredIndex(index)}
                onLeave={() => setHoveredIndex(null)}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="hidden md:block absolute -bottom-40 -left-40 w-80 h-80 bg-rocket-blue-100 dark:bg-rocket-blue-900/20 rounded-full opacity-30 blur-3xl"></div>
      <div className="hidden md:block absolute -top-40 -right-40 w-80 h-80 bg-rocket-blue-100 dark:bg-rocket-blue-900/20 rounded-full opacity-20 blur-3xl"></div>
    </section>
  );
});

Features.displayName = 'Features';

export default Features;
