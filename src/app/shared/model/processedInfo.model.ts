import { BarChartData } from "./barChartData.model";
import { Card } from "./card.model";

export class ProcessedInfo{
    year: string = '';
    rateCards: Array<Card> = [];
    entryMethods: BarChartData = new BarChartData();
    slotReservationOptions: BarChartData = new BarChartData();
    studentsProfile: {
        racialDistribution: BarChartData,
        income: BarChartData,
        age: BarChartData,
        gender: BarChartData
    } = {
        racialDistribution: new BarChartData(),
        income: new BarChartData(),
        age: new BarChartData(),
        gender: new BarChartData()
    }
}