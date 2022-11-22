import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BarChartData } from 'src/app/shared/model/barChartData.model';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent {

  constructor() { }

  @Input() data: BarChartData = new BarChartData;

  public barChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: []
  };
  public doughnutChartType: ChartType = 'doughnut';

  ngOnInit(){
    this.doughnutChartData.labels = this.data.labels;
    this.doughnutChartData.datasets = this.data.datasets;
  }
}
