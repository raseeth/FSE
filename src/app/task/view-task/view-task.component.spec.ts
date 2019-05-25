import { of } from "rxjs";

import { TaskService } from "../services/task.service";
import { ViewTaskComponent } from "./view-task.component";
import { Task } from "../models/task.model";
import { SearchCriteria } from "../models/search-criteria.model";

describe("View task component", () => {
    let component: ViewTaskComponent;
    let taskService: TaskService;

    let tasks: Task[];

    beforeEach(() => {

        tasks = [
            new Task("1", "Task 1", undefined, 1, new Date("2018-01-01")),
            new Task("2", "Task 2", "Task 1", 2, new Date("2018-01-01"))
        ];
        taskService = jasmine.createSpyObj(TaskService.name, ["getTasks"]);
        (taskService.getTasks as jasmine.Spy).and.returnValue(of(tasks));

        component = new ViewTaskComponent(taskService);
    });

    describe("ngOnInit", () => {
        it("should call getTasks of task service", () => {
            component.ngOnInit();

            expect(taskService.getTasks).toHaveBeenCalled();
        });

        it("should assing expected tasks", () => {
            component.ngOnInit();

            expect(component.tasks).toBeDefined();
            expect(component.tasks.length).toBe(tasks.length);
            expect(component.tasks).toBe(tasks);
        });
    });

    describe("reloadTasks", () => {
        it("should call getTasks of task service", () => {
            component.reloadTasks();

            expect(taskService.getTasks).toHaveBeenCalled();
        });

        it("should assing expected tasks", () => {
            component.reloadTasks();

            expect(component.tasks).toBeDefined();
            expect(component.tasks.length).toBe(tasks.length);
            expect(component.tasks).toBe(tasks);
        });
    });

    describe("filter", () => {
        it("should assing expected tasks", () => {
            const searchCriteria = new SearchCriteria("task 1", "parent task");
            component.filter(searchCriteria);

            expect(component.searchCriteria).toBeDefined();
            expect(component.searchCriteria).toBe(searchCriteria);
        });
    });
});