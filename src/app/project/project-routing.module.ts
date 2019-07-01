import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ProjectComponent } from "./project.component";
import { ROUTES } from "../routes";

const projectRoutes: Routes = [
    { path: ROUTES.PROJECT, component: ProjectComponent,
        children: [
            { path: "", redirectTo: ROUTES.ADD, pathMatch: "full" },
            { path: ROUTES.ADD, component: ProjectComponent },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(projectRoutes)],
    exports: [RouterModule]
})

export class ProjectRouterModule {
}