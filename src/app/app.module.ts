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
    AppRouterModule
  ],
  providers: [
    ToasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
