import { of } from "rxjs";

import {
    Task as TaskApi,
    ParentTask as ParentTaskApi,
    TaskService as TaskApiService,
    ParentTaskService as ParentTaskApiService,
    ITask,
} from "projects/task-manager-api/proxy/taskManager-api.service";

import { Task } from "../models/task.model";
import { TaskService } from "./task.service";

describe("Task service", () => {
    let target: TaskService;

    let taskApiService: TaskApiService;
    let parentTaskApiService: ParentTaskApiService;
    let taskApi: TaskApi;
    let parentTaskApi: TaskApi;

    beforeEach(() => {
        taskApi = new TaskApi({
            id: 1,
            name: "Task 1",
            priority: 1,
            startDate: new Date("2018-01-01"),
            endDate: new Date("2019-01-01"),
            isComplete: true
        } as ITask);

        parentTaskApi = new ParentTaskApi({
            id: 1,
            name: "parent task 1"
        });

        taskApiService = jasmine.createSpyObj(TaskApiService.name, ["get", "query", "post", "put", "end"]);
        (taskApiService.get as jasmine.Spy).and.returnValue(of(taskApi));
        (taskApiService.query as jasmine.Spy).and.returnValue(of([taskApi]));
        (taskApiService.post as jasmine.Spy).and.returnValue(of({}));
        (taskApiService.post as jasmine.Spy).and.returnValue(of({}));
        (taskApiService.post as jasmine.Spy).and.returnValue(of({}));

        parentTaskApiService = jasmine.createSpyObj(ParentTaskApiService.name, ["query"]);
        (parentTaskApiService.query as jasmine.Spy).and.returnValue(of([parentTaskApi]));

        target = new TaskService(taskApiService, parentTaskApiService);
    });

    it("should create the service", () => {
        expect(target).toBeDefined();
    });

    describe("Task api service", () => {
        describe("getTasks", () => {
            it("should call query of task service", () => {
                target.getTasks();

                expect(taskApiService.query).toHaveBeenCalled();
            });

            it("should return expected tasks", () => {
                target.getTasks().subscribe(response => {
                    expect(response.length).toBe(1);
                    expect(response[0].id).toBe(taskApi.id);
                });
            });
        });

        describe("get", () => {
            it("should call query of task service", () => {
                target.get(taskApi.id);

                expect(taskApiService.get).toHaveBeenCalled();
            });

            it("should return expected tasks", () => {
                target.get(taskApi.id).subscribe(response => {
                    expect(response.id).toBe(taskApi.id);
                });
            });
        });

        describe("post", () => {
            it("should call post of task service", () => {
                target.post(Task.Default, []);

                expect(taskApiService.post).toHaveBeenCalled();
            });
        });

        describe("updateTask", () => {
            it("should call put of task service", () => {
                target.updateTask(Task.Default, []);

                expect(taskApiService.put).toHaveBeenCalled();
            });
        });

        describe("endTask", () => {
            it("should call end of task service", () => {
                target.endTask(taskApi.id);

                expect(taskApiService.end).toHaveBeenCalled();
            });
        });
    });

    describe("Parent task api service", () => {
        describe("getParentTasks", () => {
            it("should call query of parent task service", () => {
                target.getParentTasks();

                expect(parentTaskApiService.query).toHaveBeenCalled();
            });

            it("should return expected tasks", () => {
                target.getParentTasks().subscribe(response => {
                    expect(response.length).toBe(1);
                    expect(response[0].id).toBe(parentTaskApi.id);
                });
            });
        });
    });
});
