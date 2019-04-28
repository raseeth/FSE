import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";

import { Task } from "../../models/task.model";

@Component({
    selector: "task-detail",
    templateUrl: "./task-detail.component.html"
})

export class TaskDetailComponent {
    @Input() tasks$: Observable<Task[]>;

    edit(id: string): void {

    }

    endTask(): void {
    }
}
