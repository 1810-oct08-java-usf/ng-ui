import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {User} from '../models/User';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: BehaviorSubject<User>;


  constructor(private http: HttpClient) {
    if (localStorage.getItem('jwt')) this.user = new BehaviorSubject<User>( (JSON.parse(localStorage.getItem('user'))) );
    else this.user = new BehaviorSubject<User>( null );
  }



  getCurrentUser(): User {
    return this.user.value;
  }

  // TODO clean this up
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Aw, Snap!\n' + error.error.message);
    } else {
      console.error(
        `Error code ${error.status}:
        ${error.error}`
      );
    }

    return throwError('Something went wrong; please try again later.');
  }

  // user.logout()... removes the session information from app and storage.
  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('rpmRefresh');
    localStorage.removeItem('user'); // updated to 'user' from 'rpmUser' to match rest of project - MJ 1906
    this.user.next(null);
  }

  // only use environment.url for the base url and concat any restful endpoints
  // user.login(user). logs in the user and retrieves the jwt token from the header
  login(newuser: User): Observable<any> {
    return this.http.post(environment.url + '/auth/login', newuser, {observe: 'response'})
      .pipe(map(response => {
        if (response.headers.get('Authorization')) {
          this.user.next(response.body);
          let jwtauthtoken = response.headers.get('Authorization').split(' ')[1];

          localStorage.setItem('jwt', jwtauthtoken);
          localStorage.setItem('rpmRefresh', (Math.round((new Date()).getTime() / 1000) + 21600000) + '');
          localStorage.setItem('user', JSON.stringify(response.body));
          localStorage.setItem('viewprojects', 'all');
          return response.body;
        } else {
          return null; // this should throw error
        }
      }), catchError(this.handleError));
  }

  /*
  * Register a new user
  */
  register(user: User): Observable<User> {
    user.role = 'user';
    return this.http.post<User>(environment.url + '/auth/users/', user, httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get all users from the database
   * @author Michael Grammens (1810-Oct22-Java-USF)
   */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.url + '/auth/users/', httpOptions)
      .pipe(catchError(this.handleError));
  }
  /*
  * Updates the user profile
  */
  updateProfile(user: User): Observable<User> {
    return this.http.put<User>(environment.url + '/auth/users/', user, httpOptions)
      .pipe(catchError(this.handleError));
  }


  /**
   * @author Clement Dikoko
   * @author Vanessa Fountain
   * Changed function name from updateToAdmin to updateUserRoles,
   * every reference to updateToAdmin should be changed in order
   * to reflect the change in functionality. Due to time constraints
   * we were not able to change every reference. The next one is located
   * in the file all-users-page.component.ts
   * @author Tevin Thomas
   * @author Aisha Hodge
   * @author Toyin Fadiran
   * @author Glory Umeasalugo
   * */
  updateUserRoles(user: User): Observable<User> {
    console.log('before if else:');
    console.log(user);
    if (user.role === 'admin') {
    user.role = 'ROLE_ADMIN';
    console.log('inside if for admin:' + 'User role is Admin');
    console.log(user);
    } else {
      user.role = 'ROLE_USER';
      console.log('else, user was user:, User role is User');
      console.log(user);
    }
   return this.http.put<User>(environment.url + '/auth/users/id/', user, httpOptions)
      .pipe(catchError(this.handleError));
  }


  /* Requests if email is in use
    Resource true if avail, else false
  */
  checkIfEmailIsInUse(email): Observable<string> {
    return this.http.get<string>(environment.url + '/auth/users/emailInUse/' + email)
      .pipe(catchError(this.handleError));
  }

  /* Requests if username is available
    Resource true if avail, else false
  */
  checkIfUsernameIsAvailable(username): Observable<string> {
    return this.http.get<string>(environment.url + '/auth/users/usernameAvailable/' + username)
      .pipe(catchError(this.handleError));
  }

}
