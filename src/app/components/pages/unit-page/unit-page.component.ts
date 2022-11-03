import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UnitPageResponse } from 'src/app/shared/model/api/responses/unitPageResponse.model';

@Component({
  selector: 'app-unit-page',
  templateUrl: './unit-page.component.html',
  styleUrls: ['./unit-page.component.scss']
})
export class UnitPageComponent implements OnInit {
  private apiUrl: string;
  
  public response: UnitPageResponse = new UnitPageResponse;
  public coursesInfo: any;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:3333/api';
    this.http.get<UnitPageResponse>(`${this.apiUrl}/unit/sao-borja`)
    .subscribe(res => {
      console.log(res);
      this.response = res;
      this.coursesInfo = this.response.infoPerYear[0].coursesInfo;
      console.log(this.coursesInfo);
    })
  }

  ngOnInit(): void {
  }

}
