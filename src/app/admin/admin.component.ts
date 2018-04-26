import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../shared/empresa-service';
//import { Router } from '@angular/router';
import * as _ from "lodash";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  empresa: any;
  offset = 5;
  nextKey: any; // for next button
  prevKeys: any[] = []; // for prev button
  subscription: any;

  constructor(private empresaSvc: EmpresaService) { }

  ngOnInit() {
    this.getEmpresas();
  }

  nextPage() {
    this.prevKeys.push(_.first(this.empresa)['$key']) // set current key as pointer for previous page
    this.getEmpresas(this.nextKey)
  }

  prevPage() {
    const prevKey = _.last(this.prevKeys) // use last key in array
    this.prevKeys = _.dropRight(this.prevKeys) // then remove the last key in the array

    this.getEmpresas(prevKey)
  }

  private getEmpresas(key?) {

    this.subscription = this.empresaSvc.getEmpresas(this.offset, key)
                       .subscribe(empresa => {

                          this.empresa = _.slice(empresa, 0, this.offset)
                          this.nextKey =_.get(empresa[this.offset], '$key')
    })
  }

}
