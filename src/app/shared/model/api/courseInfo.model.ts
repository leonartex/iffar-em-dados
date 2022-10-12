import { CourseDetailing } from "./courseDetailing.model";
import { InfoPerYear } from "./infoPerYear.model";

export default class CourseInfo{
    courseComponents: Array<string> = [];
    courseDetailing: CourseDetailing = new CourseDetailing();
    infoPerYear: Array<InfoPerYear> = [];
}