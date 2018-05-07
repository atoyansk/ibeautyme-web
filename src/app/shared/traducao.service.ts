import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()

export class TraducaoService {

  constructor(public translate: TranslateService, private route: ActivatedRoute, private router: Router) { 

    this.translate.setDefaultLang('en');

      let lang = this.route.snapshot.paramMap.get('lang');
      this.translate.use(lang);
      console.log(lang);
    
  }

}