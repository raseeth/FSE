import { Component, Output, EventEmitter, OnInit, Input } from "@angular/core";
import { FormGroup, AbstractControl, Validators, FormBuilder } from "@angular/forms";

import { NotificationService } from "src/app/core/notification/notification.service";
import { CustomValidators } from "src/app/validators/custom-validators";
import { ProjectService } from "../services/project.service";
import { Project } from "../models/project.model";

@Component({
    selector: "edit-project",
    templateUrl: "./edit-project.component.html"
})

export class EditProjectComponent implements OnInit {
  @Input() projectToEdit: Project;
  @Output() reloadProject = new EventEmitter();

    projectForm: FormGroup;
    id: number;
    project: Project;
    formSubmitted = false;

    constructor(
      private fb: FormBuilder,
      private projectService: ProjectService,
      private notificationService: NotificationService) {
      this.projectForm = this.fb.group({
        name: ["", [Validators.required, CustomValidators.whiteSpace]],
        setDate: [],
        startDate: [""],
        endDate: [""],
        priority: ["", [Validators.required, CustomValidators.priorityRange]],
        // "manager": ["", [Validators.required]]
      });
    }

    get nameControl(): AbstractControl {
      return this.projectForm.get("name") as AbstractControl;
    }

    get priorityControl(): AbstractControl {
      return this.projectForm.get("priority") as AbstractControl;
    }

    get setDateControl(): AbstractControl {
      return this.projectForm.get("setDate") as AbstractControl;
    }

    get startDateControl(): AbstractControl {
      return this.projectForm.get("startDate") as AbstractControl;
    }

    get endDateControl(): AbstractControl {
      return this.projectForm.get("endDate") as AbstractControl;
    }

    ngOnInit(): void {
      this.id = this.projectToEdit.id;
      this.project = this.projectToEdit;
      this.initializeForm();
    }

    editProject(): void {
      this.formSubmitted = true;

      if (!this.projectForm.valid) {
        return;
      }

      this.projectService.update(this.id, this.project).subscribe(() => {
          this.notificationService.success("Project updated successfully");
          this.reloadProject.emit();
          this.formSubmitted = false;
          this.reset();
        },
        () => {
          this.notificationService.error("Project could not be updated!.");
      });
    }

    reset(): void {
      this.projectForm.reset();
      this.priorityControl.patchValue(0);
    }

  private initializeForm(): void {
    this.nameControl.setValue(this.project.name);
    this.priorityControl.setValue(this.project.priority);

    this.nameControl.valueChanges.subscribe(x => this.project.name = x);
    this.priorityControl.valueChanges.subscribe(x => this.project.priority = x);
    this.startDateControl.valueChanges.subscribe(x => this.project.startDate = x);
    this.endDateControl.valueChanges.subscribe(x => this.project.endDate = x);

    this.registerDateValueChanges();
  }

  private registerDateValueChanges(): void {
    if (!this.project.startDate) {
      this.startDateControl.disable();
      this.endDateControl.disable();
    } else {
      this.setStartDate(this.project.startDate);
      this.setEndDate(this.project.endDate);
      this.setDateControl.patchValue(true);
    }

    this.setDateControl.valueChanges.subscribe(value => {
      if (value) {
        const startDate = new Date();
        this.startDateControl.enable();
        this.setStartDate(startDate);
        this.startDateControl.setValidators([Validators.required, CustomValidators.inValidDate]);

        this.endDateControl.enable();
        this.setEndDate(startDate);
        this.endDateControl.setValidators([Validators.required, CustomValidators.inValidDate]);
      } else {
        this.startDateControl.disable();
        this.startDateControl.patchValue(undefined);
        this.startDateControl.clearValidators();

        this.endDateControl.disable();
        this.endDateControl.patchValue(undefined);
        this.endDateControl.clearValidators();
      }
    });
  }

  private setStartDate(date: Date): void {
    const startDate = date ? this.getDate(date) : undefined;
    this.startDateControl.setValue(startDate);
  }

  private setEndDate(date: Date): void {
    if (date) {
      date.setDate(date.getDate() + 1);
      this.endDateControl.setValue(this.getDate(date));
    }
  }

  private getDate(date: Date): string {
    if (date) {
    const day = ("0" + date.getDate()).slice(-2);
    const  month = ("0" + (date.getMonth() + 1)).slice(-2);

    return date.getFullYear() + "-" + month + "-" + day;
    }
  }
}
