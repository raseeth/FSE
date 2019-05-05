import { FormControl, Validators } from "@angular/forms";

import { Task } from "../task.model";

export class TaskFormModel {
  public name = new FormControl();
  public priority = new FormControl();
  public parentTaskName = new FormControl();
  public startDate = new FormControl();
  public endDate = new FormControl();

  constructor(task: Task) {
    this.name.setValue(task.name);
    this.name.valueChanges.subscribe(x => task.name = x);
    this.name.setValidators([Validators.required]);

    this.priority.setValue(task.priority);
    this.priority.valueChanges.subscribe(x => task.priority = x);
    this.priority.setValidators([Validators.required]);

    this.parentTaskName.setValue(task.parentTaskName);
    this.parentTaskName.valueChanges.subscribe(x => task.parentTaskName = x);

    this.setStartDate(task.startDate);
    this.startDate.valueChanges.subscribe(x => {
      task.startDate = this.setDate(x);
    });

    this.startDate.setValidators([Validators.required]);

    this.setEndDate(task.endDate);
    this.endDate.valueChanges.subscribe(x => task.endDate = this.setDate(x));
    this.endDate.setValidators([Validators.required]);
  }

  private setStartDate(date: Date): void {
    const startDate = date ? this.getDate(date) : undefined;
    this.startDate.setValue(startDate);
  }

  private setEndDate(date: Date): void {
    const endDate = date ? this.getDate(date) : undefined;
    this.endDate.setValue(endDate);
  }

  private getDate(date: Date): string {
    if (date) {
    const day = ("0" + date.getDate()).slice(-2);
    const  month = ("0" + (date.getMonth() + 1)).slice(-2);

    return date.getFullYear() + "-" + month + "-" + day;
    }
  }

  private setDate(date: string): Date {
    if (Date.parse(date) >= 0) {
      return new Date(date);
    }
  }
}
