import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { forkJoin, Observable } from "rxjs";

import { TaskFormModel } from "../models/form-models/task-form.model";
import { Task } from "../models/task.model";
import { TaskService } from "../services/task.service";
import { ROUTES } from "../../routes";
import { ParentTask } from "../models/parent-task.model";
import { NotificationService } from "src/app/core/notification/notification.service";
import { ReferenceData } from "src/app/modals/models/reference-data.model";
import { UserService } from "src/app/user/services/user.service";
import { ProjectService } from "src/app/project/services/project.service";

@Component({
    templateUrl: "./edit-task.component.html"
})

export class EditTaskComponent implements OnInit {

    editForm: FormGroup;
    id: number;
    formSubmitted = false;

    taskForm: FormGroup;
    parentTasks: ReferenceData[] = [];
    projects: ReferenceData[] = [];
    users: ReferenceData[] = [];

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private notificationService: NotificationService,
      private taskService: TaskService,
      private projectService: ProjectService,
      private userService: UserService) {
        this.route.params.subscribe(params => {
          this.id = +params["id"];
        });
    }

    ngOnInit(): void {
      const task$ = this.taskService.get(this.id);
      const parentTasks$ = this.taskService.getParentTasks();
      const projects$ = this.projectService.getProjects();
      const users$ = this.userService.getUsers();

      forkJoin(task$, parentTasks$, projects$, users$).subscribe(([task, parentTasks, projects, users]) => {
          this.taskForm = this.fb.group(new TaskFormModel(task));
          if (parentTasks) {
            parentTasks.map(x => this.parentTasks.push(new ReferenceData(x.id, x.name)));
          }

          if (projects) {
            projects.map(x => this.projects.push(new ReferenceData(x.id, x.name)));
          }

          if (users) {
            users.map(x => this.users.push(new ReferenceData(x.id, `${x.firstName} ${x.lastName}`)));
          }

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

      this.taskService.updateTask(task).subscribe(() => {
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
              formValue.projectId,
              undefined,
              formValue.isParent,
              formValue.parentTaskId,
              formValue.parentTaskName,
              +formValue.priority,
              formValue.userId,
              undefined,
              formValue.startDate ? new Date(formValue.startDate) : undefined,
              formValue.endDate ? new Date(formValue.endDate) : undefined);
    }
}
