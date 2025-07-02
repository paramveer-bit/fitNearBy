import { Badge } from "@/components/ui/badge";

import { Check } from "lucide-react";
import { Plan } from "@/types";
// const gymData = {
//   id: 1,
//   name: "FitZone Premium",
//   location: "123 Downtown Street, City Center",
//   phone: "+91 98765 43210",
//   email: "info@fitzonepremium.com",
//   image: "/placeholder.svg?height=100&width=100",
//   plans: [
//     {
//       id: 1,
//       name: "Basic",
//       price: 1999,
//       originalPrice: 2499,
//       duration: "1 Month",
//       features: ["Gym Access", "Locker Facility", "Basic Equipment"],
//       type: "Monthly",
//       popular: false,
//     },
//     {
//       id: 2,
//       name: "Premium",
//       price: 2999,
//       originalPrice: 3999,
//       duration: "1 Month",
//       features: [
//         "All Basic Features",
//         "Swimming Pool",
//         "Group Classes",
//         "Sauna Access",
//       ],
//       popular: true,
//     },
//     {
//       id: 3,
//       name: "Elite",
//       price: 4999,
//       originalPrice: 6999,
//       duration: "1 Month",
//       features: [
//         "All Premium Features",
//         "Personal Training (2 sessions)",
//         "Nutrition Consultation",
//         "Priority Booking",
//       ],
//       popular: false,
//     },
//   ],
// };

const getDuration = (type: string) => {
  switch (type) {
    case "MONTHLY":
      return "1 Month";
    case "YEARLY":
      return "12 Months";
    case "QUARTERLY":
      return "3 Months";
    case "HALF_YEARLY":
      return "6 Months";
    case "TRIAL":
      return "Trial Period";
    default:
      return "Unknown Duration";
  }
};
const sortPlans = (plans: Plan[]) => {
  const typeOrder = {
    TRIAL: 1,
    MONTHLY: 2,
    QUARTERLY: 3,
    HALF_YEARLY: 4,
    YEARLY: 5,
  };

  const getNameCategory = (name: string) => {
    const nameLower = name.toLowerCase();

    if (nameLower.includes("trial")) return 1;
    if (nameLower.includes("male") && !nameLower.includes("female")) return 2;
    if (nameLower.includes("female")) return 3;
    if (nameLower.includes("couple")) return 4;

    // If no keywords found, put at the end
    return 999;
  };

  return plans.sort((a, b) => {
    // First sort by type
    const typeComparison = typeOrder[a.type] - typeOrder[b.type];
    if (typeComparison !== 0) {
      return typeComparison;
    }

    // Then sort by name within the same type
    const aNameCategory = getNameCategory(a.name);
    const bNameCategory = getNameCategory(b.name);
    if (aNameCategory !== bNameCategory) {
      return aNameCategory - bNameCategory;
    }

    // If same category, sort alphabetically
    return a.name.localeCompare(b.name);
  });
};

function GymPlanes({ plans }: { plans: Plan[] }) {
  const sortedPlans = sortPlans([...plans]);

  return (
    <>
      <div className="space-y-4">
        {sortedPlans.map((plan) => (
          <div
            key={plan.id}
            className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-4 h-4 rounded-full border-2 `}></div>
                <div>
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <p className="text-sm text-gray-600">
                    {getDuration(plan.type)}
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
              {plan.featured != null &&
                plan.featured.map((feature, index) => (
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
