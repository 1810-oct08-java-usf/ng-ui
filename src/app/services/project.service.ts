import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
 
import {Project} from '../models/Project';
import {environment} from 'src/environments/environment';
 
const HTTP_OPTIONS = {
 headers: new HttpHeaders({
   'Content-type': 'application/json'
 })
};
 
@Injectable({
 providedIn: 'root'
})
 
/**
* Service that communicates with the project controller at '/project'
* @author unknown
*/
export class ProjectService {
	
 
 //BehaviorSubjects are able to be casted as observables in different components and subscribed to.
 //(You're able to make changes in one place and see those changes immediately in multiple other places)
 AllProjects$: BehaviorSubject<Project[]>;
 CurrentProject$: BehaviorSubject<Project>;
 
 constructor(private httpClient: HttpClient) {
   this.CurrentProject$ = new BehaviorSubject<Project>(null);
   this.AllProjects$ = new BehaviorSubject<Project[]>(null);
 }
 
 /**
  * Get projects from project service API
  * Fields can be: status, name, trainer, techStack, batch, userId, all
  */
  getProjectByField(field: string, value?: string) {
    let queryUrl = '/project/q?field=' + field + '&value=';
    if(value) queryUrl += value;
    return this.httpClient.get<Project[]>(environment.url + queryUrl, HTTP_OPTIONS);
  }
  getProjectByID(id:string) {
    let queryUrl = '/project/id/' + id;
    return this.httpClient.get<Project[]>(environment.url + queryUrl, HTTP_OPTIONS);
  }
 
  updateProject(project: Project, id): Observable<Project> {
    console.log(project, id);
    return this.httpClient.put(environment.url + `/project`, project, HTTP_OPTIONS);
  }
  
  createProject(project: FormData): Observable<Project> {
    return this.httpClient.post(environment.url + '/project/', project);
  }
  
  deleteProjectById(id): Observable<any> {
    return this.httpClient.delete<any>(environment.url + `/project/id/${id}`);
  }
  
  /**
    * The submitEditRequest method is used to submit a changed version of a project that
    * a user would like to update.
    * @param project
    * @author Mikaela Enters
    * @author Tevin Thomas
    */
  submitEditRequest(project: Project): Observable<Project> {
    return this.httpClient.put(environment.url + `/project/edit`, project, HTTP_OPTIONS);
  }


  approveOrDenyProject(project: Project): Observable<Project> {
    return this.httpClient.put(environment.url + `/project`, project, HTTP_OPTIONS);
  }

  generateUrls(id): Observable<string[]> {
		return this.httpClient.get<string[]>(environment.url + `/project/${id}/screenshots`, HTTP_OPTIONS);
	}

}