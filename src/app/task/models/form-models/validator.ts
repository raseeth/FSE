import { FormControl } from "@angular/forms";
import * as moment from "moment";

export class CustomValidators {
  static inValidDate(control: FormControl): any {
    if (control.value) {
      const dateSplit = control.value.split("-");

      if (dateSplit.length !== 3) {
        return { invalidDate: true };
      }

      const year = dateSplit[0];
      const month = dateSplit[1];
      const date = dateSplit[2];

      if (+year < 0 || +month < 0 || +date[2] < 0) {
        return { invalidDate: true };
      }

      const value = moment(`${+year}-${month}-${date}`, "YYYY-MM-DD", true);

      if (!value.isValid()) {
        return { invalidDate: true };
      }
    }

    return null;
  }
}
