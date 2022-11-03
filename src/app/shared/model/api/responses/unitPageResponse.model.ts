import CoursesInfo from "../coursesInfo.model";
export class UnitPageResponse{
    infoPerYear: Array<{
        year: string,
        coursesInfo: Array<CoursesInfo>
    }> = []
}