import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ROUTES } from "../routes";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { TaskFormModel } from "../models/form-models/task-form.model";
import { Task } from "../models/task.model";
import { TaskService } from "../services/task.service";

@Component({
    templateUrl: "./add-task.component.html"
})

export class AddTaskComponent {

    addForm: FormGroup;
    formSubmitted = false;

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

    add(): void {
      if (!this.addForm.valid) {
        this.formSubmitted = true;
        return;
      }

      this.taskService.post(this.addForm.value as Task).subscribe(response => {
        },
        (error) => {
          console.log("Task could not be added!.");
      });
    }
}
