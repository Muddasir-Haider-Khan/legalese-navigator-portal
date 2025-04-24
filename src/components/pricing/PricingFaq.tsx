
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PricingFaq = () => {
  return (
    <div className="bg-gradient-to-br from-bright-orange-50 to-bright-orange-100/50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-bright-orange-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-bright-orange-700">
            Get answers to common questions about our membership plans
          </p>
        </div>

        <div className="mt-12 space-y-8 text-left max-w-3xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
            <h3 className="text-xl font-semibold text-bright-orange-900 mb-2">
              Can I switch between plans?
            </h3>
            <p className="text-bright-orange-700">
              Yes, you can upgrade, downgrade or cancel your plan at any time. When you upgrade, you'll immediately gain access to all the new features. If you downgrade or cancel, you'll continue to have access to your current plan until the end of your billing period.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
            <h3 className="text-xl font-semibold text-bright-orange-900 mb-2">
              Is there a refund policy?
            </h3>
            <p className="text-bright-orange-700">
              We offer a 7-day money-back guarantee for all new subscribers. If you're not satisfied with our service, you can request a full refund within the first week of your subscription.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
            <h3 className="text-xl font-semibold text-bright-orange-900 mb-2">
              How does the "Ask a Lawyer" feature work?
            </h3>
            <p className="text-bright-orange-700">
              The "Ask a Lawyer" feature allows you to chat with a qualified attorney through our platform. Depending on your plan, you'll have a set amount of consultation time per month. You can use this time to ask legal questions, get document reviews, or receive general legal guidance.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link to="/contact">
            <Button variant="orange" size="lg" className="min-w-[200px] text-white shadow-lg">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingFaq;
