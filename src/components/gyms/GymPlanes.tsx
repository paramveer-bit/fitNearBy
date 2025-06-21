import { Badge } from "@/components/ui/badge";

import { Check } from "lucide-react";

const gymData = {
  id: 1,
  name: "FitZone Premium",
  location: "123 Downtown Street, City Center",
  phone: "+91 98765 43210",
  email: "info@fitzonepremium.com",
  image: "/placeholder.svg?height=100&width=100",
  plans: [
    {
      id: 1,
      name: "Basic",
      price: 1999,
      originalPrice: 2499,
      duration: "1 Month",
      features: ["Gym Access", "Locker Facility", "Basic Equipment"],
      type: "Monthly",
      popular: false,
    },
    {
      id: 2,
      name: "Premium",
      price: 2999,
      originalPrice: 3999,
      duration: "1 Month",
      features: [
        "All Basic Features",
        "Swimming Pool",
        "Group Classes",
        "Sauna Access",
      ],
      popular: true,
    },
    {
      id: 3,
      name: "Elite",
      price: 4999,
      originalPrice: 6999,
      duration: "1 Month",
      features: [
        "All Premium Features",
        "Personal Training (2 sessions)",
        "Nutrition Consultation",
        "Priority Booking",
      ],
      popular: false,
    },
  ],
};

function GymPlanes() {
  return (
    <>
      <div className="space-y-4">
        {gymData.plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-4 h-4 rounded-full border-2 `}></div>
                <div>
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <p className="text-sm text-gray-600">{plan.duration}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-green-600">
                    ₹{plan.price}
                  </span>
                  {plan.originalPrice > plan.price && (
                    <span className="text-lg text-gray-500 line-through">
                      ₹{plan.originalPrice}
                    </span>
                  )}
                </div>
                {plan.originalPrice > plan.price && (
                  <Badge variant="secondary" className="mt-1">
                    Save ₹{plan.originalPrice - plan.price}
                  </Badge>
                )}
              </div>
            </div>

            <ul className="mt-4 space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export default GymPlanes;
