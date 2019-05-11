import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";

@Component({
  selector: "task-form",
  templateUrl: "./task-form.component.html"
})

export class TaskFormComponent implements OnInit {
  @Input() taskForm: FormGroup;
  @Input() formSubmitted: boolean;
  @Input() parentTasks: string[] = [];

  searchTask = "";
  parentTasksSelector: Observable<any>;

  ngOnInit(): void {
    this.parentTasksSelector = new Observable((observer: any) => {
                        observer.next();
                      }).pipe(
                        mergeMap(() => this.getSourceAsObservable(this.searchTask.toLowerCase())));
  }

  get taskNameControl(): FormControl {
    return this.taskForm.controls["name"] as FormControl;
  }

  get priorityControl(): FormControl {
    return this.taskForm.controls["priority"] as FormControl;
  }

  get startDateControl(): FormControl {
    return this.taskForm.controls["startDate"] as FormControl;
  }

  private getSourceAsObservable(task: string): Observable<any> {
    const filteredData = this.parentTasks.filter((item: any) => {
      return item ? item.toLowerCase().indexOf(task) >= 0 : undefined;
    });

    return of(filteredData);
  }
}
