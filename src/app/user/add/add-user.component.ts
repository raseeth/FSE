import { Component, Output, EventEmitter } from "@angular/core";
import { FormGroup, AbstractControl, Validators, FormBuilder } from "@angular/forms";

import { NotificationService } from "src/app/core/notification/notification.service";
import { CustomValidators } from "src/app/validators/custom-validators";
import { UserService } from "../services/user.service";

@Component({
    selector: "add-user",
    templateUrl: "./add-user.component.html"
})

export class AddUserComponent {
    @Output() reloadUser = new EventEmitter();

    userForm: FormGroup;
    formSubmitted = false;

    constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private notificationService: NotificationService) {
      this.userForm = this.fb.group({
        "firstName": ["", [Validators.required, CustomValidators.whiteSpace]],
        "lastName": ["", [Validators.required, CustomValidators.whiteSpace]],
        "employeeId": ["", [Validators.required]]
      });
    }

    get firstNameControl(): AbstractControl {
      return this.userForm.get("firstName") as AbstractControl;
    }

    get lastNameControl(): AbstractControl {
      return this.userForm.get("lastName") as AbstractControl;
    }

    get employeeIdControl(): AbstractControl {
      return this.userForm.get("employeeId") as AbstractControl;
    }

    addUser(): void {
      this.formSubmitted = true;

      this.userService.post(this.userForm.value).subscribe(() => {
          this.notificationService.success("User added successfully");
          this.reloadUser.emit();
          this.formSubmitted = false;
          this.reset();
        },
        () => {
          this.notificationService.error("User could not be added!.");
      });
    }

    reset(): void {
      this.userForm.reset();
    }
}
