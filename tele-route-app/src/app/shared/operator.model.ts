import { Plan } from './plan.model';

export class Operator {
  public name: string;
  public plans: Plan[];

  constructor(name: string, plans: Plan[]) {
    this.name = name;
    this.plans = plans;
  }
}
