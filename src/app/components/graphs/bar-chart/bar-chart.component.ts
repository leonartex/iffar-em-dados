import { Component, OnInit, Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BarChartData } from 'src/app/shared/model/barChartData.model';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @Input() data: BarChartData = new BarChartData;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
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
              size: 22
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

  ngOnInit(): void {
    this.barChartData.labels = this.data.labels;
    this.barChartData.datasets = this.data.datasets;
  }

}
