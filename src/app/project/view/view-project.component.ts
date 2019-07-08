import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ROUTES } from "src/app/routes";
import { Router, ActivatedRoute } from "@angular/router";
import { Project } from "../models/project.model";

@Component({
    selector: "view-project",
    templateUrl: "./view-project.component.html"
})

export class ViewProjectComponent {
  @Input() projects: Project[];

  @Output() suspendUser = new EventEmitter<number>();

  constructor(
    private router: Router,
    private route: ActivatedRoute) {
  }

  suspend(id: number): void {
    this.suspendUser.emit(id);
  }

  edit(id: number): void {
    this.router.navigate([ROUTES.UPDATE, id], { relativeTo: this.route });
  }
}
