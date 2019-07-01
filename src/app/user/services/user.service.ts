import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, shareReplay, take } from "rxjs/operators";

import {
  UserDetail,
  UserService as UserApiService,
  CreateUser,
  UpdateUser,
  ICreateUser,
  IUpdateUser
} from "projects/project-manager-api/proxy/project-manager-api.service";
import { User } from "../models/user.model";

@Injectable()
export class UserService {

    constructor(private userApiService: UserApiService) {
    }

    getUsers(): Observable<User[]> {
      return this.userApiService.query().pipe(map(response => this.mapToUsers(response)), shareReplay());
    }

    get(id: number): Observable<User> {
      return this.userApiService.get(id).pipe(map(response => this.mapToUser(response)), shareReplay());
    }

    post(user: User): Observable<any> {
      return this.userApiService.post(this.getCreateUserRequest(user));
    }

    update(user: User): Observable<any> {
      return this.userApiService.put(user.id, this.getUpdateUserRequest(user));
    }

    private mapToUsers(response: UserDetail[]): User[] {
      if (!response) {
        return;
      }

      const users: User[] = [];

      response.forEach(user => {
        users.push(this.mapToUser(user));
      });

      return users;
    }

    private mapToUser(user: UserDetail): User {
      return new User(
        user.id,
        user.firstName,
        user.lastName,
        user.employeeId);
    }

    private getCreateUserRequest(user: User): CreateUser {
      return new CreateUser({
        firstName: user.firstName,
        lastName: user.lastName,
        employeeId: user.employeeId
      } as ICreateUser);
    }

    private getUpdateUserRequest(user: User): UpdateUser {
      return new UpdateUser({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        employeeId: user.employeeId
      } as IUpdateUser);
    }
}
