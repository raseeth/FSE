import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserComponent } from "./user.component";
import { ROUTES } from "../routes";

const userRoutes: Routes = [
    { path: ROUTES.USER, component: UserComponent,
        children: [
            { path: "", redirectTo: ROUTES.ADD, pathMatch: "full" },
            { path: ROUTES.ADD, component: UserComponent },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule]
})

export class UserRouterModule {
}