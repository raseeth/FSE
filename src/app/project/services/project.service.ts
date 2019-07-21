import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, shareReplay, take } from "rxjs/operators";

import {
  ProjectDetail,
  ProjectService as ProjectApiService,
  CreateProject,
  UpdateProject,
  ICreateProject,
  IUpdateProject,
  UserDetail
} from "projects/project-manager-api/proxy/project-manager-api.service";
import { Project } from "../models/project.model";
import { User } from "src/app/user/models/user.model";

@Injectable()
export class ProjectService {

    constructor(private projectApiService: ProjectApiService) {
    }

    getProjects(): Observable<Project[]> {
      return this.projectApiService.query().pipe(map(response => this.mapToProjects(response)), shareReplay());
    }

    get(id: number): Observable<Project> {
      return this.projectApiService.get(id).pipe(map(response => this.mapToProject(response)), shareReplay());
    }

    post(project: Project): Observable<any> {
      return this.projectApiService.post(this.getCreateProjectRequest(project));
    }

    update(id: number, project: Project): Observable<any> {
      return this.projectApiService.put(id, this.getUpdateProjectRequest(project));
    }

    suspend(id: number): Observable<any> {
      return this.projectApiService.suspend(id);
    }

    private mapToProjects(response: ProjectDetail[]): Project[] {
      if (!response) {
        return;
      }

      const projects: Project[] = [];

      response.forEach(project => {
        projects.push(this.mapToProject(project));
      });

      return projects;
    }

    private mapToProject(project: ProjectDetail): Project {
      return new Project(
        project.id,
        project.name,
        project.priority,
        this.mapToUser(project.userDetail),
        project.numberOfTasks,
        project.startDate,
        project.endDate,
        project.isComplete);
    }

    private mapToUser(user: UserDetail): User {
      if (user) {
        return new User(
          user.id,
          user.firstName,
          user.lastName,
          user.employeeId);
      }
    }

    private getCreateProjectRequest(project: Project): CreateProject {
      return new CreateProject({
        name: project.name,
        priority: project.priority,
        startDate: project.startDate ? new Date(project.startDate) : undefined,
        endDate: project.endDate ? new Date(project.endDate) : undefined,
        // userId: project.user.id
      } as ICreateProject);
    }

    private getUpdateProjectRequest(project: Project): UpdateProject {
      return new UpdateProject({
        id: project.id,
        name: project.name,
        priority: project.priority,
        startDate: project.startDate ? new Date(project.startDate) : undefined,
        endDate: project.endDate ? new Date(project.endDate) : undefined,
        // userId: project.user.id
      } as IUpdateProject);
    }
}
