import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PricingFaq = () => {
  return (
    <div className="bg-[#fef1de]">
      <div className="container mx-auto px-4 py-16 relative overflow-hidden">
        <div className="absolute -left-20 top-20 w-60 h-60 bg-bright-orange-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -right-20 bottom-20 w-60 h-60 bg-bright-orange-500/5 rounded-full blur-3xl animate-pulse delay-300" />

        <div className="text-center relative z-10">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-bright-orange-700 via-bright-orange-600 to-bright-orange-500 bg-clip-text text-transparent animate-fade-in">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-bright-orange-600 animate-fade-in delay-100">
            Get answers to common questions about our membership plans
          </p>
        </div>

        <div className="mt-12 space-y-8 text-left max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white hover:scale-[1.02] animate-fade-in delay-200">
            <h3 className="text-xl font-semibold text-bright-orange-700 mb-2">
              Can I switch between plans?
            </h3>
            <p className="text-bright-orange-600">
              Yes, you can upgrade, downgrade or cancel your plan at any time. When you upgrade, you'll immediately gain access to all the new features. If you downgrade or cancel, you'll continue to have access to your current plan until the end of your billing period.
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white hover:scale-[1.02] animate-fade-in delay-300">
            <h3 className="text-xl font-semibold text-bright-orange-700 mb-2">
              Is there a refund policy?
            </h3>
            <p className="text-bright-orange-600">
              We offer a 7-day money-back guarantee for all new subscribers. If you're not satisfied with our service, you can request a full refund within the first week of your subscription.
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white hover:scale-[1.02] animate-fade-in delay-400">
            <h3 className="text-xl font-semibold text-bright-orange-700 mb-2">
              How does the "Ask a Lawyer" feature work?
            </h3>
            <p className="text-bright-orange-600">
              The "Ask a Lawyer" feature allows you to chat with a qualified attorney through our platform. Depending on your plan, you'll have a set amount of consultation time per month. You can use this time to ask legal questions, get document reviews, or receive general legal guidance.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12 relative z-10">
          <Link to="/contact">
            <Button variant="orange" size="lg" className="min-w-[200px] text-white shadow-lg hover:scale-105 transition-transform bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 hover:from-bright-orange-600 hover:to-bright-orange-700">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingFaq;
