import { Project } from 'src/app/models/Project';
import { of, BehaviorSubject, Observable } from "rxjs";

/**
* A Mock of the ProjectService
* @author - Mike James 1906-Java
*/
export class MockProjectService {
     AllProjects$: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>(null);
     CurrentProject$: BehaviorSubject<Project> = new BehaviorSubject<Project>(null);
     CurrentProject: Project;
     screenShots$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(null);
     screenShots: string[];

     constructor() {
          this.CurrentProject = {
               name: 'Fake Project',
               batch: '3rd Batch Java',
               trainer: 'Nick',
               groupMembers: ['Mike', 'Molly', 'Sam'],
               techStack: 'Java',
               description: 'This is a fake project for testing',
               status: 'not pending',
               screenShots: ['src/assets/images/chinchilla2.jpg', 'src/assets/images/chinchilla2.jpg', 
               'src/assets/images/chinchilla2.jpg', 'src/assets/images/chinchilla2.jpg', 'src/assets/images/chinchilla2.jpg'],
               zipLinks: ['value'],
               id: '53w5049u3d58e'
          };

          this.CurrentProject$.next(this.CurrentProject);
          this.AllProjects$.next([this.CurrentProject]);
          this.screenShots = ['src/assets/images/chinchilla2.jpg', 'src/assets/images/chinchilla2.jpg',
           'src/assets/images/chinchilla2.jpg', 'src/assets/images/chinchilla2.jpg', 'src/assets/images/chinchilla2.jpg'];
          this.screenShots$.next(this.screenShots);
     }

     getProjectByField(field: string, value?: string) {
          return this.AllProjects$.asObservable();
     }

     getProjectByID(id: string) {
          return this.CurrentProject$.asObservable();
     }

     getAllProjects(): Observable<Project[]> {
          return this.AllProjects$.asObservable();
     }

     getAllApprovedProjects(): Observable<Project[]> {
          return this.AllProjects$.asObservable();
     }

     submitEditRequest(project: Project): Observable<Project> {
          return this.CurrentProject$.asObservable();
     }

     updateProject(project: Project, id: Number): Observable<Project> {
          return this.CurrentProject$.asObservable();
     }

     generateUrls(id): Observable<Object>{
          return this.screenShots$.asObservable();
     }
}
