import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges } from "@angular/core";
import { FormGroup, FormControl, AbstractControl } from "@angular/forms";

import { ROUTES } from "src/app/routes";
import { Router, ActivatedRoute } from "@angular/router";
import { Project } from "../models/project.model";

@Component({
    selector: "view-project",
    templateUrl: "./view-project.component.html"
})

export class ViewProjectComponent implements OnInit, OnChanges {
  @Input() projects: Project[];

  @Output() suspendProject = new EventEmitter<number>();

  projectsToDisplay: Project[] = [];
  sortBy = "startdate";
  searchText: string;

  searchForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute) {
      this.searchForm = new FormGroup({
        search: new FormControl()
      });
  }

  get searchControl(): AbstractControl {
    return this.searchForm.get("search") as AbstractControl;
  }

  ngOnInit(): void {
    this.getProjects();

    this.searchControl.valueChanges.subscribe(x => {
      this.searchText = x;
      this.getProjects();
    });
  }

  ngOnChanges(change: SimpleChanges): void {
    if (change["projects"]) {
      this.getProjects();
    }
  }

  suspend(id: number): void {
    this.suspendProject.emit(id);
  }

  edit(id: number): void {
    this.router.navigate([ROUTES.UPDATE, id], { relativeTo: this.route });
  }

  setSortBy(sortBy: string): void {
    this.sortBy = sortBy;
    this.getProjects();
  }

  private getProjects(): void {
    if (this.projects) {
      const filteredProjects = this.filterProjects();
      this.projectsToDisplay = this.sortProject(filteredProjects);
    }
  }

  private filterProjects(): Project[] {
    let filteredProjects = this.projects;

    if (this.searchText && this.searchText !== "") {
      filteredProjects = this.projects.filter(x =>
        x.name.toLowerCase().includes(this.searchText.trim().toLowerCase()));
    }

    return filteredProjects;
  }

  private sortProject(filteredProjects: Project[]): Project[] {
    if (filteredProjects) {
      switch (this.sortBy) {
        case "startdate":
          return filteredProjects.sort((x, y) => (x.startDate < y.startDate ? -1 : 1));
        case "enddate":
            return filteredProjects.sort((x, y) => (x.endDate < y.endDate ? -1 : 1));
        case "priority":
          return filteredProjects.sort((x, y) => (x.priority - y.priority));
        case "completed":
            return filteredProjects.sort((x, y) => (x.isComplete > y.isComplete ? -1 : 1));
        default:
          return filteredProjects;
      }
    }
  }
}
