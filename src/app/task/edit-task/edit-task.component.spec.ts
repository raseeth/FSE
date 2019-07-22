import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { of } from "rxjs";

import { TaskService } from "../services/task.service";
import { EditTaskComponent } from "./edit-task.component";
import { Task } from "../models/task.model";
import { NotificationService } from "src/app/core/notification/notification.service";
import { ProjectService } from "src/app/project/services/project.service";
import { UserService } from "src/app/user/services/user.service";
import { ReferenceData } from "src/app/modals/models/reference-data.model";

describe("Edir task component", () => {
    let component: EditTaskComponent;
    let taskService: TaskService;
    let projectService: ProjectService;
    let userService: UserService;
    let notificationService: NotificationService;
    let task: Task;
    let mockRouter: any;
    let dummyActivatedRoute: any;

    beforeEach(() => {

        task = new Task(1, "Task 1", 1, "project 1", true, undefined, undefined, 1, 1, "User 1");

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

        projectService = jasmine.createSpyObj(ProjectService.name, ["getProjects"]);
        (projectService.getProjects as jasmine.Spy).and.returnValue(of([new ReferenceData(1, "Project 1")]));

        userService = jasmine.createSpyObj(UserService.name, ["getUsers"]);
        (userService.getUsers as jasmine.Spy).and.returnValue(of([new ReferenceData(1, "User 1")]));

        component = new EditTaskComponent(
            mockRouter,
            dummyActivatedRoute,
            new FormBuilder(),
            notificationService,
            taskService,
            projectService,
            userService);
    });

    describe("ngOnInit", () => {
        it("should call getParentTasks of task service", () => {
            component.ngOnInit();

            expect(taskService.getParentTasks).toHaveBeenCalled();
            expect(projectService.getProjects).toHaveBeenCalled();
            expect(userService.getUsers).toHaveBeenCalled();
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
            component.update();

            expect(taskService.updateTask).toHaveBeenCalled();
            expect(mockRouter.navigate).toHaveBeenCalledWith(["view"], Object({ relativeTo: Object({ path: "task" }) }));
        });

        it("should call not updateTask of task service", () => {
            component.ngOnInit();
            component.taskForm.patchValue({ name: "" });
            component.update();

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