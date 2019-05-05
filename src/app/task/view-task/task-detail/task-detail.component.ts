import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

import { ROUTES } from "../../routes";
import { Task } from "../../models/task.model";
import { TaskService } from "../../services/task.service";

@Component({
    selector: "task-detail",
    templateUrl: "./task-detail.component.html"
})

export class TaskDetailComponent {
    @Input() tasks$: Observable<Task[]>;

    @Output() refersh = new EventEmitter<boolean>();

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private taskService: TaskService) {
    }

    hasParent(task: Task): boolean {
      return task.parentTaskName && task.parentTaskName !== "";
    }

    edit(id: string): void {
      this.router.navigate([ROUTES.UPDATETASK, id], { relativeTo: this.route.parent });
    }

    endTask(id: string): void {
      this.taskService.endTask(id).subscribe(response => {
        this.refersh.emit(true);
      },
      (error) => {
      });
    }
}
