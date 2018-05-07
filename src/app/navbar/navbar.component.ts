import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userId: string;
  perfil: FirebaseListObservable<any[]>;
  roles: FirebaseListObservable<any[]>;

  public textDir;

  lang = sessionStorage.getItem("lang");

  constructor(public translate: TranslateService, private db: AngularFireDatabase, private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router) {

    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
        this.perfil = db.list(`perfil/${this.userId}`);        
    })

    if(this.lang === "he"){
      this.textDir = 'rtl';
    }
    else {
      this.textDir = 'ltr';
    }
    
   }

  ngOnInit() {
  }
  

  form_logout(){
    this.afAuth.auth.signOut();
    this.router.navigate([""]);
  }

}
