export class RateCards{
    enrolledStudents: number = 0;

    apiIncomingStudents: number = 0;
    pnpIncomingStudents: number = 0;

    concludingStudents: {
        concluded: number,
        integralized: number
    } = {
        concluded: 0,
        integralized: 0
    };
    dropoutStudents: any
}