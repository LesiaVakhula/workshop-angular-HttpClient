import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Task } from './../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskPromiseService {
  private tasksUrl = 'http://localhost:3000/tasks';

  constructor(
    private http: HttpClient
  ) {}

  getTasks(): Promise<Task[]> {
    return this.http
      .get(this.tasksUrl)
            .toPromise()
            .then( response => <Task[]>response)
            .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getTask(id: number): Promise<Task> {
    const url = `${this.tasksUrl}/${id}`;

    return this.http
      .get(url)
      .toPromise()
      .then(response => <Task>response)
      .catch(this.handleError);
  }

  updateTask(task: Task): Promise<Task> {
    const url = `${this.tasksUrl}/${task.id}`,
      body = JSON.stringify(task),
      options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };

    return this.http
      .put(url, body, options)
      .toPromise()
      .then(response => <Task>response)
      .catch(this.handleError);
  }

  createTask(task: Task): Promise<Task> {
    const url = this.tasksUrl,
      body = JSON.stringify(task),
      options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

    return this.http
      .post(url, body, options)
      .toPromise()
      .then(response => <Task>response)
      .catch(this.handleError);
  }

  deleteTask(task: Task): Promise<Task> {
    const url = `${this.tasksUrl}/${task.id}`;

    return (
      this.http
        .delete(url)
        .toPromise()
        // json-server return empty object
        // so we don't use .then(...)
        .catch(this.handleError)
    );
  }

}
