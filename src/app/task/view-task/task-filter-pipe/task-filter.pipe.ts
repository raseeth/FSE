import { PipeTransform, Pipe } from "@angular/core";
import { Task } from "../../models/task.model";
import { SearchCriteria } from "../../models/search-criteria.model";

@Pipe({
  name: "taskFilter",
  pure: false
})

export class TaskFilterPipe implements PipeTransform {

  transform(tasks: Task[], searchCriteria: SearchCriteria): Task[] {
    if (!tasks || !searchCriteria) {
      return tasks;
    }

    return tasks.filter(x => {
      (searchCriteria.taskName && x.name.toLowerCase().indexOf(
        searchCriteria.taskName.trim().toLowerCase()) !== -1)
      || (searchCriteria.parentTaskName && x.name.toLowerCase().indexOf(
        searchCriteria.parentTaskName.trim().toLowerCase()) !== -1)
    });
  }
}