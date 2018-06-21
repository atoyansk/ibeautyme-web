import { Component, OnInit } from '@angular/core';
//import { FormsModule, NgForm } from '@angular/forms';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms'

import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { Servico } from './servico';
import { TranslateService } from '@ngx-translate/core';

import { ProfissionaisModule } from '../profissionais/profissionais.module';
import { Profissional } from '../profissionais/profissional';
import { checkAndUpdateView } from '@angular/core/src/view/view';


@Component({
  selector: 'app-cadastro-servico',
  templateUrl: './cadastro-servico.component.html',
  styleUrls: ['./cadastro-servico.component.scss']
})
export class CadastroServicoComponent implements OnInit {

  f: FormGroup;
  
  userId: string;
  $key: string;
  value: any;
  servicos: FirebaseListObservable<Servico[]>;
  serv_emp: FirebaseListObservable<Servico[]>;
  servico: FirebaseObjectObservable<Servico>;
  profissionais: FirebaseListObservable<Servico[]>;
  profs: FirebaseListObservable<Servico[]>;
  perfil: FirebaseListObservable<any[]>;

  public textDir;

  lang = sessionStorage.getItem("lang");

  constructor(private db: AngularFireDatabase, 
              private afAuth: AngularFireAuth,
              private translate: TranslateService,
              private route: ActivatedRoute, 
              private router: Router,
              private fb: FormBuilder) { 

    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
        this.servicos = db.list(`servicos/${this.userId}`);
        this.serv_emp = db.list('serv_emp/');
        //this.profs = db.list(`servicos/${this.userId}/` + this.f.controls.$key.value + '/profissionais');
    })

    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
        this.profissionais = this.db.list(`profissionais/${this.userId}`);
    })

    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
        this.perfil = this.db.list(`perfil/${this.userId}`, { preserveSnapshot: true });

        this.perfil.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            this.$key = snapshot.key;
            this.value = snapshot.val();
            console.log(this.$key);
          });
        })
    })

    if(this.lang === "he"){
      this.textDir = 'rtl';
    }
    else {
      this.textDir = 'ltr';
    }

  }

  ngOnInit() {
    let lang = sessionStorage.getItem("lang");
    this.translate.use(lang);
    console.log(lang);

    //this.keys = Object.keys(this.profissionais);
    

    // build the form model
    this.f = this.fb.group({
      $key: new FormControl(null),
      nome: this.fb.control('', Validators.required),
      preco: this.fb.control('', Validators.required),
      tempo: this.fb.control('', Validators.required),
      prof: this.fb.array([], Validators.required)
    })
  }

  // submit() {
  //   console.log("Reactive Form submitted: ", this.f);
  // }

   editServ(evt, serv: Servico){
    console.log(serv);
    this.f.controls.nome.setValue(serv.nome);
    this.f.controls.preco.setValue(serv.preco);
    this.f.controls.tempo.setValue(serv.tempo);
    //this.f.controls.prof.setValue(serv.profissionais);
    this.f.controls.$key.setValue(serv.$key);

    //console.log(this.f.controls.prof.value);
    console.log(serv.profissionais);
   }

   onChange(nome:string, isChecked: boolean) {
    const profArr = <FormArray>this.f.controls.prof;
  
    if(isChecked) {
      profArr.push(new FormControl(nome));
      console.log(profArr.value);
    } else {
      let index = profArr.controls.findIndex(x => x.value == nome)
      profArr.removeAt(index);
      console.log(profArr.value);
    }
  }

  submit() {
   
    if (this.f.controls.$key.value == null)
      {
        this.db.list(`servicos/${this.userId}/`).push({
          nome: this.f.controls.nome.value,
          preco: this.f.controls.preco.value,
          tempo: this.f.controls.tempo.value,
          profissionais: this.f.controls.prof.value
        }).then(({key}) => this.db.object('serv-emp/'+ key).update({
          nome: this.f.controls.nome.value,
          preco: this.f.controls.preco.value,
          tempo: this.f.controls.tempo.value,
          profissionais: this.f.controls.prof.value,
          idPerfil: this.$key
        })).then(() => {
            this.f.controls.nome.setValue('');
            this.f.controls.preco.setValue('');
            this.f.controls.tempo.setValue('');
            this.f.controls.prof.setValue('');
            this.f.controls.$key.setValue(null);
          });

          // let listprof = Object.values(this.profs);
          // console.log(listprof);
        }else{
          this.db.object(`servicos/${this.userId}/` + this.f.controls.$key.value).update({
            nome: this.f.controls.nome.value,
            preco: this.f.controls.preco.value,
            tempo: this.f.controls.tempo.value,
            profissionais: this.f.controls.prof.value
          }).then(() => this.db.object('serv-emp/' + this.f.controls.$key.value).update({
            nome: this.f.controls.nome.value,
            preco: this.f.controls.preco.value,
            tempo: this.f.controls.tempo.value,
            profissionais: this.f.controls.prof.value
          }).then(() => {
            this.f.controls.nome.setValue('');
            this.f.controls.preco.setValue('');
            this.f.controls.tempo.setValue('');
            this.f.controls.prof.setValue('');
            this.f.controls.$key.setValue(null);
          }));

          console.log(this.f.controls.$key.value);
          console.log(this.$key);
        }
  }

  deleteServ(sKey) {
    this.db.object(`servicos/${this.userId}/` + sKey).remove();
    this.db.object('serv-emp/' + sKey).remove();
   }

   resetForm(){
    this.f.controls.nome.setValue('');
    this.f.controls.preco.setValue('');
    this.f.controls.tempo.setValue('');
    this.f.controls.prof.setValue('');
    this.f.controls.$key.setValue('');
   }

}
