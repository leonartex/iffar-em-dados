import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import CourseInfo from './shared/model/api/courseInfo.model';
import { EntryMethod } from './shared/model/api/entryMethod.model';
import { RateCards } from './shared/model/api/rateCards.model';
import { SlotReservationOptions } from './shared/model/api/slotReservationOptions.model';
import StudentsProfile from './shared/model/api/studentsProfile.model';
import { BarChartData } from './shared/model/barChartData.model';
import { Card } from './shared/model/card.model';
import { ProcessedInfo } from './shared/model/processedInfo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'iffar-em-dados';
  private apiUrl: string;

  //Variável que armazenará o json recebido do backend
  public courseInfo: CourseInfo | null = null;

  //Conjunto de variáveis que representarão os valores que serão utilizados nos componentes para entregar as informações (os valores utilizados para impressão)
  public id: number = 1; //Variável para utilizar como parte do id dos gráficos
  public processedInfo: Array<ProcessedInfo> = [];
  
  public data1: any;
  public data2: any;

  public data3: any;
  public data4: any;
  public data5: any;
  public data6: any;


  constructor(private http: HttpClient){
    this.apiUrl = 'http://localhost:3333/api';
    this.http.get<CourseInfo>(`${this.apiUrl}/course/66658`)
    .subscribe(res => {
      this.courseInfo = res;
      this.processedInfo = this.processInfo(this.courseInfo);
      console.log(this.processedInfo);

      this.data1 = {data: this.processedInfo[2].entryMethods, id: 'bar-chart-'+this.id++}
      this.data2 = {data: this.processedInfo[2].slotReservationOptions, id: 'bar-chart-'+this.id++}
      this.data3 = {data: this.processedInfo[2].studentsProfile.income, id: 'bar-chart-'+this.id++}
      this.data4 = {data: this.processedInfo[2].studentsProfile.racialDistribution, id: 'bar-chart-'+this.id++}
      this.data5 = {data: this.processedInfo[2].studentsProfile.gender, id: 'bar-chart-'+this.id++}
      this.data6 = {data: this.processedInfo[2].studentsProfile.age, id: 'bar-chart-'+this.id++}
    });
  }

  ngOnInit(){
    
  }

  processInfo(courseInfo: CourseInfo): Array<ProcessedInfo>{
    let processedInfo: Array<ProcessedInfo> = [];

    //Pego o conjunto de anos para poder ordenar os anos de forma correta
    let years = [...new Set(courseInfo.infoPerYear.map(infoYear => infoYear.year))];
    //Ordeno e finalizo com um reverse para deixar o ano mais atual como o primeiro item a ser apresentado
    let orderedYears = Array.from(years).sort().reverse();
    console.log(orderedYears);

    for(let i = 0; i < orderedYears.length; i++){
      //Pego os dados do ano equivalente na variável courseInfo
      let yearInfo = this.courseInfo?.infoPerYear.find( yearInfo => yearInfo.year == orderedYears[i]);
      let rateCards: Array<Card> = [];
      let entryMethods: any;
      let slotReservationOptions: any;
      let studentsProfile: {
        racialDistribution: BarChartData,
        income: BarChartData,
        age: BarChartData,
        gender: BarChartData
      } = {
        racialDistribution: new BarChartData(),
        income: new BarChartData(),
        age: new BarChartData(),
        gender: new BarChartData()
      };
      if(yearInfo){
        rateCards = this.mountRateCards(yearInfo.rateCards);
        entryMethods = this.mountEntryMethods(yearInfo.entryMethods);
        slotReservationOptions = this.mountSlotReservationOptions(yearInfo.slotReservationOptions);
        studentsProfile.racialDistribution = this.mountRacialDistribution(yearInfo.studentsProfile);
        studentsProfile.income = this.mountIncomeDistribution(yearInfo.studentsProfile);
        studentsProfile.age = this.mountAgeGroupDistribution(yearInfo.studentsProfile);
        studentsProfile.gender = this.mountGenderDistribution(yearInfo.studentsProfile);
      }
      processedInfo.push({
        year: orderedYears[i],
        rateCards,
        entryMethods,
        slotReservationOptions,
        studentsProfile,
      });
    }

    return processedInfo;
  }

  mountRateCards(rateCardsData: RateCards): Array<Card>{
    let cards: Array<Card> = [];

    //Cards de alunos matriculados
    let enrolledStudents = null;
    if(rateCardsData.enrolledStudents != null)
      enrolledStudents = rateCardsData.enrolledStudents;
    cards.push({
      title: "Alunos matriculados",
      value: enrolledStudents,
      type: 'default'
    });

    //Cards de alunos ingressantes (analisar a observação depois entre os dados do IFFar e da PNP)
    let apiIncomingStudents = rateCardsData.apiIncomingStudents;
    let pnpIncomingStudents = null;
    if(rateCardsData.pnpIncomingStudents != null)
      pnpIncomingStudents = rateCardsData.pnpIncomingStudents;
    cards.push({
      title: "Alunos ingressantes",
      value: pnpIncomingStudents,
      type: 'default'
    });

    //Cards de alunos concluintes
    let concludingStudents = null;
    let concludingStudentsType = 'default';
    let concludingStudentsAdd = undefined;
    if(rateCardsData.concludingStudents.concluded != null || rateCardsData.concludingStudents.integralized != null){
      concludingStudents = rateCardsData.concludingStudents.concluded + rateCardsData.concludingStudents.integralized;
      concludingStudentsType = 'default-fixed-expanded';
      concludingStudentsAdd = [
        {title: "Diplomados", value: rateCardsData.concludingStudents.concluded},
        {title: "Integralizados", value: rateCardsData.concludingStudents.integralized}
      ];
    }
    cards.push({
      title: "Alunos concluintes",
      value: concludingStudents,
      type: concludingStudentsType,
      additionalInfo: concludingStudentsAdd
    });

    //Cards de alunos evadidos
    //Faço previamente o vetor de motivos e filtro os motivos que não apresentarem evasão
    let dropoutAdditional = undefined;
    let dropoutTotal = null;
    let dropoutType = 'default';
    if(rateCardsData.dropoutStudents != null){
      dropoutAdditional = [
        {title: "Matrículas descontinuadas", value: rateCardsData.dropoutStudents.discontinued},
        {title: "Matrículas canceladas", value: rateCardsData.dropoutStudents.cancelled},
        {title: "Matrículas abandonadas", value: rateCardsData.dropoutStudents.abandoned},
        {title: "matrículas reprovadas", value: rateCardsData.dropoutStudents.reproved},
        {title: "Transferência externa", value: rateCardsData.dropoutStudents.externalTransfer},
        {title: "Transferência interna", value: rateCardsData.dropoutStudents.internalTransfer},
      ].filter(item => item.value > 0);
      dropoutTotal = dropoutAdditional.reduce((total, item) => total + item.value, 0);
      dropoutType = 'default-expanded';
    }    
    cards.push({
      title: "Alunos evadidos",
      value: dropoutTotal,
      type: dropoutType,
      additionalInfo: dropoutAdditional
    });

    return cards
  }

  mountEntryMethods(entryMethodsData: Array<EntryMethod>): BarChartData{
    let entryMethods = new BarChartData();

    //Como trata-se apenas de métodos de entrada, adiciono previamente o único dataset que será utilizado, para depois adicionar os dados via push()
    entryMethods.datasets.push({
      label: 'Alunos',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132)',
      ]
    })
    //Percorro todos os métodos de entrada para montar os dados necessários para montar um gráfico
    for(let i = 0; i < entryMethodsData.length; i++){
      entryMethods.labels.push(entryMethodsData[i].entryMethodDescription);
      entryMethods.datasets[0].data.push(entryMethodsData[i].total);
    }

    return entryMethods;
  }

  mountSlotReservationOptions(slotReservationOptionsData: SlotReservationOptions): BarChartData{
    let slotReservationOptions = new BarChartData();

    if(slotReservationOptionsData == null || slotReservationOptionsData == undefined){
      slotReservationOptions.labels = ['AC', 'L1', 'L2', 'L5', 'L6', 'L9', 'L10', 'L13', 'L14'];

      return slotReservationOptions;
    }
    
    //Tanto vagas regulares quanto extraordinárias apresentam as mesmas propriedades (mesmo conjunto de vagas), por isso só formo o array com as chaves das vagas regulares
    slotReservationOptions.labels = Object.keys(slotReservationOptionsData.regular).map(slot => slot.toUpperCase());
    
    //No caso das reservas de vagas, apresentam-se dois datasets distintos: vagas regulares e vagas extraordinárias
    slotReservationOptions.datasets.push({
      label: 'Vagas regulares',
      data: Object.values(slotReservationOptionsData.regular),
      backgroundColor: ['rgba(255, 99, 132)']
    });
    slotReservationOptions.datasets.push({
      label: 'Vagas extraordinárias',
      data: Object.values(slotReservationOptionsData.extraordinary),
      backgroundColor: ['rgba(50, 99, 53)']
    });

    return slotReservationOptions;
  }

  //Monto os dados no formato necessário para mostrar informações apenas da distribuição de estudantes por renda familiar
  mountIncomeDistribution(studentsProfile: StudentsProfile): BarChartData{
    let incomeChart = new BarChartData();
    if(studentsProfile == null || studentsProfile == undefined){
      incomeChart.labels = [
        "0<RFP<=0,5",
        "0,5<RFP<=1",
        "1<RFP<=1,5",
        "1,5<RFP<=2,5",
        "2,5<RFP<=3,5",
        "RFP>3,5",
        "Não declarada"
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
      backgroundColor: ['rgba(255, 99, 132)',]
    })
    //Agora adiciono os dados, realizando a soma dos objetos que possuem a mesma renda
    for(let i = 0; i < incomeChart.labels.length; i++){
      let totalStudents = income.reduce((total, current) => current.description == incomeChart.labels[i] ? total + current.total : total, 0);
      incomeChart.datasets[0].data.push(totalStudents);
    }

    return incomeChart;
  }

  mountRacialDistribution(studentsProfile: StudentsProfile): BarChartData{
    let racialDistributionChart = new BarChartData();

    if(studentsProfile == null || studentsProfile == undefined){
      racialDistributionChart.labels = [
        "---",
    ];
      return racialDistributionChart;
    }

    let racialDistribution = studentsProfile.racialDistribution;
    console.log(racialDistribution);

    //Crio os labels
    racialDistributionChart.labels = [...new Set(racialDistribution.map(racialDistEl => racialDistEl.description))].sort();
    
    //Faço o label de informação não declarada ficar por último. Fonte: https://stackoverflow.com/questions/24909371/move-item-in-array-to-last-position
    racialDistributionChart.labels.push(racialDistributionChart.labels.splice(racialDistributionChart.labels.indexOf('NÃO DECLARADA'), 1)[0]);
    console.log(racialDistributionChart.labels);

    racialDistributionChart.datasets.push({
      label: 'Alunos',
      data: [],
      backgroundColor: ['rgba(255, 99, 132)',]
    })
    //Percorro o array de labels para realizar a respectiva adição dos valores
    for(let i = 0; i < racialDistributionChart.labels.length; i++){
      let data = racialDistribution.find(racialDistEl => racialDistEl.description == racialDistributionChart.labels[i]);

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
  mountGenderDistribution(studentsProfile: StudentsProfile): BarChartData{
    let genderChart = new BarChartData();
    if(studentsProfile == null || studentsProfile == undefined){
      genderChart.labels = [
        "0<RFP<=0,5",
        "0,5<RFP<=1",
        "1<RFP<=1,5",
        "1,5<RFP<=2,5",
        "2,5<RFP<=3,5",
        "RFP>3,5",
        "Não declarada"
    ];
      return genderChart;
    }

    let ageGroupDistribution = studentsProfile.ageGroupsDistribution;
    console.log(ageGroupDistribution);

    //Uso o map() para pegar apenas os dados de renda (para o gráfico de distribuição por cor ou raça será necessário um método um pouco diferente)
    let genderNotFlat = ageGroupDistribution.map(ageGroupEl => ageGroupEl.genderDistribution);
    //Tendo apenas os dados de renda, agora é necessário usar o flat() para tornar um único array
    let gender = genderNotFlat.flat();
    //Com todos os dados de renda em um array só, crio os labels de renda
    genderChart.labels = [...new Set(gender.map(gender => gender.description))].sort();
    
    //Mas ainda preciso corrigir a ordenação dos labels (se no futuro forem adicionadas diferentes rendas, a lógica pode quebrar (mais para o futuro posso pensar em algo melhor))
    // genderChart.labels = this.swapItems(genderChart.labels, 0,1)
    console.log(genderChart.labels);
    
    genderChart.datasets.push({
      label: 'Alunos',
      data: [],
      backgroundColor: ['rgba(255, 99, 132)',]
    })
    //Agora adiciono os dados, realizando a soma dos objetos que possuem a mesma renda
    for(let i = 0; i < genderChart.labels.length; i++){
      let totalStudents = gender.reduce((total, current) => current.description == genderChart.labels[i] ? total + current.total : total, 0);
      genderChart.datasets[0].data.push(totalStudents);
    }

    return genderChart;
  }

  //Função praticamente igual à mountRacialDistribution()
  mountAgeGroupDistribution(studentsProfile: StudentsProfile): BarChartData{
    let ageGroupDistributionChart = new BarChartData();

    if(studentsProfile == null || studentsProfile == undefined){
      ageGroupDistributionChart.labels = [
        "---",
    ];
      return ageGroupDistributionChart;
    }

    let ageGroupDistribution = studentsProfile.ageGroupsDistribution;
    console.log(ageGroupDistribution);

    //Crio os labels
    ageGroupDistributionChart.labels = [...new Set(ageGroupDistribution.map(ageGroupEl => ageGroupEl.age))].sort();
    console.log(ageGroupDistributionChart.labels);

    ageGroupDistributionChart.datasets.push({
      label: 'Alunos',
      data: [],
      backgroundColor: ['rgba(255, 99, 132)',]
    })
    //Percorro o array de labels para realizar a respectiva adição dos valores
    for(let i = 0; i < ageGroupDistributionChart.labels.length; i++){
      let data = ageGroupDistribution.find(ageGroupEl => ageGroupEl.age == ageGroupDistributionChart.labels[i]);

      if(data){
        //Transformo os objetos sobre renda familiar apenas no número de estudantes que existem em cada tipo
        let students = data.genderDistribution.map(genderEl => genderEl.total);
        //Agora uso reduce() para somar todos esses valores, assim, retornando o total de estudantes de determinada cor ou raça
        let totalStudents = students.reduce((total, current) => total + current);
        ageGroupDistributionChart.datasets[0].data.push(totalStudents)
      }
    }

    return ageGroupDistributionChart;
  }

  //Função para trocar elementos de array de posição: https://stackoverflow.com/questions/4011629/swapping-two-items-in-a-javascript-array
  private swapItems(array: Array<any>, a: number, b: number){
    array[a] = array.splice(b, 1, array[a])[0]; //array[a] recebe o valor que foi removido (o retorno de um splice) enquanto remove 1 elemento na posição b, adicionando o a no lugar, assim, trocando de posição
    return array;
  }

}
