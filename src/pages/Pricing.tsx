import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, X, HelpCircle, ChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import Layout from "@/components/layout/Layout";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface PlanFeature {
  name: string;
  included: boolean;
  info?: string;
}

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
  const isMobile = useIsMobile();
  
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

      <div className={cn(
        "relative overflow-hidden",
        isMobile ? "py-8" : "py-16"
      )}>
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-rocket-blue-800/90 via-rocket-blue-700/70 to-rocket-blue-800/80"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <div className={cn(
            "inline-flex items-center justify-center bg-gradient-to-r from-[#F97316]/90 to-[#FFBB66]/90 px-3 py-1.5 rounded-full mb-4 text-white shadow-lg transform hover:scale-105 transition-all duration-300",
            isMobile ? "text-xs" : "text-sm"
          )}>
            Pricing Plans
          </div>
          
          <h1 className={cn(
            "font-bold mb-4 text-white leading-tight tracking-tight animate-fade-in",
            isMobile ? "text-2xl" : "text-2xl md:text-5xl lg:text-6xl"
          )}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-200">Legal</span> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F97316] to-[#FFBB66] px-2">Plans</span> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-200">Tailored for You</span>
          </h1>
          
          <div className={cn(
            "bg-gradient-to-r from-[#F97316] to-[#FFBB66] mx-auto rounded-full shadow-glow",
            isMobile ? "h-0.5 w-16 my-3" : "h-1.5 w-32 my-8"
          )}></div>
          
          <p className={cn(
            "leading-relaxed text-white/90 max-w-3xl mx-auto mb-6 animate-fade-in delay-100",
            isMobile 
              ? "text-sm px-2" 
              : "text-sm md:text-xl px-2 md:px-0"
          )}>
            Discover flexible legal plans designed to provide comprehensive support for individuals and businesses. Choose the perfect plan that fits your legal needs.
          </p>
          
          <div className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-xl shadow-lg mb-6">
            <span className={cn(
              `text-sm font-medium`, 
              billingCycle === "monthly" ? "text-white" : "text-white/70"
            )}>Monthly</span>
            <Switch 
              checked={billingCycle === "annually"} 
              onCheckedChange={() => setBillingCycle(billingCycle === "monthly" ? "annually" : "monthly")}
              className="bg-white/30 data-[state=checked]:bg-[#F97316]"
            />
            <span className={cn(
              `text-sm font-medium`, 
              billingCycle === "annually" ? "text-white" : "text-white/70"
            )}>Annual</span>
          </div>

          {billingCycle === "annually" && (
            <div className="bg-[#F97316] text-white py-2 px-6 rounded-full inline-flex items-center mb-6 font-medium text-sm animate-pulse shadow-md">
              <span className="mr-2">🎉</span> Save up to 33% with annual billing
            </div>
          )}
        </div>
      </div>

      <div className="bg-white py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className={cn(
            "grid gap-6",
            isMobile ? "grid-cols-1" : "grid-cols-3"
          )}>
            {plans.map((plan) => {
              const savings = calculateSavings(plan);
              
              return (
                <div
                  key={plan.name}
                  className={cn(
                    "relative rounded-2xl border transition-all duration-300 shadow-lg hover:shadow-xl",
                    plan.popular 
                      ? "border-[#F97316] ring-2 ring-[#F97316]/50" 
                      : "border-rocket-gray-200"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-[#F97316] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <div className="p-6 md:p-8">
                    <h3 className="text-2xl font-bold text-black mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-rocket-gray-600 mb-6">
                      {plan.description}
                    </p>
                    
                    <div className="mb-6">
                      <div className="flex items-end">
                        <span className="text-4xl font-bold text-black">
                          ${plan.price[billingCycle]}
                        </span>
                        <span className="text-rocket-gray-600 ml-1 mb-1">
                          /month
                        </span>
                      </div>
                      
                      {billingCycle === "annually" && plan.price.annually > 0 && (
                        <div className="text-sm text-[#F97316] font-medium mt-1">
                          Save ${savings.amount.toFixed(2)} per year ({savings.percentage}%)
                        </div>
                      )}
                      
                      <div className="text-xs text-rocket-gray-600 mt-1">
                        {billingCycle === "annually" ? "Billed annually" : "Billed monthly"}
                      </div>
                    </div>
                    
                    <Link to="/signup">
                      <Button 
                        className={cn(
                          "w-full mb-6",
                          plan.popular 
                            ? "bg-[#F97316] hover:bg-[#D15316] text-white" 
                            : "border border-[#F97316] text-[#F97316] hover:bg-[#F97316]/10"
                        )}
                      >
                        {plan.callToAction}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    
                    <div className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-rocket-green-500 mr-3 flex-shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-rocket-gray-300 mr-3 flex-shrink-0" />
                          )}
                          <span className={cn(
                            "text-sm",
                            feature.included ? "text-black" : "text-black/50"
                          )}>
                            {feature.name}
                          </span>
                          
                          {feature.info && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button className="ml-1">
                                    <HelpCircle className="h-3.5 w-3.5 text-rocket-gray-500" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs max-w-xs text-black">{feature.info}</p>
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
                  <Button variant="orange" className="min-w-[200px] text-white">
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
            
            <Link to="/signup">
              <Button size="lg" className="bg-bright-orange-500 text-white hover:bg-bright-orange-600">
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
