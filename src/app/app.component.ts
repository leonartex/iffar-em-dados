import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import CourseInfo from './shared/model/api/courseInfo.model';
import { EntryMethod } from './shared/model/api/entryMethod.model';
import { RateCards } from './shared/model/api/rateCards.model';
import { SlotReservationOptions } from './shared/model/api/slotReservationOptions.model';
import StudentsProfile from './shared/model/api/studentsProfile.model';
import { BarChartData } from './shared/model/barChartData.model';
import { Card } from './shared/model/card.model';
import { ProcessedInfo } from './shared/model/processedInfo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'iffar-em-dados';

  constructor(){
    
  }

  ngOnInit(){
    
  }

}
