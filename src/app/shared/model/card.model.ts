/**Exemplo:
   * data = {
   *  type = 'default',
   *  description = 'Cursos ofertados',
   *  value = 123,
   *  addon = [
   *    {type: 'default', description: 'Técnico', value: 12},
   *    {type: 'default', description: 'Graduação', value: 12},
   *    {type: 'line'}, //Desenha uma <hr>
   *    {type: 'default', description: 'Presencial', value: 12},
   *    {type: 'default', description: 'À distância', value: 12},
   *  ]
   * }
   * 
   * Addon em um exemplo de card de curso:
   *    {type: 'small-title', description: 'Ofertado em', value: 12},
   *    {type: 'link', description: 'São Borja', value: 12},
   */

/** 
 * @param type default; only-title; small-upper-title; 
 * @param filterProperty uma propriedade opcional para adicionar algum valor qualquer para uma filtragem posterior na apresentação dos cards (ex.: adicionar o grau do curso para permitir estilizar o card de alguma maneira específica, como cor de fundo)
 * @param level define o nível de heading utilizado para o card, por exemplo, utilizar h3 ou h4 no título do card
 */
export class Card{
  description: string = '';
  value: string | number | null = null;
  type: string = 'default';
  headLevel: string = '3';
  additionalInfo?: Array<any>;
  filterProperty?: string | number;
}