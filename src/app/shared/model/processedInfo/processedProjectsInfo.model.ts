import { BarChartData } from "../barChartData.model";
import { Card } from "../card.model";

export default class ProcessedProjectsInfo{
    cards: Array<Card> = [];
    projectsByType: BarChartData | null = null;
    projectsByKnowledgeArea: BarChartData | null = null
}