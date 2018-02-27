import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PerfilComponent } from './perfil.component';

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  exports: [PerfilComponent],
  declarations: [PerfilComponent]
})
export class PerfilModule { }