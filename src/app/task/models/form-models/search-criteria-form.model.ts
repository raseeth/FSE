import { FormControl } from "@angular/forms";

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

    this.parentTaskName.setValue(searchCriteria.parentTaskName);
    this.parentTaskName.valueChanges.subscribe(x => searchCriteria.parentTaskName = x);

    this.priorityFrom.setValue(searchCriteria.priorityFrom);
    this.priorityFrom.valueChanges.subscribe(x => searchCriteria.priorityFrom = x);

    this.priorityTo.setValue(searchCriteria.priorityTo);
    this.priorityTo.valueChanges.subscribe(x => searchCriteria.priorityTo = x);

    this.startDate.setValue(searchCriteria.startDate);
    this.startDate.valueChanges.subscribe(x => searchCriteria.startDate = x);

    this.endDate.setValue(searchCriteria.endDate);
    this.endDate.valueChanges.subscribe(x => searchCriteria.endDate = x);
  }
}
