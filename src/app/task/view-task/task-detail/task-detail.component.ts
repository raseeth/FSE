import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { ROUTES } from "../../routes";
import { Task } from "../../models/task.model";
import { TaskService } from "../../services/task.service";
import { NotificationService } from "src/app/core/notification/notification.service";

@Component({
    selector: "task-detail",
    templateUrl: "./task-detail.component.html"
})

export class TaskDetailComponent {
    @Input() task: Task;

    @Output() refresh = new EventEmitter<boolean>();

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private notificationService: NotificationService,
      private taskService: TaskService) {
    }

    get hasParent(): boolean {
      return this.task.parentTaskName && this.task.parentTaskName !== "";
    }

    edit(): void {
      this.router.navigate([ROUTES.UPDATETASK, this.task.id], { relativeTo: this.route.parent });
    }

    endTask(): void {
      this.taskService.endTask(this.task.id).subscribe(() => {
        this.notificationService.success("Task completed successfully");
        this.refresh.emit(true);
      },
      (error) => {
        this.notificationService.error("Task could not be completed!.");
      });
    }
}
