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
  public isEmpty: boolean = true;

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
    this.isEmpty = this.checkEmpty();
    

    this.doughnutChartData = {
      labels: this.data.labels,
      datasets: this.data.datasets
    };
  }

  public checkEmpty(){
    if(this.data == undefined || this.data == null)
      return true;
    else if(this.data.datasets.length <= 0 || this.data.labels.filter(l => l != null).length <= 0)
      return true;
    else if (this.data.datasets[0].data.length <= 0)
      return true;
    else{
      let fullDatasetEmpty = (this.data.datasets[0].data.filter(v => v != null)).length <= 0;
      return fullDatasetEmpty;
    }    
  }
}
