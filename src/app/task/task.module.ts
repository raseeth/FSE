import { NgModule } from "@angular/core";

import { TaskComponent } from "./task.component";
import { TaskService } from "./services/task.service";
import { TaskRouterModule } from "./task.-routing.module";
import { ViewTaskComponent } from "./view-task/view-task.component";
import { AddTaskComponent } from "./add-task/add-task.component";

@NgModule({
    imports: [
        TaskRouterModule
    ],
    declarations: [
        TaskComponent,
        ViewTaskComponent,
        AddTaskComponent
    ],
    providers: [
        TaskService
    ]
})

export class TaskModule {
}