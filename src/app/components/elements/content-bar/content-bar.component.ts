/**
 * Componente para criar uma barra de "filtro" de conteúdo. 
 * Inicialmente é apenas para o usuário selecionar o ano que quer ver de informação, mas existem outras possibilidades de uso também, para o futuro.
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-content-bar',
  templateUrl: './content-bar.component.html',
  styleUrls: ['./content-bar.component.scss']
})
export class ContentBarComponent implements OnInit {

  @Input() years: Array<string> = [];

  @Output() changeYear: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  //Emite o evento para trocar o ano
  public handleClick(year: string){
    console.log(year);
    this.changeYear.emit(year);
  }

}
