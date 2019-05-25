import { PipeTransform, Pipe } from "@angular/core";
import { Task } from "../../models/task.model";
import { SearchCriteria } from "../../models/search-criteria.model";

@Pipe({
  name: "taskFilter"
})

export class TaskFilterPipe implements PipeTransform {

  transform(tasks: Task[], searchCriteria: SearchCriteria): Task[] {
    if (!tasks || !searchCriteria) {
      return tasks;
    }

    let filteredTasks = tasks;

    if (searchCriteria.taskName && searchCriteria.taskName !== "") {
      filteredTasks = tasks.filter(x => x.name.toLowerCase().includes(searchCriteria.taskName.trim().toLowerCase()));
    }

    if (searchCriteria.parentTaskName && searchCriteria.parentTaskName !== "") {
      filteredTasks = filteredTasks.filter(x =>
                                      x.parentTaskName
                                      && x.parentTaskName.toLowerCase()
                                          .includes(searchCriteria.parentTaskName.trim().toLowerCase()));
    }

    if (searchCriteria.priorityFrom) {
      filteredTasks = filteredTasks.filter(x => x.priority >= searchCriteria.priorityFrom);
    }

    if (searchCriteria.priorityTo) {
      filteredTasks = filteredTasks.filter(x => x.priority <= searchCriteria.priorityTo);
    }

    if (searchCriteria.startDate) {
      filteredTasks = filteredTasks.filter(x => x.startDate >= searchCriteria.startDate);
    }

    if (searchCriteria.endDate) {
      filteredTasks = filteredTasks.filter(x => x.endDate && x.endDate <= searchCriteria.endDate);
    }

    return filteredTasks;
  }
}