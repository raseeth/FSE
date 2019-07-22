import { FormControl, Validators } from "@angular/forms";

import { Task } from "../task.model";
import { CustomValidators } from "../../../validators/custom-validators";

export class TaskFormModel {
    public projectId = new FormControl();
    public projectName = new FormControl();
    public userId = new FormControl();
    public userName = new FormControl();
    public name = new FormControl();
    public isParent = new FormControl();
    public priority = new FormControl();
    public parentTaskId = new FormControl();
    public parentTaskName = new FormControl();
    public startDate = new FormControl();
    public endDate = new FormControl();

    constructor(task: Task) {
      this.projectId.setValue(task.projectId);
      this.projectId.valueChanges.subscribe(x => task.projectId = x);
      this.projectId.setValidators([Validators.required]);

      this.projectName.setValue(task.projectName);
      this.projectName.valueChanges.subscribe(x => task.projectName = x);

      this.userId.setValue(task.userId);
      this.userId.valueChanges.subscribe(x => task.userId = x);
      this.userId.setValidators([Validators.required]);

      this.userName.setValue(task.userName);
      this.userName.valueChanges.subscribe(x => task.userName = x);

      this.name.setValue(task.name);
      this.name.valueChanges.subscribe(x => task.name = x);
      this.name.setValidators([Validators.required]);

      this.setStartDate(task.startDate);
      this.startDate.valueChanges.subscribe(x => task.startDate = x);

      this.setEndDate(task.endDate);
      this.endDate.valueChanges.subscribe(x => task.endDate = x);

      this.isParent.setValue(task.isParent);
      this.isParent.valueChanges.subscribe(x => task.isParent = x);

      this.priority.setValue(task.priority);
      this.priority.valueChanges.subscribe(x => task.priority = x);
      this.priority.setValidators([Validators.required, CustomValidators.priorityRange]);

      this.parentTaskName.setValue(task.parentTaskName);
      this.parentTaskName.valueChanges.subscribe(x => task.parentTaskName = x);
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
}
