
import React from "react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface PricingHeroProps {
  billingCycle: "monthly" | "annually";
  setBillingCycle: (billingCycle: "monthly" | "annually") => void;
}

const PricingHero = ({ billingCycle, setBillingCycle }: PricingHeroProps) => {
  return (
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
          <h1 className="text-4xl font-bold tracking-tight text-bright-orange-500 sm:text-5xl lg:text-6xl relative z-20">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-6 text-xl text-bright-orange-600 relative z-20">
            Choose the plan that best fits your legal needs. All plans include access to our core features.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <span className={cn(
              "text-base font-medium",
              billingCycle === "monthly" ? "text-bright-orange-500" : "text-white/70"
            )}>Monthly</span>
            <Switch
              checked={billingCycle === "annually"}
              onCheckedChange={() => setBillingCycle(billingCycle === "monthly" ? "annually" : "monthly")}
              className="bg-white/20 data-[state=checked]:bg-white/40"
            />
            <span className={cn(
              "text-base font-medium",
              billingCycle === "annually" ? "text-bright-orange-500" : "text-white/70"
            )}>Annual</span>
          </div>

          {billingCycle === "annually" && (
            <div className="mt-6 inline-flex items-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-bright-orange-500 backdrop-blur-sm">
              <span className="mr-2">🎉</span> Save up to 33% with annual billing
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingHero;
