import { of } from "rxjs";

import {
    Task as TaskApi,
    ParentTask as ParentTaskApi,
    TaskService as TaskApiService,
    ParentTaskService as ParentTaskApiService,
} from "projects/task-manager-api/proxy/taskManager-api.service";

import { Task } from "../models/task.model";
import { TaskService } from "./task.service";

describe("Task service", () => {
    let task: Task;
    let target: TaskService;

    let taskApiService: TaskApiService;
    let parentTaskApiService: ParentTaskApiService;

    beforeEach(() => {
        task = new Task(1, "task name", "parent task", 1, new Date("2019-02-02"), new Date("2019-03-03"), true);

        taskApiService = jasmine.createSpyObj(TaskApiService.name, ["get", "query", "post", "put", "end"]);
        (taskApiService.get as jasmine.Spy).and.returnValue(of({}));

        parentTaskApiService = jasmine.createSpyObj(ParentTaskApiService.name, ["query"]);
        (parentTaskApiService.query as jasmine.Spy).and.returnValue(of({}));

        target = new TaskService(taskApiService, parentTaskApiService);
    });

    it("should create the service", () => {
        expect(target).toBeDefined();
    });
});
