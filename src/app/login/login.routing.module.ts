import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginComponent } from './login.component';

const LoginRoutes: Routes = [
    {
      path: '', component: LoginComponent, children: [
        { path: 'login', component: LoginFormComponent },
        //{ path: 'signup', component: SignUpFormComponent }
    ]
    }
  ]

  @NgModule({
    imports: [RouterModule.forChild(LoginRoutes)],
    exports: [RouterModule]
  })
  export class LoginRoutingModule { }