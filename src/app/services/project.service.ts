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
* Service that communicates with the project controller at /project
* @author unknown
*/
export class ProjectService {
 
 //BehaviorSubjects are able to be casted as observables in different components and subscribed to.
 //(You're able to make changes in one place and see those changes immediately in multiple other places)
 AllProjects$: BehaviorSubject<Project[]>;
 CurrentProject$: BehaviorSubject<Project>;
 
 CurrentProject: Project; //this is an outdated variable
 
 constructor(private httpClient: HttpClient) {
   this.CurrentProject$ = new BehaviorSubject<Project>(null);
   this.AllProjects$ = new BehaviorSubject<Project[]>(null);
 }
 
 /**
  * CRUD functions sending out requests using the HttpClient module and casting the response as an observable
  * @author unknown
  */
 getAllProjects(): Observable<Project[]> {
   return this.httpClient.get<Project[]>(environment.url + '/project/', HTTP_OPTIONS);
 }
 
 getAllApprovedProjects(): Observable<Project[]> {
   return this.httpClient.get<Project[]>(environment.url + '/project/status/Approved', HTTP_OPTIONS);
 }
 
 getProjectById(id): Observable<Project> {
   return this.httpClient.get<Project>(environment.url + `/project/id/${id}`, HTTP_OPTIONS);
 }
 
 getProjectsByStatus(status: string): Observable<Project[]> {
   return this.httpClient.get<Project[]>(environment.url + `/project/status/${status}`, HTTP_OPTIONS);
 }
 
 updateProject(project: Project, id): Observable<Project> {
   return this.httpClient.put(environment.url + `/project/${id}`, project, HTTP_OPTIONS);
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
  */
 submitEditRequest(project: Project): Observable<Project> {
   return this.httpClient.post(environment.url + `/project/edit`, project, HTTP_OPTIONS);
 }
