import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/shared/model/card.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public colors = ['#0E3B43', '#205E3B', '#297F3E', '#CD191E', '#911216'];
  /**
   * @param type home; campus; course
   */
  @Input() type: string = 'home';

  @Input() title: Array<string> = [];

  @Input() breadcrumb: Array<{ label: string, url: string }> = [];

  @Input() background: Array<string> = [];
  public backgroundMounted: Array<string> = [];
  public backgroundBegining: Array<string> = [];

  @Input() cards: Array<Card> = [];

  //Pego os valores de tamanho de tela (só preciso mesmo da largura de tela) para montar as frases de cada linha do plano de fundo garantindo um tamanho certo
  public getScreenWidth: any;
  public getScreenHeight: any;

  constructor() { }

  ngOnInit(): void {
    this.mountBackground(this.background);
  }

  private mountBackground(sentences: Array<string>) {

    //Defino o número de linhas que quero de fundo, para gerar variação (depois o pattern vai repetir quando as linhas acabarem, garantindo a cobertura do resto do elemento)
    let lines = 20;
    for (let i = 0; i < lines; i++) {
      let row: string = '';
      let words: Array<string> = [];
      while(row.length < 500){
        words.push(sentences[this.getRandomInt(0, sentences.length-1)]);
        // row = words.join('\xa0\xa0⚬\xa0\xa0');
        row = words.join('\xa0\xa0\xa0\xa0');
      }
      
      this.backgroundMounted.push(row);
      this.backgroundBegining.push(this.getRandomBegining(3, 20));
    }
  }

  // @HostListener('window:resize', ['$event'])
  // onWindowResize() {
  //   this.getScreenWidth = window.innerWidth;
  //   this.getScreenHeight = window.innerHeight;

  //   console.log('Width: ' + this.getScreenWidth);
  //   console.log('Height: ' + this.getScreenHeight);
  // }

  //Função auxiliar para criar um início aleatório das linhas do background. Ela afeta a posição de X na hora de renderizar a linha e cria uma impressão de maior variância para caso uma linha comece com a mesma palavra
  public getRandomBegining(min: number, max: number): string {
    return '-' + (Math.random() * (max - min) + min) + 'ch';
  }

  //Função para pegar um número inteiro aleatório. Vou usar para pegar uma palavra aleatória para o background
  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



}
