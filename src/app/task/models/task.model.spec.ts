import { Task } from "./task.model";

describe("Task model", () => {
    let task: Task;

    beforeEach(() => {
        task = new Task("1", "task name", "parent task", 1, new Date("2019-02-02"), new Date("2019-03-03"), true);
    });

    it("should assign the date as exected", () => {
        expect(task.id).toBe("1");
        expect(task.name).toBe("task name");
        expect(task.parentTaskName).toBe("parent task");
        expect(task.priority).toBe(1);
        expect(task.startDate.toLocaleDateString()).toBe(new Date("2019-02-02").toLocaleDateString());
        expect(task.endDate.toLocaleDateString()).toBe(new Date("2019-03-03").toLocaleDateString());
        expect(task.isComplete).toBeTruthy();
    });
});
