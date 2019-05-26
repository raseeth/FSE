import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { ParentTask } from "../models/parent-task.model";

@Component({
  selector: "task-form",
  templateUrl: "./task-form.component.html"
})

export class TaskFormComponent implements OnInit {
  @Input() taskForm: FormGroup;
  @Input() formSubmitted: boolean;
  @Input() parentTasks: ParentTask[] = [];

  searchTask = "";
  parentTasksSelector: Observable<any>;

  ngOnInit(): void {
    this.parentTasksSelector = new Observable((observer: any) => {
                        observer.next();
                      }).pipe(
                        mergeMap(() => this.getSourceAsObservable(this.searchTask.toLowerCase())));

    this.parentTaskNameControl.valueChanges.subscribe(x => this.searchTask = x);
  }

  get taskNameControl(): FormControl {
    return this.taskForm.controls["name"] as FormControl;
  }

  get parentTaskNameControl(): FormControl {
    return this.taskForm.controls["parentTaskName"] as FormControl;
  }

  get priorityControl(): FormControl {
    return this.taskForm.controls["priority"] as FormControl;
  }

  get startDateControl(): FormControl {
    return this.taskForm.controls["startDate"] as FormControl;
  }

  private getSourceAsObservable(taskName: string): Observable<any> {
    const filteredData = this.parentTasks.filter((item: ParentTask) => {
      return item ? item.name.toLowerCase().indexOf(taskName) >= 0 : undefined;
    }).map(x => x.name);

    return of(filteredData);
  }
}
