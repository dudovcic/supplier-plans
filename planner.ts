import { Plan } from "./plan.model";

100;

// 150 13.5
// 100 100
// 250 10

export class Planner {
  constructor(private plan: Plan) {}
  private VAT = 1.05;

  calculateAnnualPriceFromUsage(annualUsage: number) {
    const standingCharge = this.plan.standing_charge
      ? (365 * this.plan.standing_charge) / 100
      : 0;
    let priceTotalPounds = standingCharge;
    let remainingUsage = annualUsage;

    for (const rate of this.plan.rates) {
      if (rate.threshold) {
        const currentRatePrice = (rate.price * rate.threshold) / 100;
        if (remainingUsage >= rate.threshold) {
          priceTotalPounds += currentRatePrice;
          remainingUsage = remainingUsage - rate.threshold;
        } else {
          priceTotalPounds += (remainingUsage * rate.price) / 100;
          break;
        }
      } else {
        priceTotalPounds += (remainingUsage * rate.price) / 100;
        break;
      }
    }

    priceTotalPounds = priceTotalPounds * this.VAT;

    return priceTotalPounds.toFixed(2);
  }
}
