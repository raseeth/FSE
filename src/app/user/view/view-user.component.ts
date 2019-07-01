import { Component, Input, Output, EventEmitter } from "@angular/core";
import { User } from "../models/user.model";
import { ROUTES } from "src/app/routes";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "view-user",
    templateUrl: "./view-user.component.html"
})

export class ViewUserComponent {
  @Input() users: User[];

  @Output() deleteUser = new EventEmitter<number>();

  constructor(
    private router: Router,
    private route: ActivatedRoute) {
  }

  delete(id: number): void {
    this.deleteUser.emit(id);
  }

  edit(id: number): void {
    this.router.navigate([ROUTES.UPDATE, id], { relativeTo: this.route });
  }
}
