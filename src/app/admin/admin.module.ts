import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AdminComponent } from './admin.component';

@NgModule({
  imports: [
    CommonModule, RouterModule, ChartsModule
  ],
  exports: [AdminComponent],
  declarations: [AdminComponent]
})
export class AdminModule { }