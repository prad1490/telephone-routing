import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { OperatorService } from '../operator.service';
import { Subscription } from 'rxjs';
import { Operator } from './operator.model';

@Component({
  selector: 'operator-list',
  templateUrl: './operator-list.component.html',
  styleUrls: ['./operator-list.component.scss']
})
export class OperatorListComponent implements OnInit, OnDestroy {
  operators: Operator[];
  subscription: Subscription;

  constructor(private operatorService: OperatorService,
              private router: Router,
              private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.subscription = this.operatorService.operatorsChanged
      .subscribe(
        (operators: Operator[]) => {
          this.operators = operators;
        }
      );
    this.operators = this.operatorService.getOperators();
  }

  onNewOperator() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
