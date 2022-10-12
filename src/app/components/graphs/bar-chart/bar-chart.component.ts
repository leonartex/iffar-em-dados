import { Component, OnInit, Input } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { BarChartData } from 'src/app/shared/model/barChartData.model';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @Input() data: {data: BarChartData, id: string} = {data: new BarChartData, id: ''};

  public chart: any;
  public config: any;
  public type = 'bar';

  constructor() {
  }

  ngOnInit(): void {

    this.config = {
      type: 'bar',
      data: {
        labels: this.data.data.labels,
        datasets: this.data.data.datasets
      },
      options: {
        indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    }

    Chart.register(...registerables);
    console.log(this.data);
    
    let chartElement = document.getElementById(this.data.id)
    // if(chartElement)
      this.chart = new Chart('myChart', this.config);
  }

}
