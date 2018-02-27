import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  form_cadastro(f: NgForm){
    let email = f.controls.email.value.toString().trim();
    let senha = f.controls.senha.value.toString().trim();
    this.afAuth.auth.createUserWithEmailAndPassword(email, senha)
    .then(t => {
    alert('Usuário criado! =D \n Id: ' + t.uid);
    })
    .catch(c => {
    alert('Erro! \n Erro: ' + c.message);
    })
  }

  verificaSeEmailsSaoIguais(f: NgForm): boolean {
    if (f.controls.email)
    return f.controls.email.value.toString().trim() == f.controls.emailconfirmacao.value.toString().trim();
    return false;
  }
    verificaSeSenhasSaoIguais(f: NgForm): boolean {
    if (f.controls.senha)
    return f.controls.senha.value.toString().trim() == f.controls.senhaconfirmacao.value.toString().trim();
    return false;
  }
    verificaSeFormEValido(f: NgForm): boolean {
    return f.form.valid && this.verificaSeEmailsSaoIguais(f) && this.verificaSeSenhasSaoIguais(f);
  }

}

