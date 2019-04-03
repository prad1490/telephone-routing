import { OperatorEditComponent } from './find-operator/operator-edit/operator-edit.component';
import { OperatorDetailComponent } from './find-operator/operator-detail/operator-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { PriceConfigurationComponent } from './price-configuration/price-configuration.component';
import { FindOperatorComponent } from './find-operator/find-operator.component';

 const routerConfig: Routes = [
  {
      path: 'operator',
      component: FindOperatorComponent,
      children : [{ path: 'new', component: OperatorEditComponent },
                  {path: ':id', component: OperatorDetailComponent},
                  { path: ':id/edit', component: OperatorEditComponent },]
  },
  {
      path: 'search',
      component: PriceConfigurationComponent
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
