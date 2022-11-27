import { Component, Input, OnChanges } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BarChartData } from 'src/app/shared/model/barChartData.model';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnChanges{

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

  ngOnChanges(){
    // this.doughnutChartData.labels = this.data.labels;
    // this.doughnutChartData.datasets = this.data.datasets;
    this.doughnutChartData = {
      labels: this.data.labels,
      datasets: this.data.datasets
    };
  }
}
