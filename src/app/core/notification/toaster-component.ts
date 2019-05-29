import { Component } from "@angular/core";
import { ToasterConfig } from "angular2-toaster";

@Component({
    selector: "app-toaster",
    template: `
    <toaster-container [toasterconfig]="config"></toaster-container>`
})

export class ToasterComponent {
    public config: ToasterConfig =
        new ToasterConfig({
            showCloseButton: true,
            tapToDismiss: false,
            animation: "fade",
            timeout: 0
    });
}