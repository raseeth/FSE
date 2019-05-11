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
                    this.startDate,
                    this.endDate);
    }
}
