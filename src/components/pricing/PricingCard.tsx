
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Check, X, HelpCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";

interface PlanFeature {
  name: string;
  included: boolean;
  info?: string;
}

interface PricingCardProps {
  plan: {
    name: string;
    price: {
      monthly: number;
      annually: number;
    };
    description: string;
    features: PlanFeature[];
    callToAction: string;
    popular?: boolean;
  };
  billingCycle: "monthly" | "annually";
  savings: {
    amount: number;
    percentage: number;
  };
}

const PricingCard = ({ plan, billingCycle, savings }: PricingCardProps) => {
  return (
    <Card
      className={cn(
        "relative rounded-2xl transition-all duration-300 h-full flex flex-col",
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

      <div className="p-8 flex flex-col flex-grow">
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

        <ul className="mt-8 space-y-4 text-left flex-grow">
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
    </Card>
  );
};

export default PricingCard;
