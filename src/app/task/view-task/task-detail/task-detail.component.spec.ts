import { Router } from "@angular/router";
import { of, throwError } from "rxjs";

import { TaskDetailComponent } from "./task-detail.component";
import { TaskService } from "../../services/task.service";
import { Task } from "../../models/task.model";
import { NotificationService } from "src/app/core/notification/notification.service";

describe("Task detail component", () => {
    let component: TaskDetailComponent;
    let taskService: TaskService;
    let notificationService: NotificationService;

    let task: Task;
    let mockRouter: any;
    let dummyActivatedRoute: any;

    beforeEach(() => {

        dummyActivatedRoute = {
            parent: {
                path: "task"
            }
        };

        task = new Task(1, "Task 1", 1, "Project 1", true, undefined, undefined, 1, 1, "User 1");

        notificationService = jasmine.createSpyObj(NotificationService.name, ["success", "error"]);
        mockRouter = jasmine.createSpyObj(Router.name, ["navigate"]);
        taskService = jasmine.createSpyObj(TaskService.name, ["endTask"]);
        (taskService.endTask as jasmine.Spy).and.returnValue(of({}));

        component = new TaskDetailComponent(mockRouter, dummyActivatedRoute, notificationService, taskService);
        component.task = task;
    });

    describe("hasParent", () => {
        it("should false if no task has no parent ", () => {
            expect(component.hasParent).toBeFalsy();
        });

        it("should false if no task has no parent ", () => {
            task.parentTaskName = "parent task";
            expect(component.hasParent).toBeTruthy();
        });
    });

    describe("edit", () => {
        it("should navigate to edit task", () => {
            component.edit();

            expect(mockRouter.navigate).toHaveBeenCalledWith(["update", task.id], Object({ relativeTo: Object({ path: "task" }) }));
        });
    });

    describe("endTask", () => {
        it("should call end task of task service", () => {
            component.endTask();

            expect(taskService.endTask).toHaveBeenCalledWith(task.id);
        });
    });

    describe("endTask", () => {
        it("should emit refresh when editTask of task service is success", () => {
            spyOn(component.refresh, "emit");
            component.endTask();

            expect(component.refresh.emit).toHaveBeenCalled();
        });

        it("should not emit refresh when editTask of task service fails", () => {
            spyOn(component.refresh, "emit");
            (taskService.endTask as jasmine.Spy).and.returnValue(throwError({status: 404}));

            component.endTask();

            expect(component.refresh.emit).not.toHaveBeenCalled();
        });
    });
});