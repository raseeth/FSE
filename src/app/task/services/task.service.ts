import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { SearchCriteria } from "../models/search-criteria.model";
import { Task } from "../models/task.model";

@Injectable()
export class TaskService {

    // TODO: Integrate task manager api

    private dataSource: Task[];
    private id = 3;

    constructor() {
      this.dataSource = [
        new Task("1", "task 1", "", 1, new Date("2018-01-01"), undefined, false),
        new Task("2", "task 2", "parent task 1", 2, new Date("2019-01-01"), undefined, false),
        new Task("3", "task 3", "parent task 2", 3, new Date("2019-04-01"), new Date("2019-04-04"), true)
      ];
    }

    getTasks(): Observable<Task[]> {
      return of(this.dataSource);
    }

    get(id: string): Observable<Task> {
      return of(this.dataSource.find(x => x.id === id));
    }

    post(task: Task): Observable<any> {
      this.id = this.id + 1;
      task.id = this.id.toString();
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
      const task = this.dataSource.find(x => x.id === id);
      if (!task.endDate) {
        task.endDate = new Date();
      }

      task.isComplete = true;

      return of(undefined);
    }
}
