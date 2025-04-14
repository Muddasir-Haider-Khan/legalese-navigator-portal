
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight, Star } from "lucide-react";
import { memo } from "react";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-burgundy-50 dark:bg-burgundy-900/20">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-burgundy-900 dark:text-white mb-6">
              Join millions who trust Legal Gram
            </h2>
            <p className="text-lg text-burgundy-600 dark:text-burgundy-300 mb-6">
              Get access to all our legal documents, attorney advice, and more with a monthly membership.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-2">
                <Star className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-medium text-burgundy-900 dark:text-white">Trusted by millions</span>
                  <p className="text-burgundy-600 dark:text-burgundy-400">Over 20 million people have used our services</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Star className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-medium text-burgundy-900 dark:text-white">Affordable legal help</span>
                  <p className="text-burgundy-600 dark:text-burgundy-400">Access legal services at a fraction of traditional costs</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Star className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-medium text-burgundy-900 dark:text-white">Cancel anytime</span>
                  <p className="text-burgundy-600 dark:text-burgundy-400">No long-term commitments or hidden fees</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-wine-800 hover:bg-wine-900 px-8 py-6 h-auto text-base text-white">
                  Sign up now
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="border-wine-500 text-white hover:bg-wine-50 dark:border-wine-400 dark:hover:bg-wine-900/30 px-8 py-6 h-auto text-base">
                  See pricing
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-white dark:bg-burgundy-800 rounded-xl p-8 shadow-lg border border-burgundy-200 dark:border-burgundy-700">
            <h3 className="text-2xl font-semibold mb-6 text-burgundy-900 dark:text-white">
              What our customers say
            </h3>
            
            <div className="space-y-6">
              <div className="border-l-4 border-wine-500 pl-4">
                <p className="text-burgundy-600 dark:text-burgundy-300 italic mb-4">
                  "Legal Gram made creating my LLC so easy. The step-by-step process and customer service were excellent!"
                </p>
                <p className="font-medium text-burgundy-900 dark:text-white">— Michael T., Small Business Owner</p>
              </div>
              
              <div className="border-l-4 border-wine-500 pl-4">
                <p className="text-burgundy-600 dark:text-burgundy-300 italic mb-4">
                  "I was able to create my will quickly and easily. The guidance provided made the process stress-free."
                </p>
                <p className="font-medium text-burgundy-900 dark:text-white">— Sarah L., Family Protection</p>
              </div>
              
              <div className="flex items-center justify-between mt-6">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} fill="currentColor" className="h-5 w-5 text-yellow-500" />
                  ))}
                </div>
                <Link to="/testimonials" className="text-wine-500 hover:text-wine-600 dark:text-wine-400 dark:hover:text-wine-300 inline-flex items-center group">
                  <span>Read more</span>
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-burgundy-200 dark:border-burgundy-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold text-wine-500">4.8/5</div>
                  <div className="text-sm text-burgundy-500">Overall rating</div>
                </div>
                <a
                  href="#"
                  className="text-burgundy-500 hover:text-burgundy-700 dark:hover:text-burgundy-300 inline-flex items-center"
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
