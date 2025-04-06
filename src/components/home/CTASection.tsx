
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="container-custom section-padding">
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-rocket-blue-600 to-rocket-blue-800"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
        </div>
        
        <div className="relative z-10 p-10 md:p-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to get started?</h2>
              <p className="text-rocket-gray-100 mb-6 max-w-md">
                Join thousands of individuals and businesses who trust Rocket Lawyer for their legal needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-rocket-blue-500 hover:bg-rocket-gray-100 hover:shadow-lg transition-all duration-300 group">
                    Create Free Account
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-rocket-blue-600/50 transition-all duration-300">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="glass-card backdrop-blur-md bg-white/10 rounded-xl p-8 border border-white/20 shadow-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h3 className="font-semibold text-xl mb-6 text-white">Popular Legal Documents</h3>
              <ul className="space-y-4">
                {[
                  "Last Will and Testament",
                  "Non-Disclosure Agreement",
                  "Power of Attorney",
                  "Employment Contract",
                  "Rental Agreement"
                ].map((item, index) => (
                  <li key={index} className="group">
                    <Link to="/documents" className="flex items-center gap-3 text-white/90 hover:text-white transition-colors">
                      <div className="w-2 h-2 rounded-full bg-white/70 group-hover:bg-white group-hover:animate-pulse transition-colors"></div>
                      <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-rocket-blue-900/30 to-transparent"></div>
      </div>
    </section>
  );
};

export default CTASection;
