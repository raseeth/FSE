import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { NotificationService } from "src/app/core/notification/notification.service";
import { TaskFormModel } from "../models/form-models/task-form.model";
import { Task } from "../models/task.model";
import { TaskService } from "../services/task.service";
import { ParentTask } from "../models/parent-task.model";
import { ProjectService } from "src/app/project/services/project.service";
import { UserService } from "src/app/user/services/user.service";
import { ReferenceData } from "src/app/modals/models/reference-data.model";

@Component({
    templateUrl: "./add-task.component.html"
})

export class AddTaskComponent implements OnInit {

    addForm: FormGroup;
    formSubmitted = false;

    parentTasks$: Observable<ReferenceData[]>;
    projects$: Observable<ReferenceData[]>;
    users$: Observable<ReferenceData[]>;

    constructor(
      private fb: FormBuilder,
      private notificationService: NotificationService,
      private taskService: TaskService,
      private projectService: ProjectService,
      private userService: UserService) {
      this.addForm = this.fb.group({"task": this.fb.group(new TaskFormModel(Task.Default)) });
    }

    get taskForm(): FormGroup {
      return this.addForm.get("task") as FormGroup;
    }

    ngOnInit(): void {
      this.getParentTasks();

      this.projects$ = this.projectService.getProjects().pipe(map(projects => {
        if (projects) {
          return projects.map(x => new ReferenceData(x.id, x.name));
        }
      }));

      this.users$ = this.userService.getUsers().pipe(map(users => {
        if (users) {
          return users.map(x => new ReferenceData(x.id, `${x.firstName} ${x.lastName}`));
        }
      }));
    }

    add(): void {
      this.formSubmitted = true;

      if (!this.addForm.valid) {
        return;
      }

      const task = this.getTask(this.taskForm.value);

      this.taskService.post(task).subscribe(() => {
          this.notificationService.success("Task added successfully");
          this.getParentTasks();
          this.formSubmitted = false;
          this.reset();
        },
        (error) => {
          this.notificationService.error("Task could not be added!.");
      });
    }

    reset(): void {
      this.taskForm.reset();

      this.taskForm.controls["priority"].setValue(0);
    }

    private getTask(formValue: Task): Task {
      return new Task(
              undefined,
              formValue.name,
              formValue.projectId,
              undefined,
              formValue.isParent,
              formValue.parentTaskId,
              undefined,
              +formValue.priority,
              formValue.userId,
              undefined,
              formValue.startDate ? new Date(formValue.startDate) : undefined,
              formValue.endDate ? new Date(formValue.endDate) : undefined);
    }

    private getParentTasks(): void {
      this.parentTasks$ = this.taskService.getParentTasks().pipe(map(parentTasks => {
        if (parentTasks) {
          return parentTasks.map(x => new ReferenceData(x.id, x.name));
        }
      }));
    }
}
