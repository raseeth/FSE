import { Component, OnInit } from "@angular/core";

import { TaskService } from "../services/task.service";
import { Observable } from "rxjs";
import { Task } from "../models/task.model";
import { SearchCriteria } from "../models/search-criteria.model";

@Component({
    templateUrl: "./view-task.component.html"
})

export class ViewTaskComponent implements OnInit {

  tasks$: Observable<Task[]>;

  private searchCriteria: SearchCriteria;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.tasks$ = this.getTasks(new SearchCriteria());
  }

  filter(searchCriteria: SearchCriteria): void {
    this.tasks$ = this.getTasks(searchCriteria);
  }

  reloadTasks(): void {
    this.getTasks(this.searchCriteria);
  }

  private getTasks(searchCriteria: SearchCriteria): Observable<Task[]> {
    this.searchCriteria = searchCriteria;

    return this.taskService.getTasks(searchCriteria);
  }
}
