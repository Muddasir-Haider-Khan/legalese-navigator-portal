
import { useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "@/components/layout/Layout";
import PricingHero from "@/components/pricing/PricingHero";
import PricingCard from "@/components/pricing/PricingCard";
import PricingFaq from "@/components/pricing/PricingFaq";
import PricingCta from "@/components/pricing/PricingCta";
import { Shield, Users, Package } from "lucide-react";
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
  icon: React.ReactNode;
}

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("annually");
  const isMobile = useIsMobile();
  
  const plans: Plan[] = [
    {
      name: "Starter",
      price: {
        monthly: 39.99,
        annually: 29.99
      },
      description: "Essential legal coverage for individuals",
      icon: <Shield className="w-8 h-8 text-bright-orange-500" />,
      features: [
        { name: "Unlimited legal document creation", included: true },
        { name: "Attorney document review (2/month)", included: true },
        { name: "Digital signature platform", included: true },
        { name: "30-minute attorney consultation", included: true },
        { name: "Standard customer support", included: true },
        { name: "Document storage (5GB)", included: true },
        { name: "Mobile app access", included: true },
        { name: "Priority support", included: false },
        { name: "Advanced document automation", included: false },
        { name: "Custom contract creation", included: false },
      ],
      callToAction: "Start Free Trial"
    },
    {
      name: "Premium",
      price: {
        monthly: 49.99,
        annually: 39.99
      },
      description: "Complete coverage for growing businesses",
      icon: <Package className="w-8 h-8 text-bright-orange-500" />,
      features: [
        { name: "Everything in Starter, plus:", included: true },
        { name: "Unlimited attorney consultations", included: true },
        { name: "Priority document review (24h)", included: true },
        { name: "Custom contract creation", included: true },
        { name: "Advanced document automation", included: true },
        { name: "Priority customer support", included: true },
        { name: "Document storage (25GB)", included: true },
        { name: "Team collaboration tools", included: true },
        { name: "API access", included: true },
        { name: "Dedicated account manager", included: true },
      ],
      callToAction: "Start Premium Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: {
        monthly: 99.99,
        annually: 89.99
      },
      description: "Custom solutions for large organizations",
      icon: <Users className="w-8 h-8 text-bright-orange-500" />,
      features: [
        { name: "Everything in Premium, plus:", included: true },
        { name: "Custom contract workflows", included: true },
        { name: "Unlimited team members", included: true },
        { name: "Enterprise API access", included: true },
        { name: "Custom integrations", included: true },
        { name: "Dedicated legal team", included: true },
        { name: "Document storage (100GB)", included: true },
        { name: "Compliance monitoring", included: true },
        { name: "24/7 priority support", included: true },
        { name: "Custom reporting", included: true },
      ],
      callToAction: "Contact Sales"
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
        <title>Legal Plans & Pricing | Legal Gram</title>
        <meta name="description" content="Choose the perfect legal plan for your needs. Get unlimited access to legal documents, attorney consultations, and more." />
      </Helmet>

      <PricingHero billingCycle={billingCycle} setBillingCycle={setBillingCycle} />

      <div className="relative -mt-32 px-4 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
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
