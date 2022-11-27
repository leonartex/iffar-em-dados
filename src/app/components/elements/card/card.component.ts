import { Component, OnChanges, Input } from '@angular/core';
import { Card } from 'src/app/shared/model/card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnChanges {
  
  @Input() cardData: Card = new Card;

  constructor() { }

  ngOnChanges(): void {
    if(this.cardData.value == null || this.cardData.value == undefined){}
  }

}
