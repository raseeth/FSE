import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserComponent } from "./user.component";
import { ROUTES } from "../routes";
import { EditUserComponent } from "./edit/edit-user.component";
import { UserLandingComponent } from "./user-landing.component";

const userRoutes: Routes = [
    { path: ROUTES.USER, component: UserLandingComponent,
        children: [
            { path: "", component: UserComponent },
            { path: ROUTES.UPDATE + "/:id", component: EditUserComponent }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule]
})

export class UserRouterModule {
}