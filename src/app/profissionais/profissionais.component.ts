import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Profissional } from './profissional';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profissionais',
  templateUrl: './profissionais.component.html',
  styleUrls: ['./profissionais.component.scss']
})
export class ProfissionaisComponent implements OnInit {

  userId: string;
  $key: string;
  value: any;
  profissionais: FirebaseListObservable<Profissional[]>;
  profissional: FirebaseObjectObservable<Profissional>;
  perfil: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private router: Router) { 

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

  }

  ngOnInit() {
  }

  editProf(evt, prof: Profissional, f: NgForm){
    console.log(prof);
    f.controls.nome.setValue(prof.nome);
    f.controls.sobre.setValue(prof.sobre);
    f.controls.$key.setValue(prof.$key);
   }

  form_submit(f: NgForm) {
    if (f.controls.$key.value == null)
      {
        let file: File = (<HTMLInputElement>document.getElementById('file')).files[0];
        console.log("Selected file: ", file.name);
        let metaData = {'contentType': file.type};
        let storageRef = firebase.storage().ref('/profissionais/' + file.name);
        
        let uploadTask = storageRef.put(file, metaData).then(
          (uploadSnapshot)=> {
          console.log("Upload is complete!");
          this.db.list(`profissionais/${this.userId}`).push({
            nome: f.controls.nome.value,
            sobre: f.controls.sobre.value,
            file: uploadSnapshot.downloadURL
          }).then((t: any) => this.db.list('prof-emp/').push({
            nome: f.controls.nome.value,
            sobre: f.controls.sobre.value,
            file: uploadSnapshot.downloadURL,
            idPerfil: this.$key,
            idProf: t.key}));

          f.controls.file.setValue(null);
          f.controls.$key.setValue(null);
        });

      }else{
        
        if(f.controls.file.value !== null){
          let file: File = (<HTMLInputElement>document.getElementById('file')).files[0];
          console.log("Selected file: ", file.name);
          let metaData = {'contentType': file.type};
          let storageRef = firebase.storage().ref('/profissionais/' + file.name);
          
          let uploadTask = storageRef.put(file, metaData).then(
            (uploadSnapshot)=> {
            console.log("Upload is complete!");
            this.db.object(`profissionais/${this.userId}/` + f.controls.$key.value).update({
              nome: f.controls.nome.value,
              sobre: f.controls.sobre.value,
              file: uploadSnapshot.downloadURL
            })
            f.controls.nome.setValue('');
            f.controls.sobre.setValue('');
            f.controls.file.setValue(null);
            f.controls.$key.setValue(null);
          });  
        }else{
          //Aqui tem um erro... Não reconhece file == null
          this.db.object(`profissionais/${this.userId}/` + f.controls.$key.value).update({
            nome: f.controls.nome.value,
            sobre: f.controls.sobre.value
          })

          f.controls.nome.setValue('');
          f.controls.sobre.setValue('');
          f.controls.$key.setValue(null);
        }
  
      }
  }

  deleteProf(pKey) {
    this.db.object(`profissionais/${this.userId}/` + pKey).remove();
   }

}
