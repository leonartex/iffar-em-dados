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
  public width: number = 0;
  public height: number = 0;

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
    this.height = 200 +this.data.datasets[0].data.length * 20;
    this.width = 300;
    
    this.barChartData = {
      labels: this.data.labels,
      datasets: this.data.datasets
    };
  }

}
