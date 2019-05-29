import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { RouterTestingModule } from "@angular/router/testing";
import { ToasterComponent } from "./core/notification/toaster-component";
import { ToasterModule, ToasterService } from "angular2-toaster";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ToasterModule,
      ],
      declarations: [
        AppComponent,
        ToasterComponent
      ],
      providers: [
        ToasterService
      ]
    }).compileComponents();
  }));

  it("should create the app", async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  }));
});
