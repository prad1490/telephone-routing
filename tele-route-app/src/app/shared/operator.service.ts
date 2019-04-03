import { Plan } from './plan.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Operator } from './operator.model';

@Injectable()
export class OperatorService {
  operatorsChanged = new Subject<Operator[]>();
  private operators: Operator[] = [
    new Operator(
      'Vodafone',
      [
        new Plan("1", "0.91"),
        new Plan("268", "5.1"),
        new Plan("46", "0.17"),
        new Plan("4620", "0.1"),
        new Plan("468", "0.15"),
        new Plan("4631", "0.15"),
        new Plan("4673", "0.9"),
        new Plan("46732", "1.1")
      ]),
    new Operator(
      'Lebara',
      [
        new Plan("1", "44"),
        new Plan("44", "0.5"),
        new Plan("46", "0.2"),
        new Plan("467", "1.0"),
        new Plan("48", "1.2")
      ])
  ];

  getOperators() {
    return this.operators.slice();
  }

  getOperator(index: number) {
    return this.operators[index];
  }

  addOperator(operator: Operator) {
    this.operators.push(operator);
    this.operatorsChanged.next(this.operators.slice());
  }

  updateOperator(index: number, newOperator: Operator) {
    this.operators[index] = newOperator;
    this.operatorsChanged.next(this.operators.slice());
  }

  deleteOperator(index: number) {
    this.operators.splice(index, 1);
    this.operatorsChanged.next(this.operators.slice());
  }
}
