import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class DashboardModule { }
