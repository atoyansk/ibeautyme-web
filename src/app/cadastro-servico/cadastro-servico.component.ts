import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { Servico } from './servico';
import { CadastroServicoModule } from './cadastro-servico.module';
import { TranslateService } from '@ngx-translate/core';

import { ProfissionaisModule } from '../profissionais/profissionais.module';
import { Profissional } from '../profissionais/profissional';

@Component({
  selector: 'app-cadastro-servico',
  templateUrl: './cadastro-servico.component.html',
  styleUrls: ['./cadastro-servico.component.scss']
})
export class CadastroServicoComponent implements OnInit {

  userId: string;
  $key: string;
  value: any;
  servicos: FirebaseListObservable<Servico[]>;
  serv_emp: FirebaseListObservable<Servico[]>;
  servico: FirebaseObjectObservable<Servico>;
  profissionais: FirebaseListObservable<Servico[]>;
  perfil: FirebaseListObservable<any[]>;

  public textDir;

  lang = sessionStorage.getItem("lang");

  constructor(private db: AngularFireDatabase, 
              private afAuth: AngularFireAuth,
              private translate: TranslateService,
              private route: ActivatedRoute, 
              private router: Router) { 

    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
        this.servicos = db.list(`servicos/${this.userId}`);
        this.serv_emp = db.list('serv_emp/');
        //this.profissionais = db.list(`servicos/${this.userId}/profissionais/`);
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
  }

   editServ(evt, serv: Servico, f: NgForm){
    console.log(serv);
    f.controls.nome.setValue(serv.nome);
    f.controls.preco.setValue(serv.preco);
    f.controls.tempo.setValue(serv.tempo);
    f.controls.$key.setValue(serv.$key);
   }

  form_submit(f: NgForm) {
    if (f.controls.$key.value == null)
      {
        this.db.list(`servicos/${this.userId}`).push({
          nome: f.controls.nome.value,
          preco: f.controls.preco.value,
          tempo: f.controls.tempo.value
        }).then(({key}) => this.db.object('serv-emp/'+ key).update({
          nome: f.controls.nome.value,
          preco: f.controls.preco.value,
          tempo: f.controls.tempo.value,
          idPerfil: this.$key}));
          
          f.controls.$key.setValue(null);
        }else{
          this.db.object(`servicos/${this.userId}/` + f.controls.$key.value).update({
            nome: f.controls.nome.value,
            preco: f.controls.preco.value,
            tempo: f.controls.tempo.value
          }).then(() => this.db.object(`serv-emp/` + f.controls.$key.value).update({
            nome: f.controls.nome.value,
            preco: f.controls.preco.value,
            tempo: f.controls.tempo.value
          }).then(() => {
            f.controls.nome.setValue('');
            f.controls.preco.setValue('');
            f.controls.tempo.setValue('');
            f.controls.$key.setValue(null);
          }));

          console.log(f.controls.$key.value);
          console.log(this.$key);
        }
  }

  deleteServ(sKey) {
    this.db.object(`servicos/${this.userId}/` + sKey).remove();
    this.db.object('serv-emp/' + sKey).remove();
   }

   resetForm(f: NgForm){
    f.controls.nome.setValue('');
    f.controls.preco.setValue('');
    f.controls.tempo.setValue('');
    f.controls.$key.setValue('');
   }

}
