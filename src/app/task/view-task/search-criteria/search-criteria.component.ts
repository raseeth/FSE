import { Component, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { SearchCriteria } from "../../models/search-criteria.model";
import { SearchCriteriaFormModel } from "../../models/form-models/search-criteria-form.model";

@Component({
  selector: "search-criteria",
  templateUrl: "./search-criteria.component.html"
})

export class SearchCriteriaComponent {

  @Output() filter = new EventEmitter<SearchCriteria>();

  searchCriteriaForm: FormGroup;
  searchCriteria = new SearchCriteria();

  constructor(private fb: FormBuilder) {
    this.searchCriteriaForm = this.fb.group(new SearchCriteriaFormModel(this.searchCriteria));
  }

  search(): void {
    if (this.searchCriteriaForm.valid) {
      this.filter.emit(this.searchCriteria);
    }
  }

  reset(): void {
    this.searchCriteriaForm.reset();
    this.filter.emit(new SearchCriteria());
  }
}
