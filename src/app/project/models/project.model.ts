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

    clone(): Project {
        return new Project (
            this.id,
            this.name,
            this.priority,
            this.user.clone(),
            this.numberOfTasks,
            this.startDate,
            this.endDate,
            this.isComplete);
    }
}