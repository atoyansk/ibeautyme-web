import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  form_login(f:NgForm){
    if (!f.valid)
      return;
    this.afAuth.auth.signInWithEmailAndPassword(f.controls.email.value, f.controls.password.value)
      .then(ok => {
        this.router.navigate(["/perfil"]);
      });

      f.controls.email.setValue('');
      f.controls.password.setValue('');
  }

}
