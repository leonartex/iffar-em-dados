import { BarChartData } from "../barChartData.model";
import { Card } from "../card.model";

export default class ProcessedCoursesInfo{
    type: string = '' //geral; técnico; graduação; pós
    cards: Array<Card> = [];
    turns: BarChartData | null = null;
    knowledgeAreas: BarChartData | null = null
    courses?: Array<Card>; //A lista de cursos que serão apresentadas
}