import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CadastroServicoComponent } from './cadastro-servico.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule, FormsModule, TranslateModule.forRoot()
  ],
  exports: [CadastroServicoComponent, TranslateModule],
  declarations: [CadastroServicoComponent]
})
export class CadastroServicoModule { }
