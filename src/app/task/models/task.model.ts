export class Task {
    constructor(
        public id: string,
        public name: string,
        public parentTaskName: string,
        public priority: number,
        public startDate: Date,
        public endDate?: Date,
        public isComplete?: boolean) {
    }
}