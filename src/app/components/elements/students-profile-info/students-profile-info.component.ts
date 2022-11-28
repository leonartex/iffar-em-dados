import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { StringHelperService } from 'src/app/services/string-helper.service';
import StudentsProfile from 'src/app/shared/model/api/studentsProfile.model';
import { BarChartData } from 'src/app/shared/model/barChartData.model';

@Component({
  selector: 'app-students-profile-info',
  templateUrl: './students-profile-info.component.html',
  styleUrls: ['./students-profile-info.component.scss']
})
export class StudentsProfileInfoComponent implements OnChanges {
  @Input() years: Array<string> = [];

  @Input() studentsProfile: StudentsProfile = new StudentsProfile;

  @Output() changeStudentsYear: EventEmitter<string> = new EventEmitter();

  public colors = ['#0E3B43', '#205E3B', '#297F3E', '#CD191E', '#911216'];

  public incomeDistribution: BarChartData = new BarChartData;
  public racialDistribution: BarChartData = new BarChartData;
  public genderDistribution: BarChartData = new BarChartData;
  public ageDistribution: BarChartData = new BarChartData;

  public stringHelperService;

  constructor() {
    this.stringHelperService = new StringHelperService();
  }

  ngOnChanges(): void {
    this.incomeDistribution = this.mountIncomeDistribution(this.studentsProfile);
    //console.log(this.incomeDistribution);
    
    this.racialDistribution = this.mountRacialDistribution(this.studentsProfile);
    //console.log(this.racialDistribution);
    
    this.genderDistribution = this.mountGenderDistribution(this.studentsProfile);
    //console.log(this.genderDistribution);

    this.ageDistribution = this.mountAgeGroupDistribution(this.studentsProfile);
    console.log(this.ageDistribution);
  }
  //Monto os dados no formato necessário para mostrar informações apenas da distribuição de estudantes por renda familiar
  private mountIncomeDistribution(studentsProfile: StudentsProfile): BarChartData{
    let incomeChart = new BarChartData();
    if(studentsProfile == null || studentsProfile == undefined){
      incomeChart.labels = [
        "---"
    ];
      return incomeChart;
    }

    let racialDistribution = studentsProfile.racialDistribution;
    //Uso o map() para pegar apenas os dados de renda (para o gráfico de distribuição por cor ou raça será necessário um método um pouco diferente)
    let incomeNotFlat = racialDistribution.map(racialDistEl => racialDistEl.income);
    //Tendo apenas os dados de renda, agora é necessário usar o flat() para tornar um único array
    let income = incomeNotFlat.flat();
    //Com todos os dados de renda em um array só, crio os labels de renda
    incomeChart.labels = [...new Set(income.map(income => income.description))].sort();
    
    //Mas ainda preciso corrigir a ordenação dos labels (se no futuro forem adicionadas diferentes rendas, a lógica pode quebrar (mais para o futuro posso pensar em algo melhor))
    incomeChart.labels = this.swapItems(incomeChart.labels, 0,1)
    incomeChart.labels = this.swapItems(incomeChart.labels, 2,3)
    incomeChart.labels = this.swapItems(incomeChart.labels, 5,6)
    
    incomeChart.datasets.push({
      label: 'Alunos',
      data: [],
      backgroundColor: this.colors[1]
    })
    //Agora adiciono os dados, realizando a soma dos objetos que possuem a mesma renda
    for(let i = 0; i < incomeChart.labels.length; i++){
      let totalStudents = income.reduce((total, current) => current.description == incomeChart.labels[i] ? total + current.total : total, 0);
      incomeChart.datasets[0].data.push(totalStudents);
    }

    return incomeChart;
  }

  private mountRacialDistribution(studentsProfile: StudentsProfile): BarChartData{
    let racialDistributionChart = new BarChartData();

    if(studentsProfile == null || studentsProfile == undefined){
      racialDistributionChart.labels = [
        "---",
    ];
      return racialDistributionChart;
    }

    let racialDistribution = studentsProfile.racialDistribution;
    //console.log(racialDistribution);

    //Crio os labels
    racialDistributionChart.labels = [...new Set(racialDistribution.map(racialDistEl => this.stringHelperService.portugueseTitleCase(racialDistEl.description)))].sort();
    
    //Faço o label de informação não declarada ficar por último. Fonte: https://stackoverflow.com/questions/24909371/move-item-in-array-to-last-position
    racialDistributionChart.labels.push(racialDistributionChart.labels.splice(racialDistributionChart.labels.indexOf('Não Declarada'), 1)[0]);
    //console.log(racialDistributionChart.labels);

    racialDistributionChart.datasets.push({
      label: 'Alunos',
      data: [],
      backgroundColor: this.colors[1]
    })
    //Percorro o array de labels para realizar a respectiva adição dos valores
    for(let i = 0; i < racialDistributionChart.labels.length; i++){
      let data = racialDistribution.find(racialDistEl => this.stringHelperService.portugueseTitleCase(racialDistEl.description) == racialDistributionChart.labels[i]);

      if(data){
        //Transformo os objetos sobre renda familiar apenas no número de estudantes que existem em cada tipo
        let students = data.income.map(incomeEl => incomeEl.total);
        //Agora uso reduce() para somar todos esses valores, assim, retornando o total de estudantes de determinada cor ou raça
        let totalStudents = students.reduce((total, current) => total + current);
        racialDistributionChart.datasets[0].data.push(totalStudents)
      }
    }

    return racialDistributionChart;
  }

  //Função praticamente igual à mountIncomeDistribution()
  private mountGenderDistribution(studentsProfile: StudentsProfile): BarChartData{
    let genderChart = new BarChartData();
    if(studentsProfile == null || studentsProfile == undefined){
      // genderChart.labels = [
      //   "---"
      // ];
      return genderChart;
    }

    let ageGroupDistribution = studentsProfile.ageGroupsDistribution;
    //console.log(ageGroupDistribution);

    //Uso o map() para pegar apenas os dados de renda (para o gráfico de distribuição por cor ou raça será necessário um método um pouco diferente)
    let genderNotFlat = ageGroupDistribution.map(ageGroupEl => ageGroupEl.genderDistribution);
    //Tendo apenas os dados de renda, agora é necessário usar o flat() para tornar um único array
    let gender = genderNotFlat.flat();
    //Com todos os dados de renda em um array só, crio os labels de renda
    genderChart.labels = [...new Set(gender.map(gender => gender.description))].sort();
    
    //Mas ainda preciso corrigir a ordenação dos labels (se no futuro forem adicionadas diferentes rendas, a lógica pode quebrar (mais para o futuro posso pensar em algo melhor))
    // genderChart.labels = this.swapItems(genderChart.labels, 0,1)
    //console.log(genderChart.labels);
    
    genderChart.datasets.push({
      label: 'Alunos',
      data: [],
      backgroundColor: this.colors
    })
    //Agora adiciono os dados, realizando a soma dos objetos que possuem a mesma renda
    for(let i = 0; i < genderChart.labels.length; i++){
      let totalStudents = gender.reduce((total, current) => current.description == genderChart.labels[i] ? total + current.total : total, 0);
      genderChart.datasets[0].data.push(totalStudents);

      //Formato o nome do label
      switch(genderChart.labels[i]){
        case 'F':
          genderChart.labels[i] = 'Feminino';
          break;
        case 'M':
          genderChart.labels[i] = 'Masculino';
          break;
        case 'S/I':
          genderChart.labels[i] = 'Sem identificação';
          break;
      }
    }

    return genderChart;
  }

  private mountAgeGroupDistribution(studentsProfile: StudentsProfile, steps: number = 5): BarChartData{
    let ageGroupChart = new BarChartData;

    if(studentsProfile == null || studentsProfile == undefined){
      // ageGroupChart.labels = [
      //   "---",
      // ];
      return ageGroupChart;
    }

    let ageGroups = studentsProfile.ageGroupsDistribution;
    console.log(ageGroups);

    //Pego os dados de idade que serão usados como label
    ageGroupChart.labels = ageGroups.map(ageGroup => ageGroup.age).sort();
    console.log(ageGroupChart.labels);

    // //Agora separo os labels que são números, para poder ordenar e então agrupar
    // let numberLabels = labels.filter(label => this.isNum(label));
    // //Transformo em número
    // numberLabels = numberLabels.map(label => parseInt(label))

    ageGroupChart.datasets.push({
      label: 'Alunos',
      data: [],
      backgroundColor: this.colors[1]
    })
    //Percorro os labels para montar os dados
    for(let i = 0; i < ageGroupChart.labels.length; i++){
      let data = ageGroups.find(ageGroup => ageGroup.age == ageGroupChart.labels[i]);

      if(data){
        //Transformo os objetos sobre renda familiar apenas no número de estudantes que existem em cada tipo
        let students = data.genderDistribution.map(genderEl => genderEl.total);
        //Agora uso reduce() para somar todos esses valores, assim, retornando o total de estudantes de determinada cor ou raça
        let totalStudents = students.reduce((total, current) => total + current);
        ageGroupChart.datasets[0].data.push(totalStudents)
      }

      switch(ageGroupChart.labels[i]){
        case 'S/I':
          ageGroupChart.labels[i] = 'Sem identificação';
          break;
      }
    }


    return ageGroupChart;
  }

  public onChangeYear(year: string){
    //Emito o alerta pra atualizar os dados
    console.log('Students: '+year);
    this.changeStudentsYear.emit(year);
    this.genderDistribution;
  }

  //Função para trocar elementos de array de posição: https://stackoverflow.com/questions/4011629/swapping-two-items-in-a-javascript-array
  private swapItems(array: Array<any>, a: number, b: number){
    array[a] = array.splice(b, 1, array[a])[0]; //array[a] recebe o valor que foi removido (o retorno de um splice) enquanto remove 1 elemento na posição b, adicionando o a no lugar, assim, trocando de posição
    return array;
  }

  //Verifica se uma string é um número
  private isNum(v: string) {
    return /\d/.test(v);
  }

}
