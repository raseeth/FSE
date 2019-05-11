import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Observable, of, forkJoin } from "rxjs";
import { flatMap, map, shareReplay } from "rxjs/operators";

import { TaskFormModel } from "../models/form-models/task-form.model";
import { Task } from "../models/task.model";
import { TaskService } from "../services/task.service";
import { ROUTES } from "../routes";

@Component({
    templateUrl: "./edit-task.component.html"
})

export class EditTaskComponent implements OnInit {

    editForm: FormGroup;
    id: string;
    formSubmitted = false;

    taskForm: FormGroup;
    parentTasks: string[];
    taskDetail$: Observable<[Task, string[]]>;

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private taskService: TaskService) {
        this.route.params.subscribe(params => {
          this.id = params["id"];
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

    update(): void {
      this.formSubmitted = true;

      if (!this.editForm.valid) {
        return;
      }

      const task = this.getTask(this.taskForm.value);

      this.taskService.updateTask(task).subscribe(response => {
        this.navigateToView();
      },
      (error) => {
          console.log("Task could not be updated!.");
      });
    }

    private navigateToView(): void {
      this.router.navigate([ROUTES.VIEWTASK], { relativeTo: this.route.parent });
    }

    private getTask(formValue: Task): Task {
      return new Task(
              "",
              formValue.name,
              formValue.parentTaskName,
              +formValue.priority,
              formValue.startDate ? new Date(formValue.startDate) : undefined,
              formValue.endDate ? new Date(formValue.endDate) : undefined);
    }
}
