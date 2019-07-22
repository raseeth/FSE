import { FormBuilder } from "@angular/forms";
import { of } from "rxjs";

import { AddTaskComponent } from "./add-task.component";
import { TaskService } from "../services/task.service";
import { NotificationService } from "src/app/core/notification/notification.service";
import { ProjectService } from "src/app/project/services/project.service";
import { UserService } from "src/app/user/services/user.service";
import { ReferenceData } from "src/app/modals/models/reference-data.model";

describe("Add task component", () => {
    let component: AddTaskComponent;
    let taskService: TaskService;
    let projectService: ProjectService;
    let userService: UserService;
    let notificationService: NotificationService;

    beforeEach(() => {
        notificationService = jasmine.createSpyObj(NotificationService.name, ["success", "error"]);
        taskService = jasmine.createSpyObj(TaskService.name, ["post", "getParentTasks"]);
        (taskService.post as jasmine.Spy).and.returnValue(of({}));
        (taskService.getParentTasks as jasmine.Spy).and.returnValue(of([new ReferenceData(1, "Parent Task 1")]));

        projectService = jasmine.createSpyObj(ProjectService.name, ["getProjects"]);
        (projectService.getProjects as jasmine.Spy).and.returnValue(of([new ReferenceData(1, "Project 1")]));

        userService = jasmine.createSpyObj(UserService.name, ["getUsers"]);
        (userService.getUsers as jasmine.Spy).and.returnValue(of([new ReferenceData(1, "User 1")]));

        component = new AddTaskComponent(
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
    });

    describe("add", () => {
        it("should not call post of task service if form is in valid", () => {
            component.taskForm.patchValue({
                name: ""
            });

            component.add();
            expect(component.formSubmitted).toBeTruthy();
            expect(taskService.post).not.toHaveBeenCalled();
        });

        it("should call post of task service if form is valid", () => {
            component.taskForm.patchValue({
                name: "Task 1",
                parentTaskId: 1,
                priority: 1,
                startDate: "2018-01-01"
            });

            component.add();

            expect(taskService.post).toHaveBeenCalled();
            expect(notificationService.success).toHaveBeenCalled();
        });
    });

    describe("reset", () => {
        it("should call reset method of task form", () => {
            spyOn(component.taskForm, "reset");

            component.reset();

            expect(component.taskForm.reset).toHaveBeenCalled();
        });

        it("should reset priority to 0", () => {
            component.reset();

            expect(component.taskForm.controls["priority"].value).toBe(0);
        });
    });
});