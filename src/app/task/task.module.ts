import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { TaskComponent } from "./task.component";
import { TaskService } from "./services/task.service";
import { TaskRouterModule } from "./task.-routing.module";
import { ViewTaskComponent } from "./view-task/view-task.component";
import { AddTaskComponent } from "./add-task/add-task.component";
import { TaskDetailComponent } from "./view-task/task-detail/task-detail.component";

@NgModule({
    imports: [
        CommonModule,
        TaskRouterModule
    ],
    declarations: [
        TaskComponent,
        ViewTaskComponent,
        AddTaskComponent,
        TaskDetailComponent
    ],
    providers: [
        TaskService
    ]
})

export class TaskModule {
}
