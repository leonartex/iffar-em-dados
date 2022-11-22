export class BarChartData{
    labels: Array<string | null> = [];
    datasets: Array<{
        label: string,
        data: Array<any>,
        backgroundColor?: Array<string> | string;
        barThickness?: number,
    }> = [];
}