import { of } from "rxjs";

import {
    TaskDetail,
    ParentTask as ParentTaskApi,
    TaskService as TaskApiService,
    ITaskDetail,
    ProjectDetail,
    IProjectDetail,
    UserDetail,
    IUserDetail,
    IParentTask,
    ParentTask,
} from "projects/project-manager-api/proxy/project-manager-api.service";

import { Task } from "../models/task.model";
import { TaskService } from "./task.service";

describe("Task service", () => {
    let target: TaskService;

    let taskApiService: TaskApiService;
    let taskApi: TaskDetail;

    beforeEach(() => {
        taskApi = new TaskDetail({
            id: 1,
            name: "Task 1",
            priority: 1,
            parentTask: new ParentTask({
                id: 1,
                name: "Project 1"
            } as IParentTask),
            project: new ProjectDetail({
                id: 1,
                name: "Project 1"
            } as IProjectDetail),
            user: new UserDetail({
                id: 1,
                name: "User 1"
            } as IUserDetail),
            startDate: new Date("2018-01-01"),
            endDate: new Date("2019-01-01"),
            isComplete: true
        } as ITaskDetail);

        taskApiService = jasmine.createSpyObj(TaskApiService.name, ["get", "query", "post", "put", "end"]);
        (taskApiService.get as jasmine.Spy).and.returnValue(of(taskApi));
        (taskApiService.query as jasmine.Spy).and.returnValue(of([taskApi]));
        (taskApiService.post as jasmine.Spy).and.returnValue(of({}));
        (taskApiService.put as jasmine.Spy).and.returnValue(of({}));
        (taskApiService.end as jasmine.Spy).and.returnValue(of({}));

        target = new TaskService(taskApiService);
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
                target.post(Task.Default);

                expect(taskApiService.post).toHaveBeenCalled();
            });
        });

        describe("updateTask", () => {
            it("should call put of task service", () => {
                target.updateTask(Task.Default);

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

    describe("getParentTasks", () => {
        it("should call query of parent task service", () => {
            target.getParentTasks();

            expect(taskApiService.query).toHaveBeenCalled();
        });

        it("should return expected tasks", () => {
            target.getParentTasks().subscribe(response => {
                expect(response.length).toBe(1);
                expect(response[0].id).toBe(taskApi.id);
            });
        });
    });
});
