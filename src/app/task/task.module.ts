import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { TaskComponent } from "./task.component";
import { TaskService } from "./services/task.service";
import { TaskRouterModule } from "./task.-routing.module";
import { ViewTaskComponent } from "./view-task/view-task.component";
import { AddTaskComponent } from "./add-task/add-task.component";
import { TaskDetailComponent } from "./view-task/task-detail/task-detail.component";
import { SearchCriteriaComponent } from "./view-task/search-criteria/search-criteria.component";
import { TaskFormComponent } from "./task-form/task-form.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TaskRouterModule
    ],
    declarations: [
        TaskComponent,
        ViewTaskComponent,
        AddTaskComponent,
        TaskDetailComponent,
        SearchCriteriaComponent,
        TaskFormComponent
    ],
    providers: [
        TaskService
    ]
})

export class TaskModule {
}
