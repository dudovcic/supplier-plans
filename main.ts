import * as fs from "fs";
import * as readline from "readline";

import { mockPlan } from "./plan.mock";
import { Planner } from "./planner";
import { Plan } from "./plan.model";

const planner = new Planner(mockPlan);

function main() {
  const fileArg = process.argv[2];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  // console.log("args", process.argv[2]);

  fs.readFile(fileArg, { encoding: "utf8" }, (err, data) => {
    const plans = JSON.parse(data) as Plan[];

    rl.on("line", (line) => {
      // const plans = JSON.parse(fs.readFileSync(fileArg, "utf-8"));
      if (line === "exit") {
        rl.close();
        return;
      }
      const lineArgs = line.split(" ");
      if (lineArgs[0] !== "price" || isNaN(Number(lineArgs[1]))) {
        console.log("Incorrect input");
      } else {
        try {
          const prices = plans.map((plan: Plan) => {
            const calculator = new Planner(plan);
            const annualPrice = calculator.calculateAnnualPriceFromUsage(
              Number(lineArgs[1])
            );
            return {
              supplier: plan.supplier,
              plan: plan.plan,
              price: annualPrice,
            };
          });
          prices.sort((a, b) => a.price - b.price);

          prices.forEach((planPrice) =>
            console.log(
              `${planPrice.supplier},${planPrice.plan},${planPrice.price.toFixed(2)}`
            )
          );
        } catch {
          throw new Error("No plans").message;
        }
      }
    });
  });
}

main();
