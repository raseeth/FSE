import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { SearchCriteria } from "../../models/search-criteria.model";
import { SearchCriteriaFormModel } from "../../models/form-models/search-criteria-form.model";

@Component({
  selector: "search-criteria",
  templateUrl: "./search-criteria.component.html"
})

export class SearchCriteriaComponent implements OnInit {

  @Output() filter = new EventEmitter<SearchCriteria>();

  searchCriteriaForm: FormGroup;
  searchCriteria = new SearchCriteria();

  constructor(private fb: FormBuilder) {
    this.searchCriteriaForm = this.fb.group(
      new SearchCriteriaFormModel(this.searchCriteria));
  }

  ngOnInit(): void {
    this.searchCriteriaForm.valueChanges.subscribe(() => {
      if (this.searchCriteriaForm.valid) {
       this.filter.emit(this.searchCriteria.clone());
       // Cloning the model to trigger change detector, so can use pure filter.
       // Otherwise will have to use impure filter.
      }
    });
  }
}
