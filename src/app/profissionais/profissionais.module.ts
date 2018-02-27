import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Profissional } from './profissional';

import { ProfissionaisComponent } from './profissionais.component';

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  exports: [ProfissionaisComponent],
  declarations: [ProfissionaisComponent]
})
export class ProfissionaisModule { }