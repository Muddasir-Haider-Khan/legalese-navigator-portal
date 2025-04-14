
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight, Star } from "lucide-react";
import { memo } from "react";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-gray-900/20">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Join millions who trust Legal Gram
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Get access to all our legal documents, attorney advice, and more with a monthly membership.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-2">
                <Star className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Trusted by millions</span>
                  <p className="text-gray-600 dark:text-gray-400">Over 20 million people have used our services</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Star className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Affordable legal help</span>
                  <p className="text-gray-600 dark:text-gray-400">Access legal services at a fraction of traditional costs</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Star className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Cancel anytime</span>
                  <p className="text-gray-600 dark:text-gray-400">No long-term commitments or hidden fees</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-bright-red-500 hover:bg-bright-red-600 px-8 py-6 h-auto text-base text-white">
                  Sign up now
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="border-bright-red-500 text-bright-red-500 hover:bg-bright-red-50 dark:border-bright-red-400 dark:text-bright-red-400 dark:hover:bg-bright-red-900/30 px-8 py-6 h-auto text-base">
                  See pricing
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              What our customers say
            </h3>
            
            <div className="space-y-6">
              <div className="border-l-4 border-bright-red-500 pl-4">
                <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                  "Legal Gram made creating my LLC so easy. The step-by-step process and customer service were excellent!"
                </p>
                <p className="font-medium text-gray-900 dark:text-white">— Michael T., Small Business Owner</p>
              </div>
              
              <div className="border-l-4 border-bright-red-500 pl-4">
                <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                  "I was able to create my will quickly and easily. The guidance provided made the process stress-free."
                </p>
                <p className="font-medium text-gray-900 dark:text-white">— Sarah L., Family Protection</p>
              </div>
              
              <div className="flex items-center justify-between mt-6">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} fill="currentColor" className="h-5 w-5 text-yellow-500" />
                  ))}
                </div>
                <Link to="/testimonials" className="text-bright-red-500 hover:text-bright-red-600 dark:text-bright-red-400 dark:hover:text-bright-red-300 inline-flex items-center group">
                  <span>Read more</span>
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold text-bright-red-500">4.8/5</div>
                  <div className="text-sm text-gray-500">Overall rating</div>
                </div>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 inline-flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-sm">Verified reviews</span>
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(CTASection);
