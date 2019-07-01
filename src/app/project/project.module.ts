import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TypeaheadModule} from "ngx-bootstrap/typeahead";

import {
    ProjectsService as ProjectsServiceApiService
} from "projects/project-manager-api/proxy/project-manager-api.service";

import { NotificationService } from "../core/notification/notification.service";
import { ProjectComponent } from "./project.component";
import { ProjectRouterModule } from "./project-routing.module";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        TypeaheadModule.forRoot(),
        ReactiveFormsModule,
        ProjectRouterModule
    ],
    declarations: [
        ProjectComponent
    ],
    providers: [
        ProjectsServiceApiService,
        NotificationService
    ]
})

export class ProjectModule {
}
