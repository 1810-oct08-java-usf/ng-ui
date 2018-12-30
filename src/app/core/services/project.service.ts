import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Project } from '../models/Project';
import { environment } from 'src/environments/environment.prod';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  CurrentProject: Project;
  /**
   * This is the project specific url, this allows for easy changing of the URI when needed.
   * @author Sean Doyle (1810-Oct22-Java-USF)
   */
  _url: string = environment.url + '/project/';

  constructor(private httpClient: HttpClient) { }

  getAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this._url, HTTP_OPTIONS);
  }

  getProjectById(id): Observable<Project> {
    return this.httpClient.get<Project>(this._url + `id/${id}`, HTTP_OPTIONS);
  }

  updateProject(project: Project, id): Observable<Project> {
    return this.httpClient.put(this._url + `${id}`, project, HTTP_OPTIONS);
  }

  /*
   *  TODO project-service needs to get rid of the trailing slash
   */
  createProject(formData: FormData): Observable<Project> {
    return this.httpClient.post(this._url, formData);
  }

  setCurrentProject(project: Project) {
    this.CurrentProject = project;
  }

  deleteProjectById(id): Observable<any> {
    return this.httpClient.delete<any>(this._url + `id/${id}`);
  }
}
