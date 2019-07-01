import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ROUTES } from "../routes";
import { TaskComponent } from "./task.component";
import { ViewTaskComponent } from "./view-task/view-task.component";
import { AddTaskComponent } from "./add-task/add-task.component";
import { EditTaskComponent } from "./edit-task/edit-task.component";

const taskRoutes: Routes = [
    { path: ROUTES.TASK, component: TaskComponent,
        children: [
            { path: "", redirectTo: ROUTES.VIEWTASK, pathMatch: "full" },
            { path: ROUTES.VIEWTASK, component: ViewTaskComponent },
            { path: ROUTES.ADD, component: AddTaskComponent },
            { path: ROUTES.UPDATE + "/:id", component: EditTaskComponent }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(taskRoutes)],
    exports: [RouterModule]
})

export class TaskRouterModule {
}