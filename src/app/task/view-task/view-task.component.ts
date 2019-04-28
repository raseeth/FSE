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

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.getTasks(undefined);
  }

  private getTasks(searchCriteria: SearchCriteria): void {
    this.tasks$ = this.taskService.query(searchCriteria);
  }
}
