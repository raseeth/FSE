import { Component, OnInit } from "@angular/core";
import { Project } from "./models/project.model";
import { ProjectService } from "./services/project.service";
import { NotificationService } from "../core/notification/notification.service";
import { UserService } from "../user/services/user.service";
import { ReferenceData } from "../modals/models/reference-data.model";
import { forkJoin } from "rxjs";
import { User } from "../user/models/user.model";

@Component({
    templateUrl: "./project.component.html"
})

export class ProjectComponent implements OnInit {
    projects: Project[];
    projectToEdit: Project;

    referenceDatas: ReferenceData[] = [];
    showAdd = true;
    showEdit = false;

    constructor(
        private projectService: ProjectService,
        private userService: UserService,
        private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        const projects$ = this.projectService.getProjects();
        const users$ = this.userService.getUsers();

        forkJoin(projects$, users$).subscribe(response => {
            this.projects = response[0];
            this.mapReferenceData(response[1]);
        });

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
        this.showAdd = true;
        this.showEdit = false;
        this.getProjects();
    }

    editProject(project: Project): void {
        this.showAdd = false;
        this.showEdit = true;
        this.projectToEdit = project;
    }

    private getProjects(): void {
      this.projectService.getProjects().subscribe(projects => this.projects = projects);
    }

    private mapReferenceData(users: User[]) {
        if (users) {
            users.map(x => this.referenceDatas.push(new ReferenceData(x.id, `${x.firstName} ${x.lastName}`)));
        }
    }
}