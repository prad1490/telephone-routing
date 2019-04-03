import { Component, OnInit, Input } from '@angular/core';
import { Operator } from '../operator.model';


@Component({
  selector: 'operator-item',
  templateUrl: './operator-item.component.html',
  styleUrls: ['./operator-item.component.scss']
})
export class OperatorItemComponent implements OnInit {
  @Input() operator: Operator;
  @Input() index: number;

  ngOnInit() {
  }
}
