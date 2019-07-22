import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, shareReplay, take } from "rxjs/operators";

import {
  TaskDetail,
  TaskService as TaskApiService,
  ICreateTask,
  CreateTask,
  CreateParentTask,
  ICreateParentTask,
  UpdateParentTask,
  UpdateTask,
  IUpdateParentTask,
  IUpdateTask
} from "projects/project-manager-api/proxy/project-manager-api.service";

import { Task } from "../models/task.model";
import { ParentTask } from "../models/parent-task.model";

@Injectable()
export class TaskService {

    constructor(private taskApiService: TaskApiService) {
    }

    getTasks(): Observable<Task[]> {
      return this.taskApiService.query().pipe(map(response => this.mapToTasks(response)), shareReplay());
    }

    getParentTasks(): Observable<ParentTask[]> {
      return this.getTasks().pipe(map(parentTasks => this.mapToParentTasks(parentTasks)), shareReplay());
    }

    get(id: number): Observable<Task> {
      return this.taskApiService.get(id).pipe(map(response => this.mapToTask(response)), shareReplay());
    }

    post(task: Task): Observable<any> {
      return this.taskApiService.post(this.getCreateTaskRequest(task));
    }

    updateTask(task: Task): Observable<any> {
      return this.taskApiService.put(task.id, this.getUpdateTaskRequest(task));
    }

    endTask(id: number): Observable<any> {
      return this.taskApiService.end(id);
    }

    private mapToTasks(response: TaskDetail[]): Task[] {
      if (!response) {
        return;
      }

      const tasks: Task[] = [];

      response.forEach(task => {
        tasks.push(this.getTask(task));
      });

      return tasks;
    }

    private mapToTask(response: TaskDetail): Task {
      if (!response) {
        return;
      }

      return this.getTask(response);
    }

    private mapToParentTasks(response: Task[]): ParentTask[] {
      if (!response) {
        return;
      }

      const parentTasks: ParentTask[] = [];

      response.forEach(parentTask => {
        parentTasks.push(new ParentTask(
          parentTask.id,
          parentTask.name,
        ));
      });

      return parentTasks;
    }

    private getTask(task: TaskDetail): Task {
      return new Task(
          task.id,
          task.name,
          task.project.id,
          task.project.name,
          task.isParent,
          task.parentTask ? task.parentTask.id : undefined,
          task.parentTask ? task.parentTask.name : undefined,
          task.priority,
          task.user ? task.user.id : undefined,
          task.user ? `${task.user.firstName} ${task.user.lastName}` : undefined,
          task.startDate ? new Date(task.startDate) : undefined,
          task.endDate ? new Date(task.endDate) : undefined,
          task.isComplete);
    }

    private getCreateTaskRequest(task: Task): CreateTask {

      let createParentTask: CreateParentTask;

      if (!task.isParent) {
        task.isParent = false;
      }

      if (!task.isParent && task.parentTaskId) {
        createParentTask = new CreateParentTask({
          id: task.parentTaskId,
          name: task.parentTaskName
        } as ICreateParentTask);
      }

      return new CreateTask({
        name: task.name,
        parentTask: createParentTask,
        priority: task.priority,
        startDate: task.startDate,
        endDate: task.endDate,
        projectId: task.projectId,
        userId: task.userId,
        isParent: task.isParent
      } as ICreateTask);
    }

  private getUpdateTaskRequest(task: Task): UpdateTask {

    let updateParentTask: UpdateParentTask;

    if (!task.isParent) {
      task.isParent = false;
    }

    if (!task.isParent && task.parentTaskId) {
      updateParentTask = new UpdateParentTask({
        id: task.parentTaskId,
        name: task.parentTaskName
      } as IUpdateParentTask);
    }

    return new UpdateTask({
      id: task.id,
      name: task.name,
      parentTask: updateParentTask,
      priority: task.priority,
      startDate: task.startDate,
      endDate: task.endDate,
      projectId: task.projectId,
      userId: task.userId,
      isParent: task.isParent
    } as IUpdateTask);
  }
}
