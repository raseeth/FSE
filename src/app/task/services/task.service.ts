import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { SearchCriteria } from "../models/search-criteria.model";
import { Task } from "../models/task.model";

@Injectable()
export class TaskService {

    // TODO: Integrate task manager api

    private dataSource: Task[];

    constructor() {
      this.dataSource = [
        new Task("1", "task 1", "", 1, new Date("2018-01-01"), undefined, false),
        new Task("2", "task 2", "parent task 1", 2, new Date("2019-01-01"), undefined, false),
        new Task("3", "task 3", "parent task 2", 3, new Date("2019-04-01"), new Date("2019-04-04"), true)
      ];
    }

    getTasks(searchCriteria: SearchCriteria): Observable<Task[]> {
      return of(this.dataSource);
    }

    post(task: Task): Observable<any> {
      this.dataSource.push(task);

      return of(undefined);
    }

    getParentTasks(): Observable<string[]> {
        return of(this.dataSource.map(x => x.parentTaskName));
    }

    updateTask(task: Task): Observable<any> {
      let taskToUpdate = this.dataSource.find(x => x.id === task.id);
      taskToUpdate = task;

      return of(undefined);
    }

    endTask(id: string): Observable<any> {
      this.dataSource.find(x => x.id === id).isComplete = true;

      return of(undefined);
    }
}
