export class BarChartData{
    labels: Array<string> = [];
    datasets: Array<{
        label: string,
        data: Array<any>,
        backgroundColor?: Array<string>
    }> = [];
}