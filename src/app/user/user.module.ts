import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TypeaheadModule} from "ngx-bootstrap/typeahead";

import {
    UserService as UserServiceApiService
} from "projects/project-manager-api/proxy/project-manager-api.service";

import { NotificationService } from "../core/notification/notification.service";
import { UserComponent } from "./user.component";
import { UserRouterModule } from "./user-routing.module";
import { AddUserComponent } from "./add/add-user.component";
import { UserService } from "./services/user.service";
import { ViewUserComponent } from "./view/view-user.component";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        TypeaheadModule.forRoot(),
        ReactiveFormsModule,
        UserRouterModule
    ],
    declarations: [
        UserComponent,
        AddUserComponent,
        ViewUserComponent
    ],
    providers: [
        UserServiceApiService,
        UserService,
        NotificationService
    ]
})

export class UserModule {
}
