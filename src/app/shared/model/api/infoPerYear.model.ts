import { EntryMethod } from "./entryMethod.model";
import { RateCards } from "./rateCards.model";
import { SlotReservationOptions } from "./slotReservationOptions.model";
import StudentsProfile from "./studentsProfile.model";

export class InfoPerYear{
    year: string = '';
    rateCards: RateCards = new RateCards();
    entryMethods: Array<EntryMethod> = [];
    slotReservationOptions: SlotReservationOptions = new SlotReservationOptions();
    studentsProfile: StudentsProfile = new StudentsProfile;
}