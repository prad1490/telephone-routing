import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OperatorService } from '../../shared/operator.service';
import { Operator } from '../../shared/operator.model';


@Component({
  selector: 'operator-detail',
  templateUrl: './operator-detail.component.html',
  styleUrls: ['./operator-detail.component.scss']
})
export class OperatorDetailComponent implements OnInit {
  operator: Operator;
  id: number;

  constructor(private operatorService: OperatorService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.operator = this.operatorService.getOperator(this.id);
        }
      );
  }
  onEditOperator() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteOperator() {
    this.operatorService.deleteOperator(this.id);
    this.router.navigate(['/operator']);
  }

}
