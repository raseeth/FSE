import { Component, Output, EventEmitter, OnInit, Input } from "@angular/core";
import { FormGroup, AbstractControl, Validators, FormBuilder, FormControl } from "@angular/forms";

import { NotificationService } from "src/app/core/notification/notification.service";
import { CustomValidators } from "src/app/validators/custom-validators";
import { UserService } from "../services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ROUTES } from "src/app/routes";
import { User } from "../models/user.model";

@Component({
  selector: "edit-user",
  templateUrl: "./edit-user.component.html"
})

export class EditUserComponent implements OnInit {
  @Input() userToEdit: User;
  @Output() reloadUser = new EventEmitter();

    id: number;
    user: User;
    userForm: FormGroup;
    formSubmitted = false;

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private userService: UserService,
      private notificationService: NotificationService) {
        this.userForm = this.fb.group({
          "firstName": ["", [Validators.required, CustomValidators.whiteSpace]],
          "lastName": ["", [Validators.required, CustomValidators.whiteSpace]],
          "employeeId": ["", [Validators.required]]
      });
    }

    get firstNameControl(): FormControl {
      return this.userForm.controls["firstName"] as FormControl;
    }

    get lastNameControl(): FormControl {
      return this.userForm.controls["lastName"] as FormControl;
    }

    get employeeIdControl(): FormControl {
      return this.userForm.controls["employeeId"] as FormControl;
    }

    ngOnInit(): void {
      this.id = this.userToEdit.id;
        this.user = this.userToEdit;
        this.initializeForm();
    }

    editUser(): void {
      this.formSubmitted = true;

      if (!this.userForm.valid) {
        return;
      }

      this.userService.update(this.id, this.user).subscribe(() => {
          this.notificationService.success("User updated successfully");
          this.reloadUser.emit();
        },
        () => {
          this.notificationService.error("User could not be updated!.");
      });
    }

    reset(): void {
      this.userForm.reset();
    }

    private initializeForm(): void {
      this.firstNameControl.setValue(this.user.firstName);
      this.lastNameControl.setValue(this.user.lastName);
      this.employeeIdControl.setValue(this.user.employeeId);

      this.firstNameControl.valueChanges.subscribe(x => this.user.firstName = x);
      this.lastNameControl.valueChanges.subscribe(x => this.user.lastName = x);
      this.employeeIdControl.valueChanges.subscribe(x => this.user.employeeId = x);
    }
}
