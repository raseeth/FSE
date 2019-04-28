import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ROUTES } from "../routes";

@Component({
    templateUrl: "./view-task.component.html"
})

export class ViewTaskComponent {

    constructor(private router: Router, private route: ActivatedRoute) {
    }
}