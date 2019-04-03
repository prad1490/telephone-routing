import { DropdownDirective } from './shared/dropdown.directive';
import { OperatorDetailComponent } from './find-operator/operator-detail/operator-detail.component';
import { OperatorItemComponent } from './find-operator/operator-list/operator-item/operator-item.component';
import { PriceConfigurationComponent } from './price-configuration/price-configuration.component';
import { OperatorService } from './shared/operator.service';
import { FindOperatorComponent } from './find-operator/find-operator.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CollapseModule, BsDropdownModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { OperatorListComponent } from './find-operator/operator-list/operator-list.component';
import { OperatorEditComponent } from './find-operator/operator-edit/operator-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FindOperatorComponent,
    PriceConfigurationComponent,
    OperatorListComponent,
    OperatorItemComponent,
    OperatorDetailComponent,
    OperatorEditComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CollapseModule.forRoot(), BsDropdownModule.forRoot()
  ],
  providers: [OperatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
