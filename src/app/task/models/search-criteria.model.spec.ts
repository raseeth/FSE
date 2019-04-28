import { SearchCriteria } from "./search-criteria.model";

describe("Search criteria model", () => {
    let searchCriteria: SearchCriteria;

    beforeEach(() => {
        searchCriteria =
            new SearchCriteria("task name", "parent task", 1, 2, new Date("2019-02-02"), new Date("2019-03-03"));
    });

    it("should assign the date as exected", () => {
        expect(searchCriteria.taskName).toBe("task name");
        expect(searchCriteria.parentTaskName).toBe("parent task");
        expect(searchCriteria.priorityFrom).toBe(1);
        expect(searchCriteria.priorityTo).toBe(2);
        expect(searchCriteria.startDate.toLocaleDateString()).toBe(new Date("2019-02-02").toLocaleDateString());
        expect(searchCriteria.endDate.toLocaleDateString()).toBe(new Date("2019-03-03").toLocaleDateString());
    });
});
