import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule }   from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';

import { FirebaseConfig } from './../environments/firebase.config';
import { AngularFireModule } from 'angularfire2/index';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';

import { CalendarModule } from "ap-angular2-fullcalendar";
import {CalendarComponent} from "ap-angular2-fullcalendar";
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { NavbarModule } from './navbar/navbar.module';
import { AgendaModule} from './agenda/agenda.module';
import { PerfilModule} from './perfil/perfil.module';
import { CadastroServicoModule } from './cadastro-servico/cadastro-servico.module';
import { ProfissionaisModule} from './profissionais/profissionais.module';
import { LoginModule } from './login/login.module';
import { AdminModule } from './admin/admin.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AppRoutingModule } from './app.routing.module';
import { EmpresaService } from './admin/empresa-service';
import { RouterModule } from '@angular/router';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CalendarModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    NavbarModule,
    AgendaModule,
    PerfilModule,
    CadastroServicoModule,
    ProfissionaisModule,
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireDatabaseModule,
    AppRoutingModule,
    RouterModule,
    LoginModule,
    AdminModule,
    DashboardModule,
    ChartsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [AngularFireDatabase, EmpresaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
