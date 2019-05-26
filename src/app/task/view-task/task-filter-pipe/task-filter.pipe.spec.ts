import { of } from "rxjs";
import { TaskFilterPipe } from "./task-filter.pipe";
import { Task } from "../../models/task.model";
import { SearchCriteria } from "../../models/search-criteria.model";

describe("Task filter pipe", () => {
    let target: TaskFilterPipe;

    let tasks: Task[];
    let searchCriteria: SearchCriteria;

    beforeEach(() => {
        searchCriteria = new SearchCriteria();

        tasks = [
            new Task(1, "Task 1", undefined, 1, new Date("2018-01-01")),
            new Task(2, "Task 2", "Task 1", 2, new Date("2018-04-01"), new Date("2019-04-01"))
        ];

        target = new TaskFilterPipe();
    });

    describe("transform", () => {
        it("should return undefined if tasks is null", () => {
            expect(target.transform(null, searchCriteria)).toBeNull();
        });

        it("should return epected tasks if search criteria is null", () => {
            expect(target.transform(tasks, null)).toBe(tasks);
        });

        it("should filter tasks by task name", () => {
            searchCriteria.taskName = "1";
            const results = target.transform(tasks, searchCriteria);

            expect(results.length).toBe(1);
            expect(results[0].name).toBe(tasks[0].name);
        });

        it("should filter tasks by parent task name", () => {
            searchCriteria.parentTaskName = "1";
            const results = target.transform(tasks, searchCriteria);

            expect(results.length).toBe(1);
            expect(results[0].parentTaskName).toBe(tasks[1].parentTaskName);
        });

        it("should filter tasks by priority from", () => {
            searchCriteria.priorityFrom = 1;
            const results = target.transform(tasks, searchCriteria);

            expect(results.length).toBe(2);
        });

        it("should filter tasks by priority to", () => {
            searchCriteria.priorityTo = 1;
            const results = target.transform(tasks, searchCriteria);

            expect(results.length).toBe(1);
        });

        it("should filter tasks by start date", () => {
            searchCriteria.startDate = new Date("2018-01-01");
            const results = target.transform(tasks, searchCriteria);

            expect(results.length).toBe(2);
        });

        it("should filter tasks by end date", () => {
            searchCriteria.endDate = new Date("2020-01-01");
            const results = target.transform(tasks, searchCriteria);

            expect(results.length).toBe(1);
        });

        it("should filter tasks by all search parameters", () => {
            searchCriteria = new SearchCriteria("2", "1", 1, 2, new Date("2018-01-01"), new Date("2020-01-01"));
            const results = target.transform(tasks, searchCriteria);

            expect(results.length).toBe(1);
        });
    });
});