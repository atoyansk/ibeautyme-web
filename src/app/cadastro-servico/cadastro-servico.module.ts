import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CadastroServicoComponent } from './cadastro-servico.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, TranslateModule.forRoot()
  ],
  exports: [CadastroServicoComponent, TranslateModule],
  declarations: [CadastroServicoComponent]
})
export class CadastroServicoModule { }
