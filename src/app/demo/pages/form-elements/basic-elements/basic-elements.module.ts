import { BasicSpinnerRoutingModule } from './../../../ui-elements/ui-basic/basic-spinner/basic-spinner-routing.module';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicElementsRoutingModule } from './basic-elements-routing.module';
import { BasicElementsComponent } from './basic-elements.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    BasicElementsRoutingModule,
    SharedModule,
    NgbDropdownModule,
    BasicSpinnerRoutingModule,
    
  ],
  declarations: [BasicElementsComponent]
})
export class BasicElementsModule { }
