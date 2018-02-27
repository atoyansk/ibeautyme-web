import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';
import { LoginComponent } from './login.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { LoginRoutingModule } from './login.routing.module';

@NgModule({
  imports: [
    CommonModule, FormsModule, RouterModule, LoginRoutingModule
  ],
  declarations: [LoginFormComponent, LoginComponent, SignUpFormComponent],
  exports:[LoginComponent],
  providers: [AngularFireAuth]
  })
export class LoginModule { }
