import { UserComponent } from "./user.component";
import { Router } from "@angular/router";

describe("User component", () => {
    let component: UserComponent;

    let mockEvent: any;
    let mockRouter: any;
    let dummyActivatedRoute: any;

    beforeEach(() => {
        dummyActivatedRoute = {
            parent: {
                path: "task"
            }
        };

        mockEvent = jasmine.createSpyObj("Event", ["preventDefault"]);
        mockRouter = jasmine.createSpyObj(Router.name, ["navigate"]);

        component = new UserComponent(mockRouter, dummyActivatedRoute);
    });

    describe("addtask", () => {
        it("should navigate to add task", () => {
            component.addTask(mockEvent);

            expect(mockEvent.preventDefault).toHaveBeenCalled();
            expect(mockRouter.navigate).toHaveBeenCalledWith(["add"], Object({ relativeTo: Object({ parent: Object({ path: "task" }) }) }));
        });
    });

    describe("viewTask", () => {
        it("should navigate to add task", () => {
            component.viewTask(mockEvent);

            expect(mockEvent.preventDefault).toHaveBeenCalled();
            expect(mockRouter.navigate)
                .toHaveBeenCalledWith(["view"], Object({ relativeTo: Object({ parent: Object({ path: "task" }) }) }));
        });
    });
});