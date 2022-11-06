export class RateCards{
    enrolledStudents: number | null = null;

    apiIncomingStudents: number = 0;
    pnpIncomingStudents: number | null = null;

    concludingStudents: {
        concluded: number | null,
        integralized: number | null
    } = {
        concluded: null,
        integralized: null
    };
    dropoutStudents: any
}