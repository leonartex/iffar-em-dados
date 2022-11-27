import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StringHelperService } from 'src/app/services/string-helper.service';
import { UnitPageResponse } from 'src/app/shared/model/api/responses/unitPageResponse.model';
import { Card } from 'src/app/shared/model/card.model';

@Component({
  selector: 'app-unit-page',
  templateUrl: './unit-page.component.html',
  styleUrls: ['./unit-page.component.scss']
})
export class UnitPageComponent implements OnInit {
  private campus: string;

  private apiUrl: string;
  
  public response: UnitPageResponse | null = null;
  public units: any;

  public years: Array<string> = [];
  public coursesInfo: any;
  public projectsInfo: any;
  public entryAndProgressInfo: any;
  public studentsProfile: any;

  public stringHelper = new StringHelperService();

  public header: {
    type: string,
    title: Array<string>,
    breadcrumb: Array<any>,
    background: Array<string>,
    cards: Array<Card>
  } | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute){
    this.campus = this.route.snapshot.paramMap.get('campus')!;

    this.apiUrl = 'http://localhost:3333/api';
    this.http.get<UnitPageResponse>(`${this.apiUrl}/unit/${this.stringHelper.urlFriendly(this.campus)}`)
    .subscribe(res => {
      console.log(res);
      this.response = res;

      this.header = this.mountHeader(res);

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
    })
  }

  ngOnInit(): void {
  }

  private mountHeader(res: UnitPageResponse): {
    type: string,
    title: Array<string>,
    breadcrumb: Array<any>,
    background: Array<string>,
    cards: Array<Card>
  }{
    let type: string = 'campus';

    let title: Array<string> = [];
    switch (res.units[0].type){
      case 'campus':
          title.push('Campus');
          break;
      case 'advanced-campus':
        title.push('Campus Avançado');
        break;
      default:
        title.push('');
    }
    title.push(res.units[0].city.cityName);

    let breadcrumb: Array<any> = [{label: 'Início', url: '/'}, {label: res.units[0].city.cityName, url: '/sao-borja/'}];

    let background = res.infoPerYear[0].coursesInfo.map(course => course.apiNameFiltered);

    let cards: Array<Card> = []

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
