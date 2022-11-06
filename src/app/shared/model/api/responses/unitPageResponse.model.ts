import CoursesInfo from "../coursesInfo.model";
import { EntryAndProgressInfo } from "../entryAndProgressInfo.model";
import { EntryMethod } from "../entryMethod.model";
import { ProjectsInfo } from "../projectsInfo.model";
import { RateCards } from "../rateCards.model";
import { SlotReservationOptions } from "../slotReservationOptions.model";
import StudentsProfile from "../studentsProfile.model";
export class UnitPageResponse{
    infoPerYear: Array<{
        year: string,
        coursesInfo: Array<CoursesInfo>,
        projectsInfo: Array<ProjectsInfo>,
        entryAndProgressInfo: EntryAndProgressInfo,
        studentsProfile: StudentsProfile
    }> = []
}