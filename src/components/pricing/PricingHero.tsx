import React from "react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Sparkle, Wand, Stars } from "lucide-react";
import { motion } from "framer-motion";

interface PricingHeroProps {
  billingCycle: "monthly" | "annually";
  setBillingCycle: (billingCycle: "monthly" | "annually") => void;
}

const PricingHero = ({ billingCycle, setBillingCycle }: PricingHeroProps) => {
  return (
    <div className="relative min-h-[70vh] overflow-hidden flex items-center">
      {/* Enhanced gradient background with more visible soft peach */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-soft-peach-50 via-soft-peach-100 to-soft-peach-50 opacity-90 z-0 animate-gradient"
      />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      {/* Enhanced decorative elements */}
      <div className="absolute -left-20 top-20 w-60 h-60 bg-soft-peach-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -right-20 bottom-20 w-60 h-60 bg-soft-peach-200/30 rounded-full blur-3xl animate-pulse delay-300" />
      <div className="absolute left-1/4 top-1/3 w-40 h-40 bg-soft-peach-200/30 rounded-full blur-2xl animate-pulse delay-200" />
      
      <div className="container relative mx-auto px-4 py-24 sm:px-6 lg:px-8 z-10">
        <div className="mx-auto max-w-4xl text-center relative">
          <motion.div 
            className="mb-8 flex justify-center gap-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Wand className="h-12 w-12 text-bright-orange-500 animate-bounce-slow" />
            <Stars className="h-12 w-12 text-bright-orange-400 animate-bounce-slow delay-200" />
          </motion.div>
          
          <motion.h1 
            className="text-4xl font-bold tracking-tight bg-gradient-to-r from-bright-orange-600 via-bright-orange-500 to-bright-orange-400 bg-clip-text text-transparent sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Simple, Transparent Pricing
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-xl text-bright-orange-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Choose the plan that best fits your legal needs. All plans include access to our core features.
          </motion.p>

          <motion.div 
            className="mt-10 flex items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
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
          </motion.div>

          {billingCycle === "annually" && (
            <motion.div 
              className="mt-8 inline-flex animate-float items-center rounded-full bg-soft-peach-100 px-8 py-4 backdrop-blur-sm transition-all duration-500 hover:scale-105 shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkle className="mr-3 h-5 w-5 text-bright-orange-500 animate-pulse" />
              <span className="relative font-semibold text-bright-orange-600">
                Save up to <span className="text-bright-orange-700 font-bold animate-pulse">33%</span> with annual billing
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingHero;
