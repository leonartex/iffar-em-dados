import { CourseDetailing } from "../courseDetailing.model";
import CoursesInfo from "../coursesInfo.model";
import { EntryAndProgressInfo } from "../entryAndProgressInfo.model";
import { EntryMethod } from "../entryMethod.model";
import { ProjectsInfo } from "../projectsInfo.model";
import { RateCards } from "../rateCards.model";
import { SlotReservationOptions } from "../slotReservationOptions.model";
import StudentsProfile from "../studentsProfile.model";
export class CoursePageResponse{    
    // units: Array<any> = [];
    courseDetailing: CourseDetailing = new CourseDetailing;  
    infoPerYear: Array<{
        year: string,     
        entryAndProgressInfo: EntryAndProgressInfo,
        studentsProfile: StudentsProfile
    }> = [];
    courseComponents: Array<string> = [];
}