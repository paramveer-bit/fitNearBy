import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import React from "react";
import { Plan } from "@/types";

const durationMap: Record<string, string> = {
  MONTHLY: "1 Month",
  YEARLY: "12 Months",
  QUARTERLY: "3 Months",
  TRIAL: "7 Days",
  HALF_YEARLY: "6 Months",
};

interface PlanSelectorProps {
  plans: Plan[];
  selectedPlan: string;
  setSelectedPlan: (planId: string) => void;
  handleNextStep: () => void;
}

function PlanSelector({
  plans,
  selectedPlan,
  setSelectedPlan,
  handleNextStep,
}: PlanSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Your Membership Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all ${
                plan.type === "YEARLY"
                  ? "border-blue-500 bg-blue-50"
                  : selectedPlan === plan.id
                  ? "border-blue-300 bg-blue-25"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.type === "YEARLY" && (
                <Badge className="absolute -top-3 left-6">Most Popular</Badge>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      selectedPlan === plan.id
                        ? "bg-blue-600 border-blue-600"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedPlan === plan.id && (
                      <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{plan.name}</h3>
                    <p className="text-sm text-gray-600">
                      {durationMap[plan.type]}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-green-600">
                      ₹{plan.newprice}
                    </span>
                    {plan.oldprice > plan.newprice && (
                      <span className="text-lg text-gray-500 line-through">
                        ₹{plan.oldprice}
                      </span>
                    )}
                  </div>
                  {plan.oldprice > plan.newprice && (
                    <Badge variant="secondary" className="mt-1">
                      Save ₹{plan.oldprice - plan.newprice}
                    </Badge>
                  )}
                </div>
              </div>

              <ul className="mt-4 space-y-2">
                {plan.featured.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {!selectedPlan && (
          <p className="mt-4 text-sm text-gray-500 text-center">
            Please select a plan to continue
          </p>
        )}

        <div className="mt-6 flex justify-end">
          <Button onClick={handleNextStep} size="lg" disabled={!selectedPlan}>
            Continue to Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default PlanSelector;
