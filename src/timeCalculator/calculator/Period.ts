import { getNumberOfDaysBetweenDates } from "../util/utils";

export class Period {
  name: string;
  id: string;
  inDate: Date | null;
  outDate: Date | null;

  constructor({
    name,
    id,
    inDate,
    outDate,
  }: {
    name: string;
    id: string;
    inDate: Date | null;
    outDate: Date | null;
  }) {
    this.name = name;
    this.id = id;
    this.inDate = inDate;
    this.outDate = outDate;
  }
  get days() {
    return getNumberOfDaysBetweenDates(this.inDate, this.outDate);
  }
}
