import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


import { PerfilComponent } from './perfil.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, TranslateModule.forRoot()
  ],
  exports: [PerfilComponent, TranslateModule],
  declarations: [PerfilComponent]
})
export class PerfilModule { }