import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UnitPageResponse } from 'src/app/shared/model/api/responses/unitPageResponse.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  private apiUrl: string;
  
  public response: UnitPageResponse = new UnitPageResponse;
  public coursesInfo: any;
  public projectsInfo: any;
  public entryAndProgressInfo: any;
  public studentsProfile: any;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:3333/api';
    this.http.get<UnitPageResponse>(`${this.apiUrl}/unit/frederico-westphalen`)
    .subscribe(res => {
      console.log(res);
      this.response = res;
      this.coursesInfo = this.response.infoPerYear[0].coursesInfo;
      this.projectsInfo = this.response.infoPerYear[0].projectsInfo;
      this.projectsInfo = this.response.infoPerYear[0].projectsInfo;
      this.entryAndProgressInfo = this.response.infoPerYear[0].entryAndProgressInfo;
      this.studentsProfile = this.response.infoPerYear[0].studentsProfile;

      console.log(this.response.infoPerYear[0].projectsInfo);
    })
  }

  ngOnInit(): void {
  }

}
