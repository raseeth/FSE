import { Component, OnInit } from "@angular/core";

import { TaskService } from "../services/task.service";
import { Observable } from "rxjs";
import { Task } from "../models/task.model";
import { SearchCriteria } from "../models/search-criteria.model";

@Component({
    templateUrl: "./view-task.component.html"
})

export class ViewTaskComponent implements OnInit {

  tasks: Task[];

  searchCriteria: SearchCriteria;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.getTasks();
  }

  filter(searchCriteria: SearchCriteria): void {
    this.searchCriteria = searchCriteria;
  }

  reloadTasks(): void {
    this.getTasks();
  }

  private getTasks(): void {
    this.taskService.getTasks().subscribe(response => this.tasks = response);
  }
}
