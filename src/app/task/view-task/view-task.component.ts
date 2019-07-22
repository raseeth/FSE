import { Component, OnInit } from "@angular/core";

import { TaskService } from "../services/task.service";
import { Task } from "../models/task.model";

@Component({
    templateUrl: "./view-task.component.html"
})

export class ViewTaskComponent implements OnInit {

  tasks: Task[];

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.getTasks();
  }

  reloadTasks(): void {
    this.getTasks();
  }

  private getTasks(): void {
    this.taskService.getTasks().subscribe(response => this.tasks = response);
  }
}
