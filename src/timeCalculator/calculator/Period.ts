import { getNumberOfDaysBetweenDates } from "../util/utils";

export class Period {
  name: string;
  id: string;
  startDate: Date | null;
  endDate: Date | null;

  constructor({
    name,
    id,
    startDate,
    endDate,
  }: {
    name: string;
    id: string;
    startDate: Date | null;
    endDate: Date | null;
  }) {
    this.name = name;
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
  }
  get days() {
    return getNumberOfDaysBetweenDates(this.startDate, this.endDate);
  }
}
