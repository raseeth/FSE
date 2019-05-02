import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "task-form",
  templateUrl: "./task-form.component.html"
})

export class TaskFormComponent {
  @Input() taskForm: FormGroup;
}
