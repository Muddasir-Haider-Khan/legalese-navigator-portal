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

      <div className="relative min-h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50 z-0" 
          style={{ 
            backgroundImage: `url('/lovable-uploads/72bdd8af-6c42-4cd1-b632-af49b0f06c02.png')`,
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, transparent)'
          }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="container relative mx-auto px-4 py-24 sm:px-6 lg:px-8 z-10 relative">
          <div className="mx-auto max-w-4xl text-center relative">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl relative z-20">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-6 text-xl text-white/90 relative z-20">
              Choose the plan that best fits your legal needs. All plans include access to our core features.
            </p>

            <div className="mt-10 flex items-center justify-center gap-4">
              <span className={cn(
                "text-base font-medium",
                billingCycle === "monthly" ? "text-white" : "text-white/70"
              )}>Monthly</span>
              <Switch
                checked={billingCycle === "annually"}
                onCheckedChange={() => setBillingCycle(billingCycle === "monthly" ? "annually" : "monthly")}
                className="bg-white/20 data-[state=checked]:bg-white/40"
              />
              <span className={cn(
                "text-base font-medium",
                billingCycle === "annually" ? "text-white" : "text-white/70"
              )}>Annual</span>
            </div>

            {billingCycle === "annually" && (
              <div className="mt-6 inline-flex items-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm">
                <span className="mr-2">🎉</span> Save up to 33% with annual billing
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative -mt-32 px-4 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => {
              const savings = calculateSavings(plan);
              
              return (
                <div
                  key={plan.name}
                  className={cn(
                    "relative rounded-2xl transition-all duration-300",
                    plan.popular
                      ? "bg-white shadow-[0_8px_40px_-12px_rgba(241,143,1,0.4)] ring-2 ring-bright-orange-500 lg:scale-105"
                      : "bg-white shadow-xl"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-5 left-0 right-0 mx-auto w-36 rounded-full bg-bright-orange-500 py-2 text-center text-sm font-semibold text-white shadow-lg">
                      Most Popular
                    </div>
                  )}

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-bright-orange-900">{plan.name}</h3>
                    <p className="mt-2 min-h-[48px] text-bright-orange-600/80">{plan.description}</p>

                    <div className="my-8">
                      <div className="flex items-baseline text-bright-orange-900">
                        <span className="text-5xl font-bold tracking-tight">
                          ${plan.price[billingCycle]}
                        </span>
                        <span className="ml-2 text-bright-orange-600/70">/month</span>
                      </div>

                      {billingCycle === "annually" && plan.price.annually > 0 && (
                        <p className="mt-2 text-sm text-bright-orange-600">
                          Save ${savings.amount.toFixed(2)} per year ({savings.percentage}%)
                        </p>
                      )}
                    </div>

                    <Link to="/signup" className="block">
                      <Button
                        className={cn(
                          "w-full text-base font-semibold",
                          plan.popular
                            ? "bg-bright-orange-500 hover:bg-bright-orange-600 text-white shadow-lg"
                            : "bg-bright-orange-50 hover:bg-bright-orange-100 text-bright-orange-700"
                        )}
                      >
                        {plan.callToAction}
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>

                    <ul className="mt-8 space-y-4 text-left">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-bright-orange-500 mt-0.5 shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 mt-0.5 shrink-0" />
                          )}
                          <span className="ml-3 text-bright-orange-700">
                            {feature.name}
                            {feature.info && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button className="ml-1">
                                      <HelpCircle className="inline h-4 w-4 text-bright-orange-400" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-sm max-w-xs">{feature.info}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

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
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-bright-orange-900 mb-2">
                Can I switch between plans?
              </h3>
              <p className="text-bright-orange-700">
                Yes, you can upgrade, downgrade or cancel your plan at any time. When you upgrade, you'll immediately gain access to all the new features. If you downgrade or cancel, you'll continue to have access to your current plan until the end of your billing period.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-bright-orange-900 mb-2">
                Is there a refund policy?
              </h3>
              <p className="text-bright-orange-700">
                We offer a 7-day money-back guarantee for all new subscribers. If you're not satisfied with our service, you can request a full refund within the first week of your subscription.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
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
      
      <div className="bg-bright-orange-500">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Not sure which plan is right for you?
              </h2>
              <p className="text-white/90 max-w-xl text-lg">
                Our legal experts can help you choose the perfect plan for your specific legal needs. Schedule a free consultation today.
              </p>
            </div>
            
            <Link to="/signup">
              <Button size="lg" className="bg-white text-bright-orange-600 hover:bg-bright-orange-50 shadow-lg min-w-[200px]">
                Get Free Consultation
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
