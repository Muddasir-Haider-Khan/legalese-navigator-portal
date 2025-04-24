
import React from "react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Sparkle, Wand, Stars } from "lucide-react";

interface PricingHeroProps {
  billingCycle: "monthly" | "annually";
  setBillingCycle: (billingCycle: "monthly" | "annually") => void;
}

const PricingHero = ({ billingCycle, setBillingCycle }: PricingHeroProps) => {
  return (
    <div className="relative min-h-[60vh] overflow-hidden">
      {/* Enhanced gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-bright-orange-500/20 via-bright-orange-400/10 to-bright-orange-500/20 opacity-70 z-0 animate-gradient"
      />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      {/* Enhanced decorative elements */}
      <div className="absolute -left-20 top-20 w-60 h-60 bg-bright-orange-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -right-20 bottom-20 w-60 h-60 bg-bright-orange-500/10 rounded-full blur-3xl animate-pulse delay-300" />
      <div className="absolute left-1/4 top-1/3 w-40 h-40 bg-bright-orange-500/10 rounded-full blur-2xl animate-pulse delay-200" />
      
      <div className="container relative mx-auto px-4 py-24 sm:px-6 lg:px-8 z-10">
        <div className="mx-auto max-w-4xl text-center relative">
          <div className="mb-8 flex justify-center gap-4">
            <Wand className="h-12 w-12 text-bright-orange-500 animate-bounce-slow" />
            <Stars className="h-12 w-12 text-bright-orange-400 animate-bounce-slow delay-200" />
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-bright-orange-600 via-bright-orange-500 to-bright-orange-400 bg-clip-text text-transparent sm:text-5xl lg:text-6xl animate-fade-in">
            Simple, Transparent Pricing
          </h1>
          
          <p className="mt-6 text-xl text-bright-orange-600 animate-fade-in delay-100">
            Choose the plan that best fits your legal needs. All plans include access to our core features.
          </p>

          <div className="mt-10 flex items-center justify-center gap-6">
            <span className={cn(
              "text-lg font-semibold transition-colors duration-200",
              billingCycle === "monthly" ? "text-bright-orange-500" : "text-bright-orange-400 hover:text-bright-orange-500"
            )}>Monthly</span>
            
            <div className="relative">
              <div className={cn(
                "absolute -inset-3 rounded-lg bg-gradient-to-r from-bright-orange-500/50 to-bright-orange-600/50 blur-lg transition-opacity duration-500 animate-pulse",
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
              billingCycle === "annually" ? "text-bright-orange-500" : "text-bright-orange-400 hover:text-bright-orange-500"
            )}>Annual</span>
          </div>

          {billingCycle === "annually" && (
            <div className="mt-8 inline-flex animate-float items-center rounded-full bg-gradient-to-r from-bright-orange-500/20 via-bright-orange-400/30 to-bright-orange-500/20 px-8 py-4 backdrop-blur-sm transition-all duration-500 hover:scale-105">
              <Sparkle className="mr-3 h-5 w-5 text-bright-orange-500 animate-pulse" />
              <span className="relative font-semibold text-bright-orange-500">
                Save up to <span className="text-bright-orange-600 font-bold animate-pulse">33%</span> with annual billing
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingHero;
