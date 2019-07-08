import { Component, OnInit } from "@angular/core";
import { Project } from "./models/project.model";
import { ProjectService } from "./services/project.service";
import { NotificationService } from "../core/notification/notification.service";

@Component({
    templateUrl: "./project.component.html"
})

export class ProjectComponent implements OnInit {
    projects: Project[];

    constructor(
        private projectService: ProjectService,
        private notificationService: NotificationService) {
    }

    ngOnInit(): void {
      this.getProjects();
    }

    suspend(id: number): void {
        this.projectService.suspend(id).subscribe(() => {
            this.reloadProject();
            this.notificationService.success("Project deleted successfully.");
        },
        (error) => {
            this.notificationService.error("Could not suspend the project.");
        });
    }

    reloadProject(): void {
        this.getProjects();
    }

    private getProjects(): void {
      this.projectService.getProjects().subscribe(projects => this.projects = projects);
    }
}