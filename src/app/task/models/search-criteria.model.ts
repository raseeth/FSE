export class SearchCriteria {
    constructor (
        public taskName: string = "",
        public parentTaskName: string = "",
        public priorityFrom?: number,
        public priorityTo?: number,
        public startDate?: Date,
        public endDate?: Date) {
    }

    clone(): SearchCriteria {
        return new SearchCriteria(
                    this.taskName,
                    this.parentTaskName,
                    this.priorityFrom,
                    this.priorityTo,
                    this.isDate(this.startDate) ? new Date(this.startDate) : undefined,
                    this.isDate(this.endDate) ? new Date(this.endDate) : undefined);
    }

    private isDate(date: Date): boolean {
        return date && (date.toString() !== "" || date.toString() !== "Invalid Date");
    }
}
