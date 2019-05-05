import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, of } from "rxjs";
import { FormGroup, FormBuilder } from "@angular/forms";

import { TaskFormModel } from "../models/form-models/task-form.model";
import { Task } from "../models/task.model";
import { TaskService } from "../services/task.service";

@Component({
    templateUrl: "./add-task.component.html"
})

export class AddTaskComponent implements OnInit {

    addForm: FormGroup;
    formSubmitted = false;

    parentTasks$: Observable<string[]>;

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private taskService: TaskService) {
      this.addForm = this.fb.group({"task": this.fb.group(new TaskFormModel(Task.Default)) });
    }

    get taskForm(): FormGroup {
      return this.addForm.get("task") as FormGroup;
    }

    ngOnInit(): void {
      this.parentTasks$ = this.taskService.getParentTasks();
    }

    add(): void {
      if (!this.addForm.valid) {
        this.formSubmitted = true;
        return;
      }

      const task = this.getTask(this.taskForm.value);

      this.taskService.post(task).subscribe(response => {
        },
        (error) => {
          console.log("Task could not be added!.");
      });
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
