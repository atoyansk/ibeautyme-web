import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { CadastroServicoComponent } from './cadastro-servico/cadastro-servico.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProfissionaisComponent } from './profissionais/profissionais.component';
import { AgendaComponent } from './agenda/agenda.component';
import { SignUpFormComponent } from './login/sign-up-form/sign-up-form.component';

const AppRoutes: Routes = [

    {path: '', component: AppComponent, children: [
        { path: '', redirectTo: '/login', pathMatch: 'full' },
        {path: '', component: NavbarComponent, children: [
            {path: 'agenda', component: AgendaComponent},
            {path: 'perfil', component: PerfilComponent},
            {path: 'servicos', component: CadastroServicoComponent},
            {path: 'profissionais', component: ProfissionaisComponent},
            { path: 'signup', component: SignUpFormComponent }
        ]}
    ]}
]



@NgModule({
imports: [RouterModule.forRoot(AppRoutes)],
exports: [RouterModule]
})
export class AppRoutingModule { }