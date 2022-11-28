import { Component, OnChanges, Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BarChartData } from 'src/app/shared/model/barChartData.model';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnChanges {

  @Input() data: BarChartData = new BarChartData;
  public isEmpty: boolean = true;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: false,
    maintainAspectRatio: true,
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          autoSkip: false
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
              size: 16
          }
      }
      },
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  constructor() {
  }

  ngOnChanges(): void {
    // this.barChartData.labels = this.data.labels;
    // this.barChartData.datasets = this.data.datasets;
    // this.height = 200 +this.data.datasets[0].data.length * 20;
    // this.width = 300;
    this.isEmpty = this.checkEmpty();
    
    this.barChartData = {
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
