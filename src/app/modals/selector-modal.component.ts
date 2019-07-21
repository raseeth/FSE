import { Component, Input, EventEmitter } from "@angular/core";
import { ReferenceData } from "./models/reference-data.model";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
    templateUrl: "./selector-modal.component.html"
})

export class SelectorModalComponent {
    @Input() selectorContext: string;
    @Input() referenceDatas: ReferenceData[];

    selectedItem = new EventEmitter<ReferenceData>();

    constructor(private bsModalRef: BsModalRef) {
    }

    select(item: ReferenceData) {
        this.bsModalRef.hide();
        this.selectedItem.emit(item);
    }

    cancel(): void {
        this.bsModalRef.hide();
    }
}