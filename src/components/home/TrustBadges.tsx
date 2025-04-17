
import { memo } from "react";
import { Shield, Award, CheckCircle } from "lucide-react";

const TrustBadges = () => {
  return (
    <section className="py-8 bg-white border-b border-rocket-gray-200">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-8 items-center">
          {/* Lady Justice Image */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-40 h-40 overflow-hidden">
              <img 
                src="/lovable-uploads/66ac3e53-bebc-4d42-bc8f-402b45725a99.png" 
                alt="Lady Justice Statue" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="md:col-span-3">
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 md:gap-12">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#F18F01]" />
                <span className="text-sm md:text-base font-medium text-black">100% Secure & Confidential</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#F18F01]" />
                <span className="text-sm md:text-base font-medium text-black">Attorney-Reviewed Documents</span>
              </div>
              
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#F18F01]" />
                <span className="text-sm md:text-base font-medium text-black">Trusted by 20M+ Customers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(TrustBadges);
