import React from "react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

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

          <div className="mt-10 flex items-center justify-center gap-6">
            <span className={cn(
              "text-lg font-semibold transition-colors duration-200",
              billingCycle === "monthly" ? "text-bright-orange-500" : "text-white/70 hover:text-white/90"
            )}>Monthly</span>
            
            <div className="relative">
              <div className={cn(
                "absolute -inset-3 rounded-lg bg-gradient-to-r from-bright-orange-500/50 to-bright-orange-600/50 blur-lg transition-opacity duration-500",
                billingCycle === "annually" ? "opacity-100" : "opacity-0"
              )} />
              <Switch
                checked={billingCycle === "annually"}
                onCheckedChange={() => setBillingCycle(billingCycle === "monthly" ? "annually" : "monthly")}
                className="relative bg-white/20 data-[state=checked]:bg-bright-orange-500"
              />
            </div>
            
            <span className={cn(
              "text-lg font-semibold transition-colors duration-200",
              billingCycle === "annually" ? "text-bright-orange-500" : "text-white/70 hover:text-white/90"
            )}>Annual</span>
          </div>

          {billingCycle === "annually" && (
            <div className="mt-8 inline-flex animate-bounce-slow items-center rounded-full bg-gradient-to-r from-bright-orange-500/20 to-bright-orange-600/20 px-8 py-4 backdrop-blur-sm transition-all duration-500 hover:from-bright-orange-500/30 hover:to-bright-orange-600/30">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-bright-orange-500/10 to-bright-orange-600/10 blur-md" />
              <Sparkles className="mr-3 h-5 w-5 text-bright-orange-400 animate-pulse" />
              <span className="relative font-semibold text-bright-orange-400">
                Save up to <span className="text-bright-orange-500">33%</span> with annual billing
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingHero;
