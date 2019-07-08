import { User } from "src/app/user/models/user.model";

export class Project {
    constructor(
        public id: number,
        public name: string,
        public priority: number,
        public user: User,
        public numberOfTasks?: number,
        public startDate?: Date,
        public endDate?: Date,
        public isComplete?: boolean) {
    }
}