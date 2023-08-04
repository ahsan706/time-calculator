export class PeriodInformation {
    name: string;
    id: string;
    startDate: Date | null;
    endDate: Date | null;

    constructor({ name, id, startDate, endDate }: {
        name: string,
        id: string,
        startDate: Date | null,
        endDate: Date |null
    }) {
        console.log("PeriodInformation constructor",name);
        this.name = name;
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    get days() {
        if (this.endDate && this.startDate) {
            return Math.ceil((this.endDate.getTime() - this.startDate.getTime()) / (1000 * 3600 * 24));
        } else {
            return 0;
        }
    }
}