import { FormControl, Validators } from "@angular/forms";
import * as moment from "moment";

import { SearchCriteria } from "../search-criteria.model";
export class SearchCriteriaFormModel {
  public taskName = new FormControl();
  public parentTaskName = new FormControl();
  public priorityFrom = new FormControl();
  public priorityTo = new FormControl();
  public startDate = new FormControl();
  public endDate = new FormControl();

  constructor(searchCriteria: SearchCriteria) {
    this.taskName.setValue(searchCriteria.taskName);
    this.taskName.valueChanges.subscribe(x => searchCriteria.taskName = x);
    this.taskName.setValidators([this.whiteSpaceValidator]);

    this.parentTaskName.setValue(searchCriteria.parentTaskName);
    this.parentTaskName.valueChanges.subscribe(x => searchCriteria.parentTaskName = x);
    this.parentTaskName.setValidators([this.whiteSpaceValidator]);

    this.priorityFrom.setValue(searchCriteria.priorityFrom);
    this.priorityFrom.valueChanges.subscribe(x => searchCriteria.priorityFrom = x);

    this.priorityTo.setValue(searchCriteria.priorityTo);
    this.priorityTo.valueChanges.subscribe(x => searchCriteria.priorityTo = x);

    this.startDate.setValue(searchCriteria.startDate);
    this.startDate.valueChanges.subscribe(x => searchCriteria.startDate = x);
    this.startDate.setValidators([this.dateValidator]);

    this.endDate.setValue(searchCriteria.endDate);
    this.endDate.valueChanges.subscribe(x => searchCriteria.endDate = x);
    this.endDate.setValidators([this.dateValidator]);
  }

  private whiteSpaceValidator(control: FormControl): any {
    if (control.value) {
      const isWhitespace = control.value.trim().length === 0;
      const isValid = !isWhitespace;

      return isValid ? null : { whitespace: true };
    }
  }

  private dateValidator(control: FormControl): any {
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
