import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/shared/model/card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  
  @Input() cardData: Card = new Card;

  constructor() { }

  ngOnInit(): void {
  }

}
