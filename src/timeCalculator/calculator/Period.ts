import { getNumberOfDaysBetweenDates } from "../util/utils";

export class Period {
  id: string;
  inDate: Date | null;
  outDate: Date | null;

  constructor({
    id,
    inDate,
    outDate,
  }: {
    id: string;
    inDate: Date | null;
    outDate: Date | null;
  }) {
    this.id = id;
    this.inDate = inDate;
    this.outDate = outDate;
  }
  get days() {
    return getNumberOfDaysBetweenDates(this.inDate, this.outDate);
  }
}
