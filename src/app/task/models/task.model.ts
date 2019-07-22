import { Project } from "src/app/project/models/project.model";
import { User } from "src/app/user/models/user.model";

export class Task {
    constructor(
        public id: number,
        public name: string,
        public projectId: number,
        public projectName: string,
        public isParent: boolean,
        public parentTaskId: number,
        public parentTaskName: string,
        public priority: number = 0,
        public userId: number,
        public userName: string,
        public startDate?: Date,
        public endDate?: Date,
        public isComplete?: boolean) {
    }

    static get Default(): Task {
      return new Task(undefined, undefined, undefined, undefined, undefined,
        undefined, undefined, undefined, undefined, undefined);
    }
}
