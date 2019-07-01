import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserComponent } from "./user.component";
import { ROUTES } from "../task/routes";

const userRoutes: Routes = [
    { path: ROUTES.TASK, component: UserComponent,
        children: [
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule]
})

export class UserRouterModule {
}