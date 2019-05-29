import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { of } from "rxjs";

import { TaskService } from "../services/task.service";
import { EditTaskComponent } from "./edit-task.component";
import { Task } from "../models/task.model";
import { NotificationService } from "src/app/core/notification/notification.service";

describe("Edir task component", () => {
    let component: EditTaskComponent;
    let taskService: TaskService;
    let notificationService: NotificationService;
    let task: Task;
    let mockRouter: any;
    let dummyActivatedRoute: any;

    beforeEach(() => {

        task = new Task(1, "Task 1", undefined, 1, new Date("2018-01-01"));

        dummyActivatedRoute = {
            parent: {
                path: "task"
            },
            params: of({
                id: task.id
            })
        };

        notificationService = jasmine.createSpyObj(NotificationService.name, ["success", "error"]);
        mockRouter = jasmine.createSpyObj(Router.name, ["navigate"]);
        taskService = jasmine.createSpyObj(TaskService.name, ["get", "getParentTasks", "updateTask"]);
        (taskService.get as jasmine.Spy).and.returnValue(of(task));
        (taskService.getParentTasks as jasmine.Spy).and.returnValue(of(["parent task 1"]));
        (taskService.updateTask as jasmine.Spy).and.returnValue(of({}));

        component = new EditTaskComponent(
            mockRouter, dummyActivatedRoute, new FormBuilder(), notificationService, taskService);
    });

    describe("ngOnInit", () => {
        it("should call getParentTasks of task service", () => {
            component.ngOnInit();

            expect(taskService.getParentTasks).toHaveBeenCalled();
            expect(component.parentTasks).toBeDefined();
        });

        it("should call get of task service", () => {
            component.ngOnInit();

            expect(taskService.get).toHaveBeenCalledWith(task.id);
            expect(component.taskForm).toBeDefined();
            expect(component.editForm).toBeDefined();
        });
    });

    describe("update", () => {
        it("should call updateTask of task service", () => {
            component.ngOnInit();
            component.update([]);

            expect(taskService.updateTask).toHaveBeenCalled();
            expect(mockRouter.navigate).toHaveBeenCalledWith(["view"], Object({ relativeTo: Object({ path: "task" }) }));
        });

        it("should call not updateTask of task service", () => {
            component.ngOnInit();
            component.taskForm.patchValue({ name: "" });
            component.update([]);

            expect(taskService.updateTask).not.toHaveBeenCalled();
            expect(mockRouter.navigate).not.toHaveBeenCalled();
        });
    });

    describe("call", () => {
        it("should call navigate method of router", () => {
            component.cancel();

            expect(mockRouter.navigate).toHaveBeenCalledWith(["view"], Object({ relativeTo: Object({ path: "task" }) }));
        });
    });
});