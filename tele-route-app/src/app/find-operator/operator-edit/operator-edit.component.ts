import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { OperatorService } from '../../shared/operator.service';

@Component({
  selector: 'operator-edit',
  templateUrl: './operator-edit.component.html',
  styleUrls: ['./operator-edit.component.scss']
})
export class OperatorEditComponent implements OnInit {
  id: number;
  editMode = false;
  operatorForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private operatorService: OperatorService,
    private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this.operatorService.updateOperator(this.id, this.operatorForm.value);
    } else {
      this.operatorService.addOperator(this.operatorForm.value);
    }
    this.onCancel();
  }

  onAddPlan() {
    (<FormArray>this.operatorForm.get('plans')).push(
      new FormGroup({
        'prefix': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required

        ])
      })
    );
  }

  onDeletePlan(index: number) {
    (<FormArray>this.operatorForm.get('plans')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let operatorName = '';
    let operatorPlans = new FormArray([], Validators.required);

    if (this.editMode) {
      const operator = this.operatorService.getOperator(this.id);
      operatorName = operator.name;
      if (operator['plans']) {
        for (let plan of operator.plans) {
          operatorPlans.push(
            new FormGroup({
              'prefix': new FormControl(plan.prefix, Validators.required),
              'amount': new FormControl(plan.amount, [
                Validators.required
              ])
            })
          );
        }
      }
    }

    this.operatorForm = new FormGroup({
      'name': new FormControl(operatorName, Validators.required),
      'plans': operatorPlans
    });
  }

}
