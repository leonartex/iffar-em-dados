import { Component, OnInit, Input } from '@angular/core';
import { EntryAndProgressInfo } from 'src/app/shared/model/api/entryAndProgressInfo.model';
import { EntryMethod } from 'src/app/shared/model/api/entryMethod.model';
import { RateCards } from 'src/app/shared/model/api/rateCards.model';
import { SlotReservationOptions } from 'src/app/shared/model/api/slotReservationOptions.model';
import { BarChartData } from 'src/app/shared/model/barChartData.model';
import { Card } from 'src/app/shared/model/card.model';

@Component({
  selector: 'app-entry-and-progress-info',
  templateUrl: './entry-and-progress-info.component.html',
  styleUrls: ['./entry-and-progress-info.component.scss']
})
export class EntryAndProgressInfoComponent implements OnInit {
  @Input() years: Array<string> = [];

  @Input() entryAndProgressInfo: EntryAndProgressInfo = new EntryAndProgressInfo;

  public colors = ['#0E3B43', '#205E3B', '#297F3E', '#CD191E', '#911216'];

  public rateCards: Array<Card> = [];
  public entryMethods: BarChartData = new BarChartData;
  public slotReservationOptions: BarChartData = new BarChartData;

  constructor() { }

  ngOnInit(): void {
    this.rateCards = this.mountRateCards(this.entryAndProgressInfo.rateCards);
    this.entryMethods = this.mountEntryMethodsChart(this.entryAndProgressInfo.entryMethods);
    console.log(this.entryMethods);
    this.slotReservationOptions = this.mountSlotReservationOptions(this.entryAndProgressInfo.slotReservationOptions);
    console.log(this.slotReservationOptions);
  }

  private mountRateCards(rateCards: RateCards): Array<Card>{
    let cards: Array<Card> = [];

    let enrolledStudentsCard = new Card;
    let incomingStudentsCard = new Card;
    let concludingStudentsCard = new Card;
    let dropoutStudentsCard = new Card;

    enrolledStudentsCard.description = 'Matrículas efetivadas';
    enrolledStudentsCard.value = rateCards.enrolledStudents;
    cards.push(enrolledStudentsCard);

    incomingStudentsCard.description = 'Matrículas ingressantes';
    if(rateCards.pnpIncomingStudents != null)
      incomingStudentsCard.value = rateCards.pnpIncomingStudents;
    else
      incomingStudentsCard.value = rateCards.apiIncomingStudents;
    cards.push(incomingStudentsCard);

    concludingStudentsCard.description = 'Matrículas concluintes';
    if(rateCards.concludingStudents.concluded != null && rateCards.concludingStudents.integralized != null){
      concludingStudentsCard.value = rateCards.concludingStudents.concluded + rateCards.concludingStudents.integralized;
    }else
      concludingStudentsCard.value = null;
    cards.push(concludingStudentsCard);

    //Para o card de estudantes evadidos é necessário processar todos os motivos de evasão para somar tudo posteriormente
    let dropoutAdditional = [
      {description: "Matrículas descontinuadas", value: rateCards.dropoutStudents.discontinued},
      {description: "Matrículas canceladas", value: rateCards.dropoutStudents.cancelled},
      {description: "Matrículas abandonadas", value: rateCards.dropoutStudents.abandoned},
      {description: "Matrículas reprovadas", value: rateCards.dropoutStudents.reproved},
      {description: "Transferência externa", value: rateCards.dropoutStudents.externalTransfer},
      {description: "Transferência interna", value: rateCards.dropoutStudents.internalTransfer},
    ].filter(item => item.value > 0); //Filtro os zerados para reduzir o tamanho do addon do card
    let dropoutTotal = dropoutAdditional.reduce((total, item) => total + item.value, 0);
    dropoutStudentsCard.description = 'Matrículas evadidas';
    dropoutStudentsCard.value = dropoutTotal;
    cards.push(dropoutStudentsCard);

    return cards;
  }

  private mountEntryMethodsChart(entryMethods: Array<EntryMethod>): BarChartData{
    let chartData = new BarChartData;

    //Como trata-se apenas de métodos de entrada, adiciono previamente o único dataset que será utilizado, para depois adicionar os dados via push()
    chartData.datasets.push({
      label: 'Alunos',
      data: [],
      backgroundColor: this.colors[1]
    })

    //Percorro todos os métodos de entrada para montar os dados necessários para montar um gráfico
    for(let entryMethod of entryMethods){
      chartData.labels.push(entryMethod.entryMethodDescription);
      chartData.datasets[0].data.push(entryMethod.total);
    }

    return chartData;
  }

  private mountSlotReservationOptions(slotReservationOptions: SlotReservationOptions): BarChartData{
    let chartData = new BarChartData();

    if(slotReservationOptions == null || slotReservationOptions == undefined){
      chartData.labels = ['AC', 'L1', 'L2', 'L5', 'L6', 'L9', 'L10', 'L13', 'L14'];

      return chartData;
    }
    
    //Tanto vagas regulares quanto extraordinárias apresentam as mesmas propriedades (mesmo conjunto de vagas), por isso só formo o array com as chaves das vagas regulares
    chartData.labels = Object.keys(slotReservationOptions.regular).map(slot => slot.toUpperCase());
    
    //No caso das reservas de vagas, apresentam-se dois datasets distintos: vagas regulares e vagas extraordinárias
    chartData.datasets.push({
      label: 'Vagas regulares',
      data: Object.values(slotReservationOptions.regular), //Transformo os valores contidos nas propriedades do objeto em um único array
      backgroundColor: this.colors[1]
    });
    chartData.datasets.push({
      label: 'Vagas extraordinárias',
      data: Object.values(slotReservationOptions.extraordinary),
      backgroundColor: this.colors[2]
    });

    return chartData;
  }

  public onChangeYear(){
    
  }

}
