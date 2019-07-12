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
    if (localStorage.getItem('jwt')) this.user = new BehaviorSubject<User>( (JSON.parse(localStorage.getItem('rpmUser'))) );
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

  // user.logout()... remove the session information from app and storage.
  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('rpmRefresh');
    localStorage.removeItem('rpmUser');
    this.user.next(null);
  }

  // only use environment.url for the base url and concat any restful endpoints
  // user.login(user). login the user and retrieve the jwt token from the header
  login(newuser: User): Observable<any> {
    return this.http.post(environment.url + '/auth/login', newuser, {observe: 'response'})
      .pipe(map(response => {
        if (response.headers.get('Authorization')) {
          this.user.next(response.body);
          let jwtauthtoken = response.headers.get('Authorization').split(' ')[1];

          localStorage.setItem('jwt', jwtauthtoken);
          localStorage.setItem('rpmRefresh', (Math.round((new Date()).getTime() / 1000) + 21600000) + '');
          localStorage.setItem('rpmUser', JSON.stringify(response.body));
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
   * Updates the user role to admin only if current the user is admin
   * the ' special' is parsed and bypasses the password needed in auth service
   * */
  updateUserToAdmin(user: User): Observable<User> {
    user.role = 'ROLE_ADMIN' + ' special';
    return this.http.put<User>(environment.url + '/auth/users/id/', user, httpOptions)
      .pipe(catchError(this.handleError));
  }


  /* Requests if email is in use
    Resource true if avail, false else
  */
  checkIfEmailIsInUse(email): Observable<string> {
    return this.http.get<string>(environment.url + '/auth/users/emailInUse/' + email)
      .pipe(catchError(this.handleError));
  }

  /* Requests if username if available
    Resource true if avail, false else
  */
  checkIfUsernameIsAvailable(username): Observable<string> {
    return this.http.get<string>(environment.url + '/auth/users/usernameAvailable/' + username)
      .pipe(catchError(this.handleError));
  }

}
