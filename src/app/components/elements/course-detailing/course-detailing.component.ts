import { Component, OnInit, Input } from '@angular/core';
import { CourseDetailing } from 'src/app/shared/model/api/courseDetailing.model';
import { Card } from 'src/app/shared/model/card.model';

@Component({
  selector: 'app-course-detailing',
  templateUrl: './course-detailing.component.html',
  styleUrls: ['./course-detailing.component.scss']
})
export class CourseDetailingComponent implements OnInit {

  @Input() courseDetalingInfo: CourseDetailing = new CourseDetailing;

  public cards: Array<Card> = [];

  constructor() { }

  ngOnInit(): void {
    this.cards = this.mountCards(this.courseDetalingInfo)
  }

  private mountCards(courseDetalingInfo: any): Array<Card>{
    let cards: Array<Card> = [];

    let levelCard = new Card;
    levelCard.type = 'small-upper-title';
    levelCard.description = 'Nível de curso';
    levelCard.value = courseDetalingInfo.level;
    cards.push(levelCard);

    let degreeCard = new Card;
    degreeCard.type = 'small-upper-title';
    degreeCard.description = 'Grau de curso';
    degreeCard.value = courseDetalingInfo.degree;
    cards.push(degreeCard);

    let modalityCard = new Card;
    modalityCard.type = 'small-upper-title';
    modalityCard.description = 'Modalidade';
    modalityCard.value = courseDetalingInfo.modality;
    cards.push(modalityCard);

    let cityCard = new Card;
    cityCard.type = 'small-upper-title';
    cityCard.description = 'Cidade da oferta';
    cityCard.value = courseDetalingInfo.city;
    cards.push(cityCard);

    let offerCard = new Card;
    offerCard.type = 'small-upper-title';
    offerCard.description = 'Período de oferta';
    offerCard.value = courseDetalingInfo.offerType;
    cards.push(offerCard);

    let knowledgeCard = new Card;
    knowledgeCard.type = 'small-upper-title';
    if(courseDetalingInfo.level == 'Técnico'){
      knowledgeCard.description = 'Eixo do conhecimento';
      knowledgeCard.value = courseDetalingInfo.knowledgeAxis;
    }else{
      knowledgeCard.description = 'Área do conhecimento';
      knowledgeCard.value = courseDetalingInfo.knowledgeArea;
    }    
    cards.push(knowledgeCard);

    let courseLoadCard = new Card;
    courseLoadCard.type = 'small-upper-title';
    courseLoadCard.description = 'Carga horária';
    courseLoadCard.value = courseDetalingInfo.courseLoad;
    cards.push(courseLoadCard);

    let minimumCourseLoadCard = new Card;
    minimumCourseLoadCard.type = 'small-upper-title';
    minimumCourseLoadCard.description = 'Carga horária mínima';
    minimumCourseLoadCard.value = courseDetalingInfo.minimumCourseLoad;
    cards.push(minimumCourseLoadCard);

    let turnCard = new Card;
    turnCard.type = 'small-upper-title';
    turnCard.description = 'Turno de oferta';
    turnCard.value = courseDetalingInfo.turn;
    cards.push(turnCard);

    let courseSlotsCard = new Card;
    courseSlotsCard.type = 'small-upper-title';
    courseSlotsCard.description = 'Vagas ofertadas';
    courseSlotsCard.value = courseDetalingInfo.courseSlots;
    cards.push(courseSlotsCard);

    return cards;
  }

}
