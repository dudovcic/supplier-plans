import { mockPlan } from "./plan.mock";
import { Planner } from "./planner";

describe("Planner", () => {
  const planner = new Planner(mockPlan);

  it("Should get supplier name", () => {
    expect(planner.calculateAnnualPriceFromUsage(200)).toEqual(146.16);
  });
});
