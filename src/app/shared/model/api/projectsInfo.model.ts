export class ProjectsInfo{
    public apiId: number = 0;
    public description: string = '';
    public projects: Array<{
        apiId: number,
        type: string,
        members: Array<number>,
        total: number
    }> = [];
}