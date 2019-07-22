import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { ReferenceData } from "src/app/modals/models/reference-data.model";
import { SelectorModalService } from "src/app/modals/services/selector-modal.service";
import { CustomValidators } from "src/app/validators/custom-validators";

@Component({
  selector: "task-form",
  templateUrl: "./task-form.component.html"
})

export class TaskFormComponent implements OnInit {
  @Input() taskForm: FormGroup;
  @Input() formSubmitted: boolean;
  @Input() parentTasks: ReferenceData[] = [];
  @Input() projects: ReferenceData[] = [];
  @Input() users: ReferenceData[] = [];

  disable = false;
  searchTask = "";
  parentTasksSelector: Observable<any>;

  constructor(private selectorModalService: SelectorModalService) {
  }

  ngOnInit(): void {
    this.isParentControl.valueChanges.subscribe(x => {
      this.setUpTaskControls(x);
    });

    this.setUpTaskControls(this.isParentControl.value);
  }

  get taskNameControl(): FormControl {
    return this.taskForm.controls["name"] as FormControl;
  }

  get isParentControl(): FormControl {
    return this.taskForm.controls["isParent"] as FormControl;
  }

  get parentTaskIdControl(): FormControl {
    return this.taskForm.controls["parentTaskId"] as FormControl;
  }

  get parentTaskNameControl(): FormControl {
    return this.taskForm.controls["parentTaskName"] as FormControl;
  }

  get projectIdControl(): FormControl {
    return this.taskForm.controls["projectId"] as FormControl;
  }

  get projectNameControl(): FormControl {
    return this.taskForm.controls["projectName"] as FormControl;
  }

  get userIdControl(): FormControl {
    return this.taskForm.controls["userId"] as FormControl;
  }

  get userNameControl(): FormControl {
    return this.taskForm.controls["userName"] as FormControl;
  }

  get priorityControl(): FormControl {
    return this.taskForm.controls["priority"] as FormControl;
  }

  get startDateControl(): FormControl {
    return this.taskForm.controls["startDate"] as FormControl;
  }

  get endDateControl(): FormControl {
    return this.taskForm.controls["endDate"] as FormControl;
  }

  selectProject(): void {
    this.selectorModalService.openSelectorModal("Project", this.projects, (item) => this.onSelectedProject(item));
  }

  selectParentTask(): void {
    this.selectorModalService.openSelectorModal("Parent Task", this.parentTasks, (item) => this.onSelectedParentTask(item));
  }

  selectUser(): void {
    this.selectorModalService.openSelectorModal("User", this.users, (item) => this.onSelectedUser(item));
  }

  private onSelectedProject(item: ReferenceData): void {
    this.projectIdControl.patchValue(item.id);
    this.projectNameControl.patchValue(item.description);
  }

  private onSelectedParentTask(item: ReferenceData): void {
    this.parentTaskIdControl.patchValue(item.id);
    this.parentTaskNameControl.patchValue(item.description);
  }

  private onSelectedUser(item: ReferenceData): void {
    this.userIdControl.patchValue(item.id);
    this.userNameControl.patchValue(item.description);
  }

  private setUpTaskControls(value: boolean): void {
    if (value) {
      this.disable = true;
      this.parentTaskIdControl.disable();
      this.startDateControl.disable();
      this.endDateControl.disable();

      this.parentTaskIdControl.patchValue(undefined);
      this.parentTaskNameControl.patchValue(undefined);
      this.startDateControl.patchValue(undefined);
      this.endDateControl.patchValue(undefined);

      this.parentTaskIdControl.clearValidators();
      this.startDateControl.clearValidators();
      this.endDateControl.clearValidators();
    } else {
      this.disable = false;
      this.parentTaskIdControl.enable();
      this.startDateControl.enable();
      this.endDateControl.enable();

      this.startDateControl.setValidators([Validators.required, CustomValidators.inValidDate]);
      this.endDateControl.setValidators([Validators.required, CustomValidators.inValidDate]);
    }
  }
}
