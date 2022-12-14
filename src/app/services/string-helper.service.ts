import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringHelperService {

  constructor() { }

  public normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }


  public urlFriendly(str: string): string {
    let capitalised = this.portugueseTitleCase(str);
    return this.normalizeString(capitalised).replace(/ /g, '-').toLowerCase();
  }

  public portugueseTitleCase(str: string): string {
    //Substituto múltiplos espaços e outros caracteres do tipo por um espaço apenas
    //RegEx: string = string.replace(/\s\s+/g, ' ')
    //Fonte: https://stackoverflow.com/questions/1981349/regex-to-replace-multiple-spaces-with-a-single-space
    str = str.replace(/\s\s+/g, ' ');

    //Deixo tudo em minúsculo e separo em um vetor de palavras usando o espaço
    let words = str.toLocaleLowerCase('pt-BR').split(' ');

    /**Lista de exceções:
     * a; as;
     * 
     * à; às;
     * 
     * ao; aos;
     * 
     * o; os;
     * 
     * e;
     * com;
     * 
     * de;
     * da; das;
     * do; dos;
     * 
     * em;
     * ou;
     * 
     * na; nas;
     * no; nos
     * 
     * por; para;
     * 
     * pra; pras;
     * pro; pros
     * 
     * pela; pelas;
     * pelo; pelos;
     * 
     * um; uma;
     * 
     * que;
     * 
     * algarismo romano
     */

    //Vetor com todas as exceções de palavras
    let exceptions = ['a', 'as', 'à', 'às', 'ao', 'aos', 'o', 'os', 'e', 'com', 'de', 'da', 'das', 'do', 'dos', 'em', 'ou', 'na', 'nas', 'no', 'nos', 'por', 'para', 'pra', 'pras', 'pro', 'pros', 'pela', 'pelas', 'pelo', 'pelos', 'um', 'uma', 'que'];
    //List de algarismos romanos (para o caso de nome de disciplinas e maior parte dos casos, acho que até o 10 é o suficiente)
    let numerals = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];

    //Agora percorro todas as palavras para deixar a inicial em maiúsculo, porém, verificando as exceções, dando o devido tratamento
    for (let i = 0; i < words.length; i++) {
      //Uso true para sempre inicializar o switch por irei verificar mais de uma condição para as situações no switch
      switch (true) {
        //Verifico se não é uma das exceções
        //i > 0: porque se for no início do título deve ficar com inicial em mauísculo
        case (exceptions.find(exception => exception == words[i]) != undefined && i > 0):
          break; //Não faz nada com a string, já que deve continuar em minúsculo
        //Verifico se não é um algarismo romano
        //Para o caso de algarismos romanos, deixo em maiúsculo tudo
        case numerals.find(numeral => numeral == words[i]) != undefined:
          words[i] = words[i].toUpperCase();
          break;
        //Se não for nenhuma das exceções, deixa a inicial maiúscula
        default:
          words[i] = words[i].charAt(0).toLocaleUpperCase('pt-BR') + words[i].slice(1);
      }
    }

    //Junta de volta para uma string só e retorna ela
    return words.join(' ');
  }
}
