import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { PriceConfigurationComponent } from './price-configuration/price-configuration.component';
import { FindOperatorComponent } from './find-operator/find-operator.component';
import { OperatorEditComponent } from './price-configuration/operator-edit/operator-edit.component';
import { OperatorDetailComponent } from './price-configuration/operator-detail/operator-detail.component';

const routerConfig: Routes = [
  {
    path: 'operator',
    component: PriceConfigurationComponent,
    children: [{ path: 'new', component: OperatorEditComponent },
    { path: ':id', component: OperatorDetailComponent },
    { path: ':id/edit', component: OperatorEditComponent },]
  },
  {
    path: 'search',
    component: FindOperatorComponent
  },
  {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/search',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routerConfig),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
