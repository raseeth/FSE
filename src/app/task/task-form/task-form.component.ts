import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";

@Component({
  selector: "task-form",
  templateUrl: "./task-form.component.html"
})

export class TaskFormComponent implements OnInit {
  @Input() taskForm: FormGroup;
  @Input() formSubmitted: boolean;
  @Input() parentTasks: string[];

  searchTask = "";
  dataSource: Observable<any>;

  ngOnInit(): void {
    this.dataSource = new Observable((observer: any) => {
                        observer.next();
                      }).pipe(
                        mergeMap(() => this.getSourceAsObservable(this.searchTask.toLowerCase())));
  }

  private getSourceAsObservable(task: string): Observable<any> {
    const filteredData = this.parentTasks.filter((item: any) => {
      return item.toLowerCase().indexOf(task) >= 0;
    });

    return of(filteredData);
  }
}
