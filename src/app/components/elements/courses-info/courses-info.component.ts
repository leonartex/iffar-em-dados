import { Component, OnInit, Input } from '@angular/core';
import CoursesInfo from 'src/app/shared/model/api/coursesInfo.model';
import { BarChartData } from 'src/app/shared/model/barChartData.model';
import { Card } from 'src/app/shared/model/card.model';
import ProcessedCoursesInfo from 'src/app/shared/model/processedInfo/processedCoursesInfo.model';

@Component({
  selector: 'app-courses-info',
  templateUrl: './courses-info.component.html',
  styleUrls: ['./courses-info.component.scss']
})
export class CoursesInfoComponent implements OnInit {
  @Input() coursesInfo: Array<CoursesInfo> = [];
  public card = new Card;

  //As variáveis para cada nível de cursos
  public general: ProcessedCoursesInfo = new ProcessedCoursesInfo;
  public technical: ProcessedCoursesInfo = new ProcessedCoursesInfo;
  public graduation: ProcessedCoursesInfo = new ProcessedCoursesInfo;
  public postGraduation: ProcessedCoursesInfo = new ProcessedCoursesInfo;

  constructor() { }

  ngOnInit(): void {
    this.mountCoursesInfo(this.coursesInfo);
  }

  //Função para montar toda a informação necessária para o componente, desde o geral até a informação de curso 
  public mountCoursesInfo(coursesInfo: Array<CoursesInfo>) {
    this.general = this.processCoursesInfo(coursesInfo);
    console.log(this.general)

    const technicalCourses = coursesInfo.filter(course => course.level == 'Técnico');
    this.technical = this.processCoursesInfo(technicalCourses, 'técnico');
    console.log(this.technical)

    const graduationCourses = coursesInfo.filter(course => course.level == 'Graduação');
    this.graduation = this.processCoursesInfo(graduationCourses, 'graduação');
    console.log(this.graduation)

    const postGraduationCourses = coursesInfo.filter(course => course.level == 'Pós-graduação');
    this.postGraduation = this.processCoursesInfo(postGraduationCourses, 'pós-graduação');
    console.log(this.postGraduation)
  }

  /** Aqui é onde a informação realmente é processada, sendo filtrada em suas específicas categorias antes de passar por este método
   * 
   * @param coursesInfo 
   * @param type geral; técnico; graduação; pós-graduação
   */
  public processCoursesInfo(coursesInfo: Array<CoursesInfo>, type: string = 'geral'): ProcessedCoursesInfo {
    let processedCoursesInfo: ProcessedCoursesInfo = new ProcessedCoursesInfo;
    processedCoursesInfo.type = type;

    //Processo os cards
    processedCoursesInfo.cards = this.mountMainCards(coursesInfo, type);

    processedCoursesInfo.turns = this.mountTurnGraph(coursesInfo);
    processedCoursesInfo.knowledgeAreas = this.mountKnowledgeAreaGraph(coursesInfo);
    console.log(processedCoursesInfo.knowledgeAreas)

    if (type != 'geral') {
      //Se não for um processamento de cursos do tipo geral, então crio os cards de cursos para o nível indicado
      let coursesCards = this.mountCoursesCards(coursesInfo);
      processedCoursesInfo.courses = coursesCards;
    }

    return processedCoursesInfo;
  }

  //Função auxiliar para criar os cards gerais
  private mountMainCards(coursesInfo: Array<CoursesInfo>, type: string = 'geral'): Array<Card> {
    //Crio uma lista de cursos que possuem nome da PNP definido. Isso significa que o curso possui os dados da PNP, sendo usado para definir se realizará as operações dependentes da PNP
    let pnpCourses = coursesInfo.filter(course => course.pnpName != null);

    //Crio o conjunto de cards
    let offeredCoursesCard: Card = new Card;
    //Monto o card de cursos ofertados
    offeredCoursesCard.description = 'Cursos ofertados';
    if (coursesInfo.length == 0)
      offeredCoursesCard.value = 0
    else {
      offeredCoursesCard.value = coursesInfo.reduce((total, current) => total += 1, 0)

      //Monto os addon para o card
      let addonList: Card["additionalInfo"] = [];

      //Verifico se é pro tipo geral ou nível de curso
      let coursesLevelOrDegree: Array<string>;
      if (type == 'geral')
        coursesLevelOrDegree = [...new Set(coursesInfo.map(course => course.level))];
      else
        coursesLevelOrDegree = [...new Set(coursesInfo.map(course => course.degree))];

      for (let levelOrDegree of coursesLevelOrDegree) {
        let total: number;
        if (type == 'geral') {
          total = coursesInfo.reduce((total, current) =>
            current.level == levelOrDegree ? total += 1 : total += 0, 0
          );
        } else {
          total = coursesInfo.reduce((total, current) =>
            current.degree == levelOrDegree ? total += 1 : total += 0, 0
          );
        }

        addonList.push({
          description: levelOrDegree,
          value: total,
          type: 'default'
        });
      }
      offeredCoursesCard.additionalInfo = addonList;
    }

    let offeredSlotsCard: Card;
    offeredSlotsCard = new Card;
    offeredSlotsCard.description = 'Vagas ofertadas';
    if (coursesInfo.length == 0)
      offeredSlotsCard.value = 0
    else {
      if (pnpCourses.length > 0) {
        offeredSlotsCard.value = pnpCourses.reduce((total, current) => {
          if (current.courseSlots != null)
            total += current.courseSlots
          return total
        }, 0)
      } else {
        offeredSlotsCard.value = null;
      }
    }

    let enrolledStudentsCard: Card;
    enrolledStudentsCard = new Card;
    enrolledStudentsCard.description = 'Alunos matriculados';
    if (coursesInfo.length == 0)
      enrolledStudentsCard.value = 0
    else {
      if (pnpCourses.length > 0) {
        enrolledStudentsCard.value = pnpCourses.reduce((total, current) => {
          if (current.enrolledStudents != null)
            total += current.enrolledStudents
          return total
        }, 0)
      } else {
        enrolledStudentsCard.value = null;
      }
    }


    //Alunos ingressantes é um card sempre definido, pois não depende apenas da PNP
    let incomingStudentsCard: Card;
    incomingStudentsCard = new Card;
    incomingStudentsCard.description = 'Alunos ingressantes';
    if (coursesInfo.length == 0)
      incomingStudentsCard.value = 0
    else
      incomingStudentsCard.value = coursesInfo.reduce((total, current) => total += current.incomingStudents, 0);

    if (type == 'geral') {
      // //Crio o addon específico dos cursos no geral (informa sobre o nível ao invés do grau)
      // let addon =  
    } else {
      // //Crio o addon específico dos cursos para cada nível de curso (informa sobre o grau)
      // let addon =
    }

    //Retorna todos os cards
    return [offeredCoursesCard, offeredSlotsCard, enrolledStudentsCard, incomingStudentsCard];
  }

  private mountTurnGraph(coursesInfo: Array<CoursesInfo>): BarChartData {
    let chartData = new BarChartData;
    //Crio a lista de labels
    chartData.labels = [...new Set(coursesInfo.map(course => course.turn))];

    chartData.datasets = [{
      label: 'Cursos',
      data: [],
      backgroundColor: ['#0E3B43', '#205E3B', '#297F3E', '#CD191E', '#911216']
    }]
    //E depois percorro ela para contar quantos cursos possui cada um
    for (let label of chartData.labels) {
      let courses = coursesInfo.filter(course => course.turn == label);
      chartData.datasets[0].data.push(courses.length)
    }

    return chartData;
  }

  private mountKnowledgeAreaGraph(coursesInfo: Array<CoursesInfo>): BarChartData {
    let chartData = new BarChartData;
    //Crio a lista de labels
    chartData.labels = [...new Set(coursesInfo.map(course => course.knowledgeArea))];

    chartData.datasets = [{
      label: 'Cursos',
      data: [],
      backgroundColor: ['#205E3B']
    }]
    //E depois percorro ela para contar quantos cursos possui cada um
    for (let label of chartData.labels) {
      let courses = coursesInfo.filter(course => course.knowledgeArea == label);
      chartData.datasets[0].data.push(courses.length)
    }

    return chartData;
  }

  //Função auxiliar para criar a lista de cards dos cursos ofertados
  private mountCoursesCards(coursesInfo: Array<CoursesInfo>): Array<Card> {
    let coursesCards: Array<Card> = [];

    for (let i = 0; i < coursesInfo.length; i++) {
      let course = coursesInfo[i];
      //Faço o card para o curso da unidade de ensino
      let courseCard = new Card;
      courseCard.type = 'only-title';

      //Crio o título com o nome do curso
      // if (course.pnpName != null)
      //   courseCard.description = course.pnpName;
      // else
        courseCard.description = course.apiNameFiltered;

      courseCard.filterProperty = course.degree;

      //Filtro os cursos que se encaixam como um mesmo curso numa lista com todos os cursos da instituição (todas as 5 características que identificam um curso iguais, exceto o nome da cidade) (será feito depois) (crio uma variável global com a lista de todos os cursos)
      // let sameCourses = coursesInfo.filter(courseI =>
      //   courseI.apiNameFiltered == course.apiNameFiltered &&
      //   courseI.degree == course.degree &&
      //   courseI.level == course.level &&
      //   courseI.modality == course.modality);

      //Monto o addon do card
      let addons: Array<any> = []
      addons.push({ description: 'Ofertado em', value: null, type: 'small-title' })
      while (coursesInfo.findIndex(courseI => {
        return courseI.apiNameFiltered == course.apiNameFiltered &&
          courseI.degree == course.degree &&
          courseI.level == course.level &&
          courseI.modality == course.modality
      }) >= 0) {
        let j = coursesInfo.findIndex(courseI => {
          return courseI.apiNameFiltered == course.apiNameFiltered &&
            courseI.degree == course.degree &&
            courseI.level == course.level &&
            courseI.modality == course.modality
        });
        let sameCourse = coursesInfo[j];
        let addon = {
          description: sameCourse.cityName,
          value: `/${this.urlFriendly(sameCourse.cityName)}/${this.urlFriendly(sameCourse.apiNameFiltered)}/${sameCourse.apiId}`,
          type: 'link'
        };
        coursesInfo.splice(j, 1);

        addons.push(addon)
      }
      courseCard.additionalInfo = addons;

      //Removo eles da lista
      // let apiUsedId = [...new Set(sameCourses)]
      // coursesInfo = coursesInfo.filter(courseI => sameCourses.find(sameC => sameC.apiId == courseI.apiId) == undefined);

      //Adiciono o card à lista
      coursesCards.push(courseCard);
    }

    coursesCards.sort((courseA, courseB) => {
      let cA = courseA.filterProperty!.toString().toUpperCase();
      let cB = courseB.filterProperty!.toString().toUpperCase();
      return (cA < cB) ? -1 : (cA > cB) ? 1 : 0;

    })

    //Retorno a lista de cursos
    return coursesCards;
  }

  public filterCoursesByDegree(courses: Array<Card>, type: string): Array<Card> {
    let coursesF = courses.filter(course => course.filterProperty! == type);

    return coursesF.sort((courseA, courseB) => {
      let cA = courseA.description!.toString().toUpperCase();
      let cB = courseB.description!.toString().toUpperCase();
      return (cA < cB) ? -1 : (cA > cB) ? 1 : 0;

    })
  }

  public getDegrees(courses: Array<Card>): Array<string> {
    return [...new Set(courses.map(course => course.filterProperty!))];
  }

  public normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }


  public urlFriendly(str: string): string {
    return this.normalizeString(str).replace(/ /g, '-').toLowerCase();
  }

}


// private mountCoursesCards(coursesInfo: Array<CoursesInfo>): Array<Card> {
//   let coursesCards: Array<Card> = [];

//   for (let course of coursesInfo) {
//     //Faço o card para o curso da unidade de ensino
//     let courseCard = new Card;
//     courseCard.type = 'only-title';

//     //Crio o título com o nome do curso
//     // if (course.pnpName != null)
//     //   courseCard.description = course.pnpName;
//     // else
//       courseCard.description = course.apiNameFiltered;

//     courseCard.filterProperty = course.degree;

//     //Filtro os cursos que se encaixam como um mesmo curso numa lista com todos os cursos da instituição (todas as 5 características que identificam um curso iguais, exceto o nome da cidade) (será feito depois) (crio uma variável global com a lista de todos os cursos)
//     let sameCourses = coursesInfo.filter(courseI =>
//       courseI.apiNameFiltered == course.apiNameFiltered &&
//       courseI.degree == course.degree &&
//       courseI.level == course.level &&
//       courseI.modality == course.modality);

//     //Monto o addon do card
//     let addons: Array<any> = []
//     addons.push({ description: 'Ofertado em', value: null, type: 'small-title' })
//     for (let sameCourse of sameCourses) {
//       let addon = {
//         description: sameCourse.cityName,
//         value: `/${this.urlFriendly(sameCourse.cityName)}/${this.urlFriendly(sameCourse.apiNameFiltered)}/${sameCourse.apiId}`,
//         type: 'link'
//       };


//       addons.push(addon)

//     }
//     courseCard.additionalInfo = addons;

//     //Removo eles da lista
//     // let apiUsedId = [...new Set(sameCourses)]
//     // coursesInfo = coursesInfo.filter(courseI => sameCourses.find(sameC => sameC.apiId == courseI.apiId) == undefined);

//     //Adiciono o card à lista
//     coursesCards.push(courseCard);
//   }

//   coursesCards.sort((courseA, courseB) => {
//     let cA = courseA.filterProperty!.toString().toUpperCase();
//     let cB = courseB.filterProperty!.toString().toUpperCase();
//     return (cA < cB) ? -1 : (cA > cB) ? 1 : 0;

//   })

//   //Retorno a lista de cursos
//   return coursesCards;
// }