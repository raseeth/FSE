import { Component, Input, Output, EventEmitter } from "@angular/core";
import { User } from "../models/user.model";

@Component({
    selector: "view-user",
    templateUrl: "./view-user.component.html"
})

export class ViewUserComponent {
  @Input() users: User[];

  @Output() deleteUser = new EventEmitter<number>();

  delete(id: number): void {
    this.deleteUser.emit(id);
  }
}
