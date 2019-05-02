import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map, debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "task-form",
  templateUrl: "./task-form.component.html"
})

export class TaskFormComponent {
  @Input() taskForm: FormGroup;
  @Input() formSubmitted: boolean;
  @Input() parentTasks: string[];

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => !term ? []
        : this.parentTasks.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
}
