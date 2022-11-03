export default class CoursesInfo {
    apiName: string = '';
    apiNameFiltered: string = '';
    level: string = '';
    degree: string = '';
    modality: string = '';
    knowledgeArea: string = '';
    cityName: string = '';
    apiId: number = -1;
    pnpName: string | null = null;
    enrolledStudents: number | null = null;
    incomingStudents: number = 0;
    turn: string | null = null;
    courseSlots: number | null = null;
}