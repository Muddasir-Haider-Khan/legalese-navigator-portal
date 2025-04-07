
import { useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Check, X, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";

// Define plan feature types
interface PlanFeature {
  name: string;
  included: boolean;
  info?: string;
}

// Define plan types
interface Plan {
  name: string;
  price: {
    monthly: number;
    annually: number;
  };
  description: string;
  features: PlanFeature[];
  callToAction: string;
  popular?: boolean;
}

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("annually");
  
  const plans: Plan[] = [
    {
      name: "Free",
      price: {
        monthly: 0,
        annually: 0
      },
      description: "Basic legal tools for essential needs",
      features: [
        { name: "Access to document templates", included: true },
        { name: "Create up to 3 legal documents", included: true },
        { name: "Basic legal guides", included: true },
        { name: "Download documents as PDF", included: true },
        { name: "Email support", included: true },
        { name: "Ask a Lawyer (limited)", included: false },
        { name: "Unlimited document creation", included: false },
        { name: "Priority support", included: false },
        { name: "Attorney document review", included: false },
        { name: "Phone consultations", included: false },
      ],
      callToAction: "Sign up for free"
    },
    {
      name: "Premium",
      price: {
        monthly: 29.99,
        annually: 19.99
      },
      description: "Comprehensive legal coverage for individuals & families",
      features: [
        { name: "Access to document templates", included: true },
        { name: "Create unlimited legal documents", included: true },
        { name: "Comprehensive legal guides", included: true },
        { name: "Download documents as PDF", included: true },
        { name: "Priority email & chat support", included: true },
        { name: "Ask a Lawyer (30 min/month)", included: true },
        { name: "Unlimited document creation", included: true },
        { name: "Document storage & organization", included: true },
        { name: "Attorney document review", included: false },
        { name: "Phone consultations", included: false },
      ],
      callToAction: "Start Premium",
      popular: true
    },
    {
      name: "Business",
      price: {
        monthly: 49.99,
        annually: 39.99
      },
      description: "Complete legal solution for businesses of all sizes",
      features: [
        { name: "Access to document templates", included: true },
        { name: "Create unlimited legal documents", included: true },
        { name: "Business-specific legal guides", included: true },
        { name: "Download documents as PDF", included: true },
        { name: "Priority support (24/7)", included: true },
        { name: "Ask a Lawyer (60 min/month)", included: true, info: "Unlimited chat with business attorneys" },
        { name: "Unlimited document creation", included: true },
        { name: "Document storage & organization", included: true },
        { name: "Attorney document review", included: true, info: "Up to 5 documents per month" },
        { name: "Phone consultations", included: true, info: "Scheduled calls with business attorneys" },
      ],
      callToAction: "Start Business Plan"
    }
  ];
  
  const calculateSavings = (plan: Plan) => {
    const annualCost = plan.price.annually * 12;
    const monthlyCost = plan.price.monthly * 12;
    const savings = monthlyCost - annualCost;
    const savingsPercentage = (savings / monthlyCost) * 100;
    
    return {
      amount: savings,
      percentage: Math.round(savingsPercentage)
    };
  };

  return (
    <Layout>
      <Helmet>
        <title>Membership & Pricing Plans | Rocket Lawyer</title>
        <meta name="description" content="Choose the perfect legal plan for your needs. Our flexible pricing plans provide access to legal documents, attorney advice, and more." />
      </Helmet>

      <div className="bg-gradient-to-b from-rocket-blue-800 to-rocket-blue-700 dark:from-rocket-blue-900 dark:to-rocket-blue-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Legal Plans That <span className="text-gradient-blue">Fit Your Needs</span>
          </h1>
          <p className="text-xl md:text-2xl text-rocket-gray-200 max-w-3xl mx-auto mb-8">
            Choose the perfect legal plan for your personal or business needs with our flexible pricing options.
          </p>
          
          <div className="inline-flex items-center p-1 bg-rocket-blue-600/30 backdrop-blur-sm rounded-lg max-w-xs mx-auto mb-12">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-3 ${
                billingCycle === "monthly"
                  ? "bg-white text-rocket-blue-600"
                  : "text-white"
              } rounded-md transition-all duration-300 font-medium text-sm`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annually")}
              className={`px-6 py-3 ${
                billingCycle === "annually"
                  ? "bg-white text-rocket-blue-600"
                  : "text-white"
              } rounded-md transition-all duration-300 font-medium text-sm`}
            >
              Annually
            </button>
          </div>

          {billingCycle === "annually" && (
            <div className="bg-rocket-blue-50 text-rocket-blue-700 dark:bg-rocket-blue-900 dark:text-rocket-blue-300 py-2 px-4 rounded-full inline-flex items-center mb-8 font-medium text-sm">
              <span className="mr-2">🎉</span> Save up to 33% with annual billing
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-rocket-gray-900 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => {
              const savings = calculateSavings(plan);
              
              return (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl overflow-hidden border ${
                    plan.popular
                      ? "border-rocket-blue-500 shadow-lg shadow-rocket-blue-100 dark:shadow-rocket-blue-900/20"
                      : "border-rocket-gray-200 dark:border-rocket-gray-700"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-rocket-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-rocket-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-rocket-gray-500 dark:text-rocket-gray-400 mb-6">
                      {plan.description}
                    </p>
                    
                    <div className="mb-6">
                      <div className="flex items-end">
                        <span className="text-4xl font-bold text-rocket-gray-900 dark:text-white">
                          ${plan.price[billingCycle]}
                        </span>
                        <span className="text-rocket-gray-500 dark:text-rocket-gray-400 ml-1 mb-1">
                          /month
                        </span>
                      </div>
                      
                      {billingCycle === "annually" && plan.price.annually > 0 && (
                        <div className="text-sm text-rocket-green-600 dark:text-rocket-green-400 font-medium mt-1">
                          Save ${savings.amount.toFixed(2)} per year ({savings.percentage}%)
                        </div>
                      )}
                      
                      <div className="text-xs text-rocket-gray-500 dark:text-rocket-gray-400 mt-1">
                        {billingCycle === "annually" ? "Billed annually" : "Billed monthly"}
                      </div>
                    </div>
                    
                    <Button 
                      className={`w-full ${
                        plan.popular
                          ? "bg-rocket-blue-500 hover:bg-rocket-blue-600 text-white"
                          : ""
                      } mb-8`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.callToAction}
                    </Button>
                    
                    <div className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-rocket-green-500 mr-3 flex-shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-rocket-gray-300 dark:text-rocket-gray-600 mr-3 flex-shrink-0" />
                          )}
                          <span className={`text-sm ${
                            feature.included
                              ? "text-rocket-gray-700 dark:text-rocket-gray-200"
                              : "text-rocket-gray-500 dark:text-rocket-gray-400"
                          }`}>
                            {feature.name}
                          </span>
                          
                          {feature.info && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button className="ml-1">
                                    <HelpCircle className="h-3.5 w-3.5 text-rocket-gray-400" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs max-w-xs">{feature.info}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-rocket-blue-50 dark:bg-rocket-gray-800 py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-rocket-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-rocket-gray-600 dark:text-rocket-gray-300 mb-12">
              Get answers to common questions about our membership plans
            </p>
            
            <div className="space-y-8 text-left">
              <div>
                <h3 className="text-xl font-semibold text-rocket-gray-900 dark:text-white mb-2">
                  Can I switch between plans?
                </h3>
                <p className="text-rocket-gray-600 dark:text-rocket-gray-400">
                  Yes, you can upgrade, downgrade or cancel your plan at any time. When you upgrade, you'll immediately gain access to all the new features. If you downgrade or cancel, you'll continue to have access to your current plan until the end of your billing period.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-rocket-gray-900 dark:text-white mb-2">
                  Is there a refund policy?
                </h3>
                <p className="text-rocket-gray-600 dark:text-rocket-gray-400">
                  We offer a 7-day money-back guarantee for all new subscribers. If you're not satisfied with our service, you can request a full refund within the first week of your subscription.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-rocket-gray-900 dark:text-white mb-2">
                  How does the "Ask a Lawyer" feature work?
                </h3>
                <p className="text-rocket-gray-600 dark:text-rocket-gray-400">
                  The "Ask a Lawyer" feature allows you to chat with a qualified attorney through our platform. Depending on your plan, you'll have a set amount of consultation time per month. You can use this time to ask legal questions, get document reviews, or receive general legal guidance.
                </p>
              </div>
              
              <div className="text-center mt-12">
                <Link to="/contact">
                  <Button variant="outline" className="min-w-[200px]">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-rocket-blue-800 dark:bg-rocket-blue-900 py-16 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Not sure which plan is right for you?
              </h2>
              <p className="text-rocket-gray-200 max-w-xl">
                Our legal experts can help you choose the perfect plan for your specific legal needs. Schedule a free consultation today.
              </p>
            </div>
            
            <Link to="/contact">
              <Button size="lg" className="bg-white text-rocket-blue-800 hover:bg-rocket-gray-100">
                Get Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
