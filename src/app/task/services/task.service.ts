import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { SearchCriteria } from "../models/search-criteria.model";
import { Task } from "../models/task.model";

@Injectable()
export class TaskService {

    // TODO: Integrate task manager api
    query(searchCriteria: SearchCriteria): Observable<Task[]> {
        return of([
            new Task("1", "task 1", "", 1, new Date("2018-01-01"), undefined, false),
            new Task("2", "task 2", "parent task 1", 2, new Date("2019-01-01"), undefined, false),
            new Task("3", "task 3", "parent task 2", 3, new Date("2019-04-01"), new Date("2019-04-04"), true)
        ]);
    }
}
