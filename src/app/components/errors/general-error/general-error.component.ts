import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-general-error',
  templateUrl: './general-error.component.html',
  styleUrls: ['./general-error.component.scss']
})
export class GeneralErrorComponent implements OnInit {

  @Input() errorCode: string = '404'; //Valor padrão, 404
  @Input() messages: Array<string> = [];

  private background: Array<string> = [];
  public backgroundMounted: Array<string> = [];
  public backgroundBegining: Array<string> = [];

  constructor() { }

  ngOnInit(): void {
    

    this.background = this.mountSentences();

    this.mountBackground(this.background);
  }

  private mountSentences(){
    let errorMessages: Array<string> = [];
    let genericMessages: Array<string> = [
      'Pedimos desculpas', //'Imploramos perdão', 'Perdoai-nos', 'Suplicamos clemência',
      'Fique tranquilo', 'Não se preocupe',
      'Volte para o início', 'Volte para a página anterior'
    ]
    switch(this.errorCode){
      case '404':
        errorMessages = [
          '404', 'Erro 404',
          'Página não encontrada', 'Página não existente',
          'Não encontramos o que você pediu', 'Opa, parece que essa página não existe'
        ];
        break;
    }

    return genericMessages.concat(this.messages, errorMessages);
  }

  private mountBackground(sentences: Array<string>) {

    //Defino o número de linhas que quero de fundo, para gerar variação (depois o pattern vai repetir quando as linhas acabarem, garantindo a cobertura do resto do elemento)
    let lines = 30;
    for (let i = 0; i < lines; i++) {
      let row: string = '';
      let words: Array<string> = [];
      while (row.length < 500) {
        words.push(sentences[this.getRandomInt(0, sentences.length - 1)]);
        // row = words.join('\xa0\xa0⚬\xa0\xa0');
        row = words.join('\xa0\xa0\xa0\xa0');
      }

      this.backgroundMounted.push(row);
      this.backgroundBegining.push(this.getRandomBegining(3, 20));
    }
  }

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
