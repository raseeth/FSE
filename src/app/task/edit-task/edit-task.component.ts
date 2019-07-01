import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { forkJoin } from "rxjs";

import { TaskFormModel } from "../models/form-models/task-form.model";
import { Task } from "../models/task.model";
import { TaskService } from "../services/task.service";
import { ROUTES } from "../../routes";
import { ParentTask } from "../models/parent-task.model";
import { NotificationService } from "src/app/core/notification/notification.service";

@Component({
    templateUrl: "./edit-task.component.html"
})

export class EditTaskComponent implements OnInit {

    editForm: FormGroup;
    id: number;
    formSubmitted = false;

    taskForm: FormGroup;
    parentTasks: ParentTask[];

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private notificationService: NotificationService,
      private taskService: TaskService) {
        this.route.params.subscribe(params => {
          this.id = +params["id"];
        });
    }

    ngOnInit(): void {
      const task$ = this.taskService.get(this.id);
      const parentTasks$ = this.taskService.getParentTasks();

      forkJoin(task$, parentTasks$).subscribe(([task, parentTasks]) => {
          this.taskForm = this.fb.group(new TaskFormModel(task));
          this.parentTasks = parentTasks;

          this.editForm = this.fb.group({"task": this.taskForm});
        });
    }

    cancel(): void {
      this.navigateToView();
    }

    update(parentTasks: ParentTask[]): void {
      this.formSubmitted = true;

      if (!this.editForm.valid) {
        return;
      }

      const task = this.getTask(this.taskForm.value);

      this.taskService.updateTask(task, parentTasks).subscribe(() => {
        this.notificationService.success("Task updated successfully");
        this.navigateToView();
      },
      (error) => {
        this.notificationService.success("Task could not be updated!.");
      });
    }

    private navigateToView(): void {
      this.router.navigate([ROUTES.VIEWTASK], { relativeTo: this.route.parent });
    }

    private getTask(formValue: Task): Task {
      return new Task(
              this.id,
              formValue.name,
              formValue.parentTaskName,
              +formValue.priority,
              formValue.startDate ? new Date(formValue.startDate) : undefined,
              formValue.endDate ? new Date(formValue.endDate) : undefined);
    }
}
