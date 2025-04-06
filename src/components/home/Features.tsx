
import { FileText, MessageSquare, Users, Check } from "lucide-react";

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
  return (
    <section className="container-custom section-padding">
      <div className="text-center mb-12">
        <h2 className="heading-md mb-4">How Rocket Lawyer Works</h2>
        <p className="text-lg text-rocket-gray-500 max-w-3xl mx-auto">
          Our platform simplifies legal services, making them accessible and affordable for everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg p-6 shadow-lg border border-rocket-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-3 text-rocket-blue-500">{feature.title}</h3>
            <p className="text-rocket-gray-500 mb-4">{feature.description}</p>
            <ul className="space-y-2">
              {feature.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-rocket-blue-400" />
                  <span className="text-sm text-rocket-gray-500">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
