import { Plan } from "./plan.model";

export const mockPlan: Plan = {
  supplier: "sse",
  plan: "standard",
  rates: [
    { price: 13.5, threshold: 150 },
    { price: 11.1, threshold: 100 },
    { price: 10 },
  ],
  standing_charge: 9,
};
