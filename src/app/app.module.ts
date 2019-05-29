import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToasterModule, ToasterService } from "angular2-toaster";

import { AppComponent } from "./app.component";
import { AppRouterModule } from "./app-routing.module";
import { TaskModule } from "./task/task.module";
import { ToasterComponent } from "./core/notification/toaster-component";

@NgModule({
  declarations: [
    AppComponent,
    ToasterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TaskModule,
    ToasterModule,
    AppRouterModule
  ],
  providers: [
    ToasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
