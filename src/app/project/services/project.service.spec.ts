import { of } from "rxjs";

import {
    ProjectDetail,
    ProjectService as ProjectApiService,
    IProjectDetail,
    UserDetail,
    IUserDetail,
} from "projects/project-manager-api/proxy/project-manager-api.service";
import { ProjectService } from "./project.service";
import { Project } from "../models/project.model";
import { User } from "src/app/user/models/user.model";


describe("Project service", () => {
    let target: ProjectService;

    let projectApiService: ProjectApiService;
    let projectDetail: ProjectDetail;

    beforeEach(() => {
        projectDetail = new ProjectDetail({
            id: 1,
            name: "Project 1",
            priority: 1,
            numberOfTasks: 2,
            startDate: new Date("2018-01-01"),
            endDate: new Date("2018-01-01"),
            isComplete: true,
            userDetail: new UserDetail({
                id: 1,
                firstName: "Gokul",
                lastName: "Muthu",
                employeId: 123,
                endDate: new Date("2019-01-01"),
                isComplete: true
            } as IUserDetail)
        });

        projectApiService = jasmine.createSpyObj(ProjectApiService.name, ["get", "query", "post", "put", "suspend"]);
        (projectApiService.get as jasmine.Spy).and.returnValue(of(projectDetail));
        (projectApiService.query as jasmine.Spy).and.returnValue(of([projectDetail]));
        (projectApiService.post as jasmine.Spy).and.returnValue(of({}));
        (projectApiService.put as jasmine.Spy).and.returnValue(of({}));
        (projectApiService.suspend as jasmine.Spy).and.returnValue(of({}));

        target = new ProjectService(projectApiService);
    });

    it("should create the service", () => {
        expect(target).toBeDefined();
    });

    describe("getProjects", () => {
        it("should call query of project api service", () => {
            target.getProjects();

            expect(projectApiService.query).toHaveBeenCalled();
        });

        it("should return expected projects", () => {
            target.getProjects().subscribe(response => {
                expect(response.length).toBe(1);
                expect(response[0].id).toBe(projectDetail.id);
                expect(response[0].name).toBe(projectDetail.name);
                expect(response[0].priority).toBe(projectDetail.priority);
                expect(response[0].isComplete).toBe(projectDetail.isComplete);
            });
        });
    });

    describe("get", () => {
        it("should call get of project api service", () => {
            target.get(projectDetail.id);

            expect(projectApiService.get).toHaveBeenCalled();
        });

        it("should return expected tasks", () => {
            target.get(projectDetail.id).subscribe(response => {
                expect(response.id).toBe(projectDetail.id);
                expect(response.name).toBe(projectDetail.name);
                expect(response.priority).toBe(projectDetail.priority);
                expect(response.isComplete).toBe(projectDetail.isComplete);
            });
        });
    });

    describe("post", () => {
        it("should call post of project api service", () => {
            target.post(new Project(undefined, "Project", 1, 1, 11));

            expect(projectApiService.post).toHaveBeenCalled();
        });
    });

    describe("update", () => {
        it("should call put of project api service", () => {
            target.update(1, new Project(1, "Project", 1, 1, 11));

            expect(projectApiService.put).toHaveBeenCalled();
        });
    });

    describe("suspend", () => {
        it("should call suspend of project api service", () => {
            target.suspend(1);

            expect(projectApiService.suspend).toHaveBeenCalled();
        });
    });
});