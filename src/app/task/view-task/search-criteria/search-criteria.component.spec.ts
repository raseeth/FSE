import { FormBuilder } from "@angular/forms";
import { of } from "rxjs";

import { SearchCriteriaComponent } from "./search-criteria.component";

describe("Search criteria component", () => {
    let component: SearchCriteriaComponent;

    beforeEach(() => {

        component = new SearchCriteriaComponent(new FormBuilder());
        component.ngOnInit();
    });

    describe("ngOnInit", () => {
        it("should emit search criteria when form is valid", () => {
            spyOn(component.filter, "emit");

            component.searchCriteriaForm.patchValue({
                taskName: "1"
            });

            expect(component.filter.emit).toHaveBeenCalled();
        });

        it("should not emit search criteria when form is in valid", () => {
            spyOn(component.filter, "emit");

            component.searchCriteriaForm.patchValue({
                startDate: "asd"
            });

            expect(component.filter.emit).not.toHaveBeenCalled();
        });
    });
});