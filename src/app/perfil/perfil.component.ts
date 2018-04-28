import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  userId: string;
  perfil: FirebaseListObservable<any[]>;
  firebasestorage: any;

  constructor(private db: AngularFireDatabase, 
    private afAuth: AngularFireAuth, 
    private router: Router) { 

      this.afAuth.authState.subscribe(user => {
        if(user) this.userId = user.uid
        this.perfil = db.list(`perfil/${this.userId}`);
      });
    }

    

  ngOnInit() {
  }

  form_submit(p: NgForm) {

        let file: File = (<HTMLInputElement>document.getElementById('file')).files[0];
        console.log("Selected file: ", file.name);
        let metaData = {'contentType': file.type};
        let storageRef = firebase.storage().ref('/logo/' + file.name);
        
        let uploadTask = storageRef.put(file, metaData).then(
          (uploadSnapshot)=> {
          console.log("Upload is complete!");
          this.db.list(`perfil/${this.userId}`).push({
            nome: p.controls.nome.value,
            categoria: p.controls.categoria.value,
            endereco: p.controls.endereco.value,
            latitude: p.controls.latitude.value,
            longitude: p.controls.longitude.value,
            descricao: p.controls.descricao.value,
            file: uploadSnapshot.downloadURL,
            role: 'business'
          }).then((t: any) => this.db.list('empresa/').push({
            nome: p.controls.nome.value,
            categoria: p.controls.categoria.value,
            endereco: p.controls.endereco.value,
            latitude: Number(p.controls.latitude.value),
            longitude: Number(p.controls.longitude.value),
            descricao: p.controls.descricao.value,
            file: uploadSnapshot.downloadURL,
            role: 'business',
            idPerfil: t.key}));
        });

  }

  deletePerfil(){
    if(this.userId !=undefined && this.userId != null){
      return this.db.list(`perfil/${this.userId}`).remove();
    }
  }

  //ajustar
  updatePerfil(p: NgForm){
    if(this.userId !=undefined && this.userId != null){
      return this.db.list(`perfil/${this.userId}`).update(this.userId, { 
        nome: p.controls.nome, 
        categoria: p.controls.categoria, 
        endereco: p.controls.endereco, 
        latitude:  p.controls.latitude,
        longitude: p.controls.longitude,
        descricao: p.controls.descricao 
      });
    }
  }

}
