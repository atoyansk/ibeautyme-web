import { Component, OnInit } from '@angular/core';
import { EmpresaService } from './empresa-service';//pagination
//import { Router } from '@angular/router';
import * as _ from "lodash";
import { Profissional } from '../profissionais/profissional';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import 'chart.js';

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

  selectedP: Profissional;

  //public isShow = true;

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

  onSelect(p: Profissional): void {
    this.selectedP = p;
    console.log(p);
  }

  // ADD CHART OPTIONS. 
  chartOptions = {
    responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
  }

  labels1 =  ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  // STATIC DATA FOR THE CHART IN JSON FORMAT.
  
  chartData1 = [
    {
      label: '2017',
      data: [21, 56, 4, 31, 45, 15, 57, 61, 9, 17, 24, 59] 
    }
  ];

  // CHART COLOR.
  colors1 = [
    { // 2018.
      backgroundColor: 'rgba(172, 24, 49, 0.8)'
    }
  ]
  
  // CHART CLICK EVENT.
  onChartClick(event) {
    console.log(event);
  }

}
