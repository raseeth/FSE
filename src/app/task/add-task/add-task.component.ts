import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ROUTES } from "../routes";

@Component({
    templateUrl: "./add-task.component.html"
})

export class AddTaskComponent {

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    addTask(): void {
        this.router.navigate([ROUTES.ADDTASK], { relativeTo: this.route.parent });
    }

    viewTask(): void {
        this.router.navigate([ROUTES.VIEWTASK], { relativeTo: this.route.parent });
    }
}