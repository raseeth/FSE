import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from "@angular/core";

import { User } from "../models/user.model";
import { FormGroup, FormControl, AbstractControl } from "@angular/forms";

@Component({
    selector: "view-user",
    templateUrl: "./view-user.component.html"
})

export class ViewUserComponent implements OnInit, OnChanges {
  @Input() users: User[];

  @Output() deleteUser = new EventEmitter<number>();
  @Output() editUser = new EventEmitter<User>();

  usersToDisplay: User[] = [];
  sortBy = "firstname";
  searchText: string;

  searchForm: FormGroup;

  constructor() {
    this.searchForm = new FormGroup({
      search: new FormControl()
    });
  }

  get searchControl(): AbstractControl {
    return this.searchForm.get("search") as AbstractControl;
  }

  ngOnInit(): void {
    this.getUsers();

    this.searchControl.valueChanges.subscribe(x => {
      this.searchText = x;
      this.getUsers();
    });
  }

  ngOnChanges(change: SimpleChanges): void {
    if (change["users"]) {
      this.getUsers();
    }
  }

  delete(id: number): void {
    this.deleteUser.emit(id);
  }

  edit(user: User): void {
    this.editUser.emit(user.clone());
  }

  setSortBy(sortBy: string): void {
    this.sortBy = sortBy;
    this.getUsers();
  }

  private getUsers(): void {
    if (this.users) {
      const filteredUsers = this.filterUsers();
      this.usersToDisplay = this.sortUser(filteredUsers);
    }
  }

  private filterUsers(): User[] {
    let filteredUsers = this.users;

    if (this.searchText && this.searchText !== "") {
      filteredUsers = this.users.filter(x => x.firstName.toLowerCase().includes(this.searchText.trim().toLowerCase())
        || x.lastName.toLowerCase().includes(this.searchText.trim().toLowerCase()));
    }

    return filteredUsers;
  }

  private sortUser(filteredUsers: User[]): User[] {
    if (filteredUsers) {
      switch (this.sortBy) {
        case "firstname":
          return filteredUsers.sort((x, y) => (x.firstName < y.firstName ? -1 : 1));
        case "lastname":
            return filteredUsers.sort((x, y) => (x.lastName < y.lastName ? -1 : 1));
        case "id":
          return filteredUsers.sort((x, y) => (x.employeeId - y.employeeId));
        default:
          return filteredUsers;
      }
    }
  }
}
