import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

import { StringHelperService } from 'src/app/services/string-helper.service';
import CourseInfo from 'src/app/shared/model/api/courseInfo.model';
import { EntryMethod } from 'src/app/shared/model/api/entryMethod.model';
import { RateCards } from 'src/app/shared/model/api/rateCards.model';
import { CoursePageResponse } from 'src/app/shared/model/api/responses/coursePageResponse.model';
import { SlotReservationOptions } from 'src/app/shared/model/api/slotReservationOptions.model';
import StudentsProfile from 'src/app/shared/model/api/studentsProfile.model';
import { BarChartData } from 'src/app/shared/model/barChartData.model';
import { Card } from 'src/app/shared/model/card.model';
import { ProcessedInfo } from 'src/app/shared/model/processedInfo.model';
import { withCache } from '@ngneat/cashew';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {
  public apiError: any = null;
  public apiErrorMessages: Array<string> = [];

  public stringHelperService = new StringHelperService();

  private campusName: string;
  private courseName: string;
  private courseId: string;

  private apiUrl: string = 'http://localhost:3333/api';
  
  public response: CoursePageResponse | null = null;
  public units: any;
  public courseDetailing: any;

  public years: Array<string> = [];
  public entryAndProgressInfo: any;
  public studentsProfile: any;

  public header: {
    type: string,
    title: Array<string>,
    breadcrumb: Array<any>,
    background: Array<string>,
    cards: Array<Card>
  } | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute, private location: Location){
    this.campusName = this.route.snapshot.paramMap.get('campus')!;
    this.courseName = this.route.snapshot.paramMap.get('courseName')!;
    this.courseId = this.route.snapshot.paramMap.get('courseId')!;
  }

  ngOnInit(){
    this.http.get<CoursePageResponse>(`${this.apiUrl}/course/${this.courseId}`,{
      context: withCache()
    }).subscribe(
      res => {
        console.log(res);
        this.response = res;

        let urlCampusCity = this.stringHelperService.urlFriendly(res.courseDetailing.city);
        let urlCourseName = this.stringHelperService.urlFriendly(res.courseDetailing.apiNameFiltered);

        if(this.campusName !=  urlCampusCity || this.courseName != urlCourseName){
          this.location.replaceState(`${urlCampusCity}/${urlCourseName}/${this.courseId}`);
        }

        this.courseDetailing = res.courseDetailing;

        this.response.infoPerYear.sort((infoA, infoB) => {
          let yA: string = infoA.year.toString().toUpperCase();
          let yB: string = infoB.year.toString().toUpperCase();
          return (yA < yB) ? -1 : (yA > yB) ? 1 : 0;
        }).reverse();
        this.years = [...new Set(this.response.infoPerYear.map(infoP => infoP.year))];

        this.header = this.mountHeader(res);

        this.entryAndProgressInfo = this.response.infoPerYear[0].entryAndProgressInfo;
        this.studentsProfile = this.response.infoPerYear[0].studentsProfile;

      }, 
      error => {
        console.log(error)
        this.apiError = error;
        this.mountErrorMessage();
      })
  }

  private mountHeader(res: CoursePageResponse): {
    type: string,
    title: Array<string>,
    breadcrumb: Array<any>,
    background: Array<string>,
    cards: Array<Card>
  }{
    let type: string = 'course';

    let title: Array<string> = [];
    title.push(res.courseDetailing.degree + ' em');
    title.push(res.courseDetailing.apiNameFiltered);
    title.push("Campus "+res.courseDetailing.city);
    // ['Bacharelado em', 'Sistemas de Informação', 'Campus São Borja'];

    let breadcrumb: Array<any> = [
      {label: 'Início', url: '/'}, 
      {label: "Campus "+res.courseDetailing.city, url: `/${this.stringHelperService.urlFriendly(res.courseDetailing.city)}`}, 
      {label: res.courseDetailing.apiNameFiltered, url: `/${this.stringHelperService.urlFriendly(res.courseDetailing.city)}/${this.stringHelperService.urlFriendly(res.courseDetailing.apiNameFiltered)}/${res.courseDetailing.apiId}`}
    ];

    let background = res.courseComponents;

    let cards: Array<Card> = []

    let studentsCard = new Card;
    studentsCard.reverse = true;
    studentsCard.description = "Alunos matriculados";
    studentsCard.value = res.infoPerYear[0].entryAndProgressInfo.rateCards.enrolledStudents;
    if(studentsCard.value == undefined || studentsCard.value == null){
      studentsCard.description = "Alunos ingressantes";
      studentsCard.value = res.infoPerYear[0].entryAndProgressInfo.rateCards.apiIncomingStudents;
    }

    cards.push(studentsCard); 

    return {
      type,
      title,
      breadcrumb,
      background,
      cards
    }
  }
  
  public mountErrorMessage(){
    switch(this.apiError.status){
      case 404:
        this.apiErrorMessages.push('Curso não encontrado, não existente ou erro ocasionado nos dados abertos da instituição');
        break;
      case 500:
        this.apiErrorMessages.push('Erro ao processar os dados do curso');        
        break;
    }
    
  }

  public onChangeEntryInfoYear(year: string) {
    let yearIndex = this.response!.infoPerYear.findIndex(info => info.year == year);
    this.entryAndProgressInfo = this.response!.infoPerYear[yearIndex].entryAndProgressInfo;
  }

  public onChangeStudentsYear(year: string) {
    let yearIndex = this.response!.infoPerYear.findIndex(info => info.year == year);
    this.studentsProfile = this.response!.infoPerYear[yearIndex].studentsProfile;
  }

  // //Função para trocar elementos de array de posição: https://stackoverflow.com/questions/4011629/swapping-two-items-in-a-javascript-array
  // private swapItems(array: Array<any>, a: number, b: number){
  //   array[a] = array.splice(b, 1, array[a])[0]; //array[a] recebe o valor que foi removido (o retorno de um splice) enquanto remove 1 elemento na posição b, adicionando o a no lugar, assim, trocando de posição
  //   return array;
  // }

}
