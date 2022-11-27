import { Component, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import { ProjectsInfo } from 'src/app/shared/model/api/projectsInfo.model';
import { BarChartData } from 'src/app/shared/model/barChartData.model';
import { Card } from 'src/app/shared/model/card.model';
import ProcessedProjectsInfo from 'src/app/shared/model/processedInfo/processedProjectsInfo.model';

@Component({
  selector: 'app-projects-info',
  templateUrl: './projects-info.component.html',
  styleUrls: ['./projects-info.component.scss']
})
export class ProjectsInfoComponent implements OnChanges {
  @Input() years: Array<string> = [];
  
  @Input() projectsInfo: Array<ProjectsInfo> = [];
  
  @Output() changeProjectsYear: EventEmitter<string> = new EventEmitter();

  public colors = ['#0E3B43', '#205E3B', '#297F3E', '#CD191E', '#911216'];

  public projects: ProcessedProjectsInfo = new ProcessedProjectsInfo;


  constructor() { }

  ngOnChanges(): void {
    this.projects.cards = this.mountMainCards(this.projectsInfo);
    this.projects.projectsByType = this.mountProjectsByType(this.projectsInfo);
    console.log(this.projects.projectsByType)
    this.projects.projectsByKnowledgeArea = this.mountProjectsByKnowledgeArea(this.projectsInfo);
    console.log(this.projects.projectsByKnowledgeArea)
  }

  //Função auxiliar para criar os cards gerais
  private mountMainCards(projectsInfo: Array<ProjectsInfo>): Array<Card> {
    //Faço o array de projetos tornar-se plano (flat) para os dados do número de projetos, já que aqui estou ignorando as características das áreas do conhecimento (simplifica o processo de cálculo de número de projetos e membros)
    let projectsToFlat = projectsInfo.map(project => project.projects); //Ainda é necessário passar os projetos pelo método flat(), pois até aqui estão arrays dentro de arrays
    console.log(projectsToFlat);
    let projectsFlat = projectsToFlat.flat(1);

    //Filtro os dados para cada tipo de projeto depois
    let learningProjects = projectsFlat.filter(project => project.type == 'ENSINO');
    console.log(learningProjects);
    let researchProjects = projectsFlat.filter(project => project.type == 'PESQUISA');
    console.log(researchProjects);
    let extensionProjects = projectsFlat.filter(project => project.type == 'EXTENSÃO');
    console.log(extensionProjects);

    //Crio o conjunto de cards

    //Primeiro, o card de projetos desenvolvidos (visão geral)
    let developedProjectsCard: Card = new Card;
    //Monto o card de projetos desenvolvidos
    developedProjectsCard.description = 'Projetos desenvolvidos';
    if (projectsInfo.length == 0)
      developedProjectsCard.value = 0
    else {
      //Calculo o total de projetos
      let projectNumbers = projectsFlat.reduce((total, current) => total += current.total, 0)

      //Calculo o total de membros de projetos
      let projectMembers = projectsFlat.reduce((total, current) => 
        total += current.members.reduce((cTotal, cCurrent) => cTotal += cCurrent),
      0)

      developedProjectsCard.value = projectNumbers
    }

    //Agora faço o card para os projetos de ensino
    let learningProjectsCard: Card = new Card;
    //Monto o card de projetos de ensino
    learningProjectsCard.description = 'Projetos de ensino';
    if (learningProjects.length == 0)
      learningProjectsCard.value = 0
    else {
      let projectNumbers = learningProjects.reduce((total, current) => total += current.total, 0);

      let projectMembers = learningProjects.reduce((total, current) => 
        total += current.members.reduce((cTotal, cCurrent) => cTotal += cCurrent),
      0)

      learningProjectsCard.value = projectNumbers
    }

    //Agora faço o card para os projetos de pesquisa
    let researchProjectsCard: Card = new Card;
    //Monto o card de projetos de ensino
    researchProjectsCard.description = 'Projetos de pesquisa';
    if (researchProjects.length == 0)
      researchProjectsCard.value = 0
    else {
      let projectNumbers = researchProjects.reduce((total, current) => total += current.total, 0);

      let projectMembers = researchProjects.reduce((total, current) => 
        total += current.members.reduce((cTotal, cCurrent) => cTotal += cCurrent),
      0)

      researchProjectsCard.value = projectNumbers
    }

    //Agora faço o card para os projetos de extensão
    let extensionProjectsCard: Card = new Card;
    //Monto o card de projetos de ensino
    extensionProjectsCard.description = 'Projetos de extensão';
    if (extensionProjects.length == 0)
      extensionProjectsCard.value = 0
    else {
      let projectNumbers = extensionProjects.reduce((total, current) => total += current.total, 0);

      let projectMembers = extensionProjects.reduce((total, current) => 
        total += current.members.reduce((cTotal, cCurrent) => cTotal += cCurrent),
      0)

      extensionProjectsCard.value = projectNumbers
    }

    //Retorna todos os cards
    return [developedProjectsCard, learningProjectsCard, researchProjectsCard, extensionProjectsCard];
  }

  private mountProjectsByType(projectsInfo: Array<ProjectsInfo>): BarChartData{
    let projectsByTypeChart = new BarChartData

    //Faço o array de projetos tornar-se plano (flat) para os dados do número de projetos, já que aqui estou ignorando as características das áreas do conhecimento (simplifica o processo de cálculo de número de projetos e membros)
    let projectsToFlat = projectsInfo.map(project => project.projects); //Ainda é necessário passar os projetos pelo método flat(), pois até aqui estão arrays dentro de arrays
    console.log(projectsToFlat);
    let projectsFlat = projectsToFlat.flat(1);

    //Crio a lista de labels (tipos de projetos)
    projectsByTypeChart.labels = [...new Set(projectsFlat.map(project => project.type))];

    //Agora crio o dataset
    projectsByTypeChart.datasets[0] = {
      label: 'Projetos',
      data: [],
      backgroundColor: this.colors[1]
    }

    //E depois preencho com os valores
    for (let label of projectsByTypeChart.labels) {
      let projects = projectsFlat.filter(project => project.type == label);

      let projectNumbers = projects.reduce((total, current) => total += current.total, 0);

      projectsByTypeChart.datasets[0].data.push(projectNumbers)
    }

    return projectsByTypeChart;
  }

  private mountProjectsByKnowledgeArea(projectsInfo: Array<ProjectsInfo>): BarChartData{
    let projectsByTypeChart = new BarChartData

    //Faço o array de áreas do conhecimento já possuir o agregado de projetos por área
    let knowledgeAreas = projectsInfo.map(project => {
      return {...project, 
        projects: project.projects.reduce((total, current) => total += current.total, 0)
      }
    });
    console.log(knowledgeAreas);

    //Crio a lista de labels (lista de áreas do conhecimento)
    projectsByTypeChart.labels = [...new Set(knowledgeAreas.map(kA => kA.description))];

    //Agora crio o dataset
    projectsByTypeChart.datasets[0] = {
      label: 'Projetos',
      data: [],
      backgroundColor: this.colors[1]
    }

    //E depois preencho com os valores
    for (let label of projectsByTypeChart.labels) {
      let projects = knowledgeAreas.filter(kA => kA.description == label);

      let projectNumbers = projects.reduce((total, current) => total += current.projects, 0);

      projectsByTypeChart.datasets[0].data.push(projectNumbers)
    }

    return projectsByTypeChart;
  }

  public mountProjectsProgression(projectsInfo: Array<BarChartData>){
    
  }

  public onChangeYear(year: string){
    //Emito o alerta pra atualizar os dados
    this.changeProjectsYear.emit(year);
  }

}
