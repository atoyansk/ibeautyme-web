import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

    // ADD CHART OPTIONS. 
    chartOptions = {
      responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
    }

    labels1 =  ['Hairstyle', 'Nails', 'Prog', 'Barber', 'Color', 'Treat', 'Others'];
    labels2 =  ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    // STATIC DATA FOR THE CHART IN JSON FORMAT.
    chartData1 = [
      {
        label: '2018',
        data: [55, 26, 33, 8, 36, 29, 6] 
      }
    ];
    chartData2 = [
      {
        label: '1st Year',
        data: [21, 56, 4, 31, 45, 15, 57, 61, 9, 17, 24, 59] 
      },
      { 
        label: '2nd Year',
        data: [47, 9, 28, 54, 77, 51, 24]
      }
    ];

    // CHART COLOR.
    colors1 = [
      { // 2018.
        backgroundColor: 'rgba(172, 24, 49, 0.8)'
      }
    ]
    colors2 = [
      { // 1st Year.
        backgroundColor: 'rgba(77,83,96,0.2)'
      },
      { // 2nd Year.
        backgroundColor: 'rgba(30, 169, 224, 0.8)'
      }
    ]
    
    // CHART CLICK EVENT.
    onChartClick(event) {
      console.log(event);
    }

}
