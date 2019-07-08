import { Component, OnInit } from "@angular/core";
import { UserService } from "./services/user.service";
import { User } from "./models/user.model";
import { NotificationService } from "../core/notification/notification.service";

@Component({
    templateUrl: "./user.component.html"
})

export class UserComponent implements OnInit {

    users: User[];
    userToEdit: User;
    showAdd = true;
    showEdit = false;

    constructor(
        private userService: UserService,
        private notificationService: NotificationService) {
    }

    ngOnInit(): void {
      this.getUsers();
    }

    delete(id: number): void {
        this.userService.delete(id).subscribe(() => {
            this.reloadUser();
            this.notificationService.success("User deleted successfully.");
        },
        (error) => {
            this.notificationService.error("Could not delete the user.");
        });
    }

    reloadUser(): void {
        this.showAdd = true;
        this.showEdit = false;
        this.userToEdit = undefined;
        this.getUsers();
    }

    editUser(user: User): void {
        this.showAdd = false;
        this.showEdit = true;
        this.userToEdit = user;
    }

    private getUsers(): void {
      this.userService.getUsers().subscribe(users => this.users = users);
    }
}