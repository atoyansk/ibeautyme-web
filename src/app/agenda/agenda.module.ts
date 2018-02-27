import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CalendarModule } from "ap-angular2-fullcalendar";

import { AgendaComponent } from './agenda.component';

@NgModule({
  imports: [
    CommonModule, RouterModule, CalendarModule
  ],
  exports: [AgendaComponent],
  declarations: [AgendaComponent]
})
export class AgendaModule { }