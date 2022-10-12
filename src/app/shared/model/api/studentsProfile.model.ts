export default class StudentsProfile{
    ageGroupsDistribution: Array<{
        age: string, //O valor da idade (ex.: 19 == 19 anos)
        genderDistribution: Array<{
            description: string, //O nome que será utilizado para apresentação.
            total: number //O total de estudantes
        }>
    }> = [];
    racialDistribution: Array<{
        description: string, //A descrição da cor ou raça
        income: Array<{
            description: string, //A descrição da faixa de renda familiar per capita
            total: number
        }>
    }> = []
}