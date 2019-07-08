import { of } from "rxjs";

import {
    UserDetail,
    UserService as UserApiService,
    IUserDetail,
} from "projects/project-manager-api/proxy/project-manager-api.service";

import { User } from "../models/user.model";
import { UserService } from "./user.service";

describe("User service", () => {
    let target: UserService;

    let userApiService: UserApiService;
    let userDetail: UserDetail;

    beforeEach(() => {
        userDetail = new UserDetail({
            id: 1,
            firstName: "Gokul",
            lastName: "Muthu",
            employeId: 123,
            endDate: new Date("2019-01-01"),
            isComplete: true
        } as IUserDetail);

        userApiService = jasmine.createSpyObj(UserApiService.name, ["get", "query", "post", "put", "delete"]);
        (userApiService.get as jasmine.Spy).and.returnValue(of(userDetail));
        (userApiService.query as jasmine.Spy).and.returnValue(of([userDetail]));
        (userApiService.post as jasmine.Spy).and.returnValue(of({}));
        (userApiService.put as jasmine.Spy).and.returnValue(of({}));
        (userApiService.delete as jasmine.Spy).and.returnValue(of({}));

        target = new UserService(userApiService);
    });

    it("should create the service", () => {
        expect(target).toBeDefined();
    });

    describe("getUsers", () => {
        it("should call query of user api service", () => {
            target.getUsers();

            expect(userApiService.query).toHaveBeenCalled();
        });

        it("should return expected tasks", () => {
            target.getUsers().subscribe(response => {
                expect(response.length).toBe(1);
                expect(response[0].id).toBe(userDetail.id);
                expect(response[0].firstName).toBe(userDetail.firstName);
                expect(response[0].lastName).toBe(userDetail.lastName);
                expect(response[0].employeeId).toBe(userDetail.employeeId);
            });
        });
    });

    describe("get", () => {
        it("should call get of user api service", () => {
            target.get(userDetail.id);

            expect(userApiService.get).toHaveBeenCalled();
        });

        it("should return expected tasks", () => {
            target.get(userDetail.id).subscribe(response => {
                expect(response.id).toBe(userDetail.id);
                expect(response.firstName).toBe(userDetail.firstName);
                expect(response.lastName).toBe(userDetail.lastName);
                expect(response.employeeId).toBe(userDetail.employeeId);
            });
        });
    });

    describe("post", () => {
        it("should call post of user api service", () => {
            target.post(new User(undefined, "First", "Last", 1234));

            expect(userApiService.post).toHaveBeenCalled();
        });
    });

    describe("update", () => {
        it("should call put of user api service", () => {
            target.update(2, new User(2, "First", "Last", 1234));

            expect(userApiService.put).toHaveBeenCalled();
        });
    });

    describe("delete", () => {
        it("should call delete of user api service", () => {
            target.delete(1);

            expect(userApiService.delete).toHaveBeenCalled();
        });
    });
});