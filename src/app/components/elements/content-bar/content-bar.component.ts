/**
 * Componente para criar uma barra de "filtro" de conteúdo. 
 * Inicialmente é apenas para o usuário selecionar o ano que quer ver de informação, mas existem outras possibilidades de uso também, para o futuro.
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-bar',
  templateUrl: './content-bar.component.html',
  styleUrls: ['./content-bar.component.scss']
})
export class ContentBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
