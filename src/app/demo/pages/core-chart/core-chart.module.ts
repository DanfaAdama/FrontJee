import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreChartRoutingModule } from './core-chart-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreChartRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class CoreChartModule { }
