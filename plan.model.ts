export interface Rate {
  price: number;
  threshold?: number;
}

export interface Plan {
  supplier: string;
  plan: string;
  standing_charge: number;
  rates: Rate[];
}
