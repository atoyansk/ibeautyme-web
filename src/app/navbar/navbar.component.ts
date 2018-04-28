import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userId: string;
  perfil: FirebaseListObservable<any[]>;
  roles: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private router: Router) {

    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
        this.perfil = db.list(`perfil/${this.userId}`);        
    })

    // this.afAuth.authState.subscribe(user => {
    //   if(user) this.userId = user.uid
    //     this.roles = this.db.list(`roles/${this.userId}`);
    // })
   }

  ngOnInit() {
  }

  form_logout(){
    this.afAuth.auth.signOut();
    this.router.navigate([""]);
  }

}
