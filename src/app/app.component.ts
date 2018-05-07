import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
  public textDir;

  lang = sessionStorage.getItem("lang");

  
  constructor() { 

    if(this.lang === "he"){
      this.textDir = 'rtl';
    }
    else {
      this.textDir = 'ltr';
    }
    console.log(this.textDir); 
  }

}
