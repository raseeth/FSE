import { Injectable } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { SelectorModalComponent } from "../selector-modal.component";
import { ReferenceData } from "../models/reference-data.model";

@Injectable()
export class SelectorModalService {
    private config = {
        animated: false,
        keyboard: false,
        ignoreBackdropClick: true
    };

     constructor(private modalService: BsModalService) {
     }

     openSelectorModal(title: string, referenceDatas: ReferenceData[], onSelectedItem: (item) => void): void {
        const bsModalRef = this.show(SelectorModalComponent);
        const container = bsModalRef.content as SelectorModalComponent;

        container.selectedItem.subscribe(referenceData => {
                onSelectedItem(referenceData);
            });

        container.referenceDatas = referenceDatas;
        container.selectorContext = title;
     }

     private show(component: any): BsModalRef {
         return this.modalService.show(component, Object.assign({}, this.config));
     }
}