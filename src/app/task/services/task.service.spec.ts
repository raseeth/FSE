import { Task } from "../models/task.model";
import { TaskService } from "./task.service";

describe("Task service", () => {
    let task: Task;
    let target: TaskService;

    beforeEach(() => {
        task = new Task("1", "task name", "parent task", 1, new Date("2019-02-02"), new Date("2019-03-03"), true);

        target = new TaskService();
    });

    it("should create the service", () => {
        expect(target).toBeDefined();
    });
});
