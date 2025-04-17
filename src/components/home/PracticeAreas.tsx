
import { memo } from "react";
import { Link } from "react-router-dom";
import { 
  Home, 
  Building, 
  Users, 
  FileText, 
  Briefcase, 
  Scale, 
  ScrollText, 
  HelpingHand,
  GraduationCap
} from "lucide-react";

const PracticeAreas = () => {
  const areas = [
    { icon: Home, name: "Real Estate", path: "/documents/real-estate" },
    { icon: Building, name: "Business Formation", path: "/documents/business" },
    { icon: Users, name: "Family Law", path: "/documents/family" },
    { icon: FileText, name: "Estate Planning", path: "/documents/estate" },
    { icon: Briefcase, name: "Employment", path: "/documents/employment" },
    { icon: Scale, name: "Civil Litigation", path: "/documents/litigation" },
    { icon: ScrollText, name: "Contracts", path: "/documents/contracts" },
    { icon: HelpingHand, name: "Intellectual Property", path: "/documents/ip" },
    { icon: GraduationCap, name: "Education Law", path: "/documents/education" }
  ];

  return (
    <section className="py-16 md:py-24 bg-rocket-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-rocket-blue-500 font-medium mb-2 block text-black">Practice Areas</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Legal Solutions for Every Need
          </h2>
          <p className="text-lg text-black max-w-3xl mx-auto">
            We offer comprehensive legal services across many practice areas.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {areas.map((area, index) => {
            const Icon = area.icon;
            return (
              <Link 
                to={area.path} 
                key={index}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm border border-rocket-gray-200 hover:shadow-md transition-shadow text-center"
              >
                <div className="bg-rocket-blue-50 p-4 rounded-full mb-4">
                  <Icon className="h-6 w-6 text-[#F18F01]" />
                </div>
                <h3 className="font-medium text-black">{area.name}</h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default memo(PracticeAreas);
