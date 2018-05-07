import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CalendarModule } from "ap-angular2-fullcalendar";
import { TranslateModule } from '@ngx-translate/core';

import { AgendaComponent } from './agenda.component';

@NgModule({
  imports: [
    CommonModule, RouterModule, CalendarModule, TranslateModule.forRoot()
  ],
  exports: [AgendaComponent, TranslateModule],
  declarations: [AgendaComponent]
})
export class AgendaModule { }