import { FormBuilder } from "@angular/forms";
import { of } from "rxjs";

import { AddTaskComponent } from "./add-task.component";
import { TaskService } from "../services/task.service";

describe("Add task component", () => {
    let component: AddTaskComponent;
    let taskService: TaskService;

    beforeEach(() => {

        taskService = jasmine.createSpyObj(TaskService.name, ["post", "getParentTasks"]);
        (taskService.post as jasmine.Spy).and.returnValue(of({}));
        (taskService.getParentTasks as jasmine.Spy).and.returnValue(of(["parent task 1"]));

        component = new AddTaskComponent(new FormBuilder(), taskService);
    });

    describe("ngOnInit", () => {
        it("should call getParentTasks of task service", () => {
            component.ngOnInit();

            expect(taskService.getParentTasks).toHaveBeenCalled();
            expect(component.parentTasks$).toBeDefined();
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
                parentTask: "Parent task 1",
                priority: 1,
                startDate: "2018-01-01"
            });

            component.add();

            expect(component.formSubmitted).toBeTruthy();
            expect(taskService.post).toHaveBeenCalled();
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