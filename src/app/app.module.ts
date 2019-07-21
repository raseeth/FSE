import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToasterModule, ToasterService } from "angular2-toaster";

import { AppComponent } from "./app.component";
import { AppRouterModule } from "./app-routing.module";
import { HeaderComponent } from "./header/header.component";
import { TaskModule } from "./task/task.module";
import { ToasterComponent } from "./core/notification/toaster-component";
import { UserModule } from "./user/user.module";
import { ProjectModule } from "./project/project.module";

import { ModalModule, BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SelectorModalComponent } from "./modals/selector-modal.component";
import { SelectorModalService } from "./modals/services/selector-modal.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ToasterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TaskModule,
    UserModule,
    ProjectModule,
    ToasterModule,
    ModalModule.forRoot(),
    AppRouterModule
  ],
  providers: [
    ToasterService,
    SelectorModalService,
    BsModalService
  ],
  entryComponents: [
    SelectorModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
