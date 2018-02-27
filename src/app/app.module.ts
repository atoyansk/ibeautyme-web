import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { FirebaseConfig } from './../environments/firebase.config';
import { AngularFireModule } from 'angularfire2/index';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';

import { CalendarModule } from "ap-angular2-fullcalendar";
import {CalendarComponent} from "ap-angular2-fullcalendar";

import { NavbarModule } from './navbar/navbar.module';
import { AgendaModule} from './agenda/agenda.module';
import { PerfilModule} from './perfil/perfil.module';
import { CadastroServicoModule } from './cadastro-servico/cadastro-servico.module';
import { ProfissionaisModule} from './profissionais/profissionais.module';
import { LoginModule } from './login/login.module';
import { AppRoutingModule } from './app.routing.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CalendarModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    NavbarModule,
    AgendaModule,
    PerfilModule,
    CadastroServicoModule,
    ProfissionaisModule,
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireDatabaseModule,
    AppRoutingModule,
    LoginModule
  ],
  providers: [AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
