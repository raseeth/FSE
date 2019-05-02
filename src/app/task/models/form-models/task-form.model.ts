import { FormControl, Validators } from "@angular/forms";

import { Task } from "../task.model";

export class TaskFormModel {
  public taskName = new FormControl();
  public priority = new FormControl();
  public parentTaskName = new FormControl();
  public startDate = new FormControl();
  public endDate = new FormControl();

  constructor(task: Task) {
    this.taskName.setValue(task.name);
    this.taskName.valueChanges.subscribe(x => task.name = x);
    this.taskName.setValidators([Validators.required]);

    this.priority.setValue(task.priority);
    this.priority.valueChanges.subscribe(x => task.priority = x);
    this.priority.setValidators([Validators.required]);

    this.parentTaskName.setValue(task.parentTaskName);
    this.parentTaskName.valueChanges.subscribe(x => task.parentTaskName = x);

    this.startDate.setValue(task.startDate);
    this.startDate.valueChanges.subscribe(x => task.startDate = x);
    this.startDate.setValidators([Validators.required]);

    this.endDate.setValue(task.endDate);
    this.endDate.valueChanges.subscribe(x => task.endDate = x);
    this.endDate.setValidators([Validators.required]);
  }
}
