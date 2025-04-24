
import { useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "@/components/layout/Layout";
import PricingHero from "@/components/pricing/PricingHero";
import PricingCard from "@/components/pricing/PricingCard";
import PricingFaq from "@/components/pricing/PricingFaq";
import PricingCta from "@/components/pricing/PricingCta";
import { useIsMobile } from "@/hooks/use-mobile";

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

      <PricingHero billingCycle={billingCycle} setBillingCycle={setBillingCycle} />

      <div className="relative -mt-32 px-4 pb-20 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <PricingCard 
                key={plan.name}
                plan={plan}
                billingCycle={billingCycle}
                savings={calculateSavings(plan)}
              />
            ))}
          </div>
        </div>
      </div>

      <PricingFaq />
      <PricingCta />
    </Layout>
  );
};

export default Pricing;
