import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { AdminComponent } from './admin.component';

@NgModule({
  imports: [
    CommonModule, RouterModule
  ],
  exports: [AdminComponent],
  declarations: [AdminComponent]
})
export class AdminModule { }