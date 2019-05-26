import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TypeaheadModule} from "ngx-bootstrap/typeahead";

import {
    ParentTaskService as ParentTaskApiService,
    TaskService as TaskApiService
} from "projects/task-manager-api/proxy/taskManager-api.service";

import { TaskComponent } from "./task.component";
import { TaskService } from "./services/task.service";
import { TaskRouterModule } from "./task.-routing.module";
import { ViewTaskComponent } from "./view-task/view-task.component";
import { AddTaskComponent } from "./add-task/add-task.component";
import { TaskDetailComponent } from "./view-task/task-detail/task-detail.component";
import { SearchCriteriaComponent } from "./view-task/search-criteria/search-criteria.component";
import { TaskFormComponent } from "./task-form/task-form.component";
import { EditTaskComponent } from "./edit-task/edit-task.component";
import { TaskFilterPipe } from "./view-task/task-filter-pipe/task-filter.pipe";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        TypeaheadModule.forRoot(),
        ReactiveFormsModule,
        TaskRouterModule
    ],
    declarations: [
        TaskComponent,
        ViewTaskComponent,
        AddTaskComponent,
        TaskDetailComponent,
        SearchCriteriaComponent,
        TaskFormComponent,
        EditTaskComponent,
        TaskFilterPipe
    ],
    providers: [
        TaskService,
        TaskApiService,
        ParentTaskApiService
    ]
})

export class TaskModule {
}
