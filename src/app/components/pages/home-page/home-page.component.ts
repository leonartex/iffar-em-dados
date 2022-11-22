import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HomePageResponse } from 'src/app/shared/model/api/responses/homePageResponse.model';
import { Card } from 'src/app/shared/model/card.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  private apiUrl: string;
  
  public response: HomePageResponse | null = null;
  public map: any;
  public units: any;

  public years: Array<string> = [];
  public coursesInfo: any;
  public projectsInfo: any;
  public entryAndProgressInfo: any;
  public studentsProfile: any;

  public header: {
    type: string,
    title: Array<string>,
    breadcrumb: Array<any>,
    background: Array<string>,
    cards: Array<Card>
  } | null = null;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:3333/api';
    this.http.get<HomePageResponse>(`${this.apiUrl}/iffar`)
    .subscribe(res => {
      console.log(res);
      this.response = res;

      this.map = this.response.map;
      this.units = this.response.units;
      
      this.years = [...new Set(this.response.infoPerYear.map(infoP => infoP.year))];
      this.years.sort((yearA, yearB) => {
        let yA: string = yearA.toString().toUpperCase();
        let yB: string = yearB.toString().toUpperCase();
        return (yA < yB) ? -1 : (yA > yB) ? 1 : 0;
      }).reverse();

      this.coursesInfo = this.response.infoPerYear[0].coursesInfo;
      this.projectsInfo = this.response.infoPerYear[0].projectsInfo;
      this.projectsInfo = this.response.infoPerYear[0].projectsInfo;
      this.entryAndProgressInfo = this.response.infoPerYear[0].entryAndProgressInfo;
      this.studentsProfile = this.response.infoPerYear[0].studentsProfile;

      console.log(this.response.infoPerYear[0].projectsInfo);

      this.header = this.mountHeader(res);
    })
  }

  ngOnInit(): void {
  }

  private mountHeader(res: HomePageResponse): {
    type: string,
    title: Array<string>,
    breadcrumb: Array<any>,
    background: Array<string>,
    cards: Array<Card>
  }{
    let type: string = 'home';
    let title: Array<string> = ['IFFAR', 'em Dados'];
    let breadcrumb: Array<any> = [];

    let background = res.units.map(unit => unit.city.cityName);

    let cards: Array<Card> = []

    let campiCard = new Card;
    campiCard.description = "Unidades de ensino";
    campiCard.value = 11;
    cards.push(campiCard); 

    let coursesCard = new Card;
    coursesCard.description = "Cursos ofertados";
    coursesCard.value = res.infoPerYear[0].coursesInfo.length;
    cards.push(coursesCard);

    let studentsCard = new Card;
    studentsCard.description = "Alunos matriculados";
    studentsCard.value = res.infoPerYear[0].entryAndProgressInfo.rateCards.enrolledStudents;
    cards.push(studentsCard); 

    return {
      type,
      title,
      breadcrumb,
      background,
      cards
    }
  }

}
