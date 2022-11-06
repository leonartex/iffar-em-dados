import { EntryMethod } from "./entryMethod.model";
import { RateCards } from "./rateCards.model";
import { SlotReservationOptions } from "./slotReservationOptions.model";

export class EntryAndProgressInfo{
    rateCards: RateCards = new RateCards;
    entryMethods: Array<EntryMethod> = [];
    slotReservationOptions: SlotReservationOptions = new SlotReservationOptions;
}