import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { ROUTES } from "./routes";

@Component({
    templateUrl: "./task.component.html"
})

export class TaskComponent {

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    addTask(event: any): void {
        event.preventDefault();

        this.router.navigate([ROUTES.ADDTASK], { relativeTo: this.route });
    }

    viewTask(event: any): void {
        event.preventDefault();

        this.router.navigate([ROUTES.VIEWTASK], { relativeTo: this.route });
    }
}