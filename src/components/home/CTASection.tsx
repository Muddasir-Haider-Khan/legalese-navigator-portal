
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="container-custom section-padding">
      <div className="bg-gradient-to-r from-rocket-blue-500 to-rocket-blue-600 rounded-xl p-8 md:p-12 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-rocket-gray-100 mb-6">
              Join thousands of individuals and businesses who trust Rocket Lawyer for their legal needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-rocket-blue-500 hover:bg-rocket-gray-100">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-rocket-blue-600">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="font-semibold text-xl mb-4">Popular Legal Documents</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <span>Last Will and Testament</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <span>Non-Disclosure Agreement</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <span>Power of Attorney</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <span>Employment Contract</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <span>Rental Agreement</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
