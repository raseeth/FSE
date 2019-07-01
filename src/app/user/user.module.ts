import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TypeaheadModule} from "ngx-bootstrap/typeahead";

import {
    ParentTaskService as ParentTaskApiService,
    TaskService as TaskApiService
} from "projects/project-manager-api/proxy/project-manager-api.service";

import { NotificationService } from "../core/notification/notification.service";
import { UserComponent } from "./user.component";
import { UserRouterModule } from "./user-routing.module";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        TypeaheadModule.forRoot(),
        ReactiveFormsModule,
        UserRouterModule
    ],
    declarations: [
        UserComponent
    ],
    providers: [
        TaskApiService,
        ParentTaskApiService,
        NotificationService
    ]
})

export class TaskModule {
}
