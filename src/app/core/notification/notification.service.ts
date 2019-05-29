import { Injectable } from "@angular/core";

import { ToasterService } from "angular2-toaster";

@Injectable()
export class NotificationService {

    constructor(private toasterService: ToasterService) {
    }

    success(message: string): void {
        this.toasterService.pop("success", "Success", message);
    }

    error(message: string): void {
        this.toasterService.pop("error", "Error", message);
    }
}