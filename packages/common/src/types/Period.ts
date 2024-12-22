import { getNumberOfDaysBetweenDates } from "../utils";

export class Period {
  id: string;
  startDate: Date | null ;
  endDate:Date | null ;

  constructor({
    id,
    startDate,
    endDate,
  }: {
    id: string;
    startDate: Date | null ;
    endDate: Date | null ;
  }) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
  }
  get days() {
    return getNumberOfDaysBetweenDates(this.startDate, this.endDate);
  }
}
