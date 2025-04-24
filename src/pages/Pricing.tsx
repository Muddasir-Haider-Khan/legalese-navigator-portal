
import { useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "@/components/layout/Layout";
import PricingHero from "@/components/pricing/PricingHero";
import PricingCard from "@/components/pricing/PricingCard";
import PricingFaq from "@/components/pricing/PricingFaq";
import PricingCta from "@/components/pricing/PricingCta";
import PricingShowcase from "@/components/pricing/PricingShowcase";
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
        <meta 
          name="description" 
          content="Choose the perfect legal plan for your needs. Get unlimited access to legal documents, attorney consultations, and more." 
        />
      </Helmet>

      <div className="bg-gradient-to-b from-soft-peach-50 to-white">
        <PricingHero billingCycle={billingCycle} setBillingCycle={setBillingCycle} />

        <div className="relative -mt-32 px-4 pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:gap-12 md:grid-cols-2 lg:grid-cols-3">
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

        <PricingShowcase />
        
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-20">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/lovable-uploads/7386c995-bf25-47e2-a3bb-095150b52e65.png"
                alt="Professional legal consultation"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6 text-bright-orange-700">Professional Legal Support</h2>
              <p className="text-lg text-bright-orange-600 mb-8">
                Get expert legal advice and support from our team of experienced attorneys. 
                We're here to help you navigate complex legal matters with confidence.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-bright-orange-500" />
                  <span className="text-bright-orange-600">Comprehensive legal protection</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-bright-orange-500" />
                  <span className="text-bright-orange-600">Dedicated legal team</span>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="w-6 h-6 text-bright-orange-500" />
                  <span className="text-bright-orange-600">Customized solutions</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <PricingFaq />
        <PricingCta />
      </div>
    </Layout>
  );
};

export default Pricing;
