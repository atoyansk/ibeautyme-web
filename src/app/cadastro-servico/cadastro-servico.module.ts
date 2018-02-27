import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CadastroServicoComponent } from './cadastro-servico.component';

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  exports: [CadastroServicoComponent],
  declarations: [CadastroServicoComponent]
})
export class CadastroServicoModule { }
