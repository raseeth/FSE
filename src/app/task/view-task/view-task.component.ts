import { Component, OnInit } from "@angular/core";

import { TaskService } from "../services/task.service";
import { Task } from "../models/task.model";
import { FormGroup, FormControl, AbstractControl } from "@angular/forms";
import { SelectorModalService } from "src/app/modals/services/selector-modal.service";
import { ReferenceData } from "src/app/modals/models/reference-data.model";

@Component({
    templateUrl: "./view-task.component.html"
})

export class ViewTaskComponent implements OnInit {

  tasks: Task[];
  projects: ReferenceData[] = [];
  tasksToDisplay: Task[] = [];
  sortBy = "startdate";
  searchText: string;

  searchForm: FormGroup;

  constructor(
    private taskService: TaskService,
    private selectorModalService: SelectorModalService) {
    this.searchForm = new FormGroup({
      search: new FormControl()
    });
  }

  get searchControl(): AbstractControl {
    return this.searchForm.get("search") as AbstractControl;
  }

  ngOnInit(): void {
    this.getTasks();

    this.searchControl.valueChanges.subscribe(x => {
      this.searchText = x;
      this.getFilteredTasks();
    });
  }

  setSortBy(sortBy: string): void {
    this.sortBy = sortBy;
    this.getFilteredTasks();
  }

  reloadTasks(): void {
    this.getTasks();
  }

  selectProject(): void {
    this.selectorModalService.openSelectorModal("Project", this.projects,
      (item) => this.searchControl.patchValue(item.description));
  }

  private getTasks(): void {
    this.taskService.getTasks().subscribe(response => {
      this.tasks = response;

      if (response) {
        response.map(x => this.projects.push(new ReferenceData(x.projectId, x.projectName)));
      }

      this.getFilteredTasks();
    });
  }

  private getFilteredTasks(): void {
    if (this.tasks) {
      const filteredTasks = this.filterTasks();
      this.tasksToDisplay = this.sortTask(filteredTasks);
    }
  }

  private filterTasks(): Task[] {
    let filteredTasks = this.tasks;

    if (this.searchText && this.searchText !== "") {
      filteredTasks = this.tasks.filter(x => x.projectName.toLowerCase().includes(this.searchText.trim().toLowerCase()));
    }

    return filteredTasks;
  }

  private sortTask(filteredTasks: Task[]): Task[] {
    if (filteredTasks) {
      switch (this.sortBy) {
        case "startdate":
          return filteredTasks.sort((x, y) => this.getTime(x.startDate) - this.getTime(y.startDate));
        case "enddate":
            return filteredTasks.sort((x, y) => this.getTime(x.endDate) - this.getTime(y.endDate));
        case "priority":
          return filteredTasks.sort((x, y) => (x.priority - y.priority));
        case "completed":
          return filteredTasks.sort((x, y) => (x.isComplete > y.isComplete ? -1 : 1));
        default:
          return filteredTasks;
      }
    }
  }

  private getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
  }
}
