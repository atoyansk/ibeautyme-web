import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule, RouterModule
  ],
  exports: [DashboardComponent],
  declarations: [DashboardComponent]
})
export class DashboardModule { }