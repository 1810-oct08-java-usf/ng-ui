import { User } from "src/app/models/User";
import { of, BehaviorSubject, Observable } from "rxjs";
import { OnInit } from "@angular/core";

/**
 * A Mock of the UserService
 *
 *
 */
export class MockUserService {
  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  $userObservable: Observable<User>;
  u: User;
  test: any;
  url: string;

  constructor() {
    this.u = {
      email: "bobWhite@email.com",
      firstName: "Bob",
      lastName: "White",
      password: "password",
      role: "user",
      username: "bobWhite",
      id: 1234
    };
    this.user.next(this.u);
    this.test = true;
    this.$userObservable = of(this.u);
    this.url = "http://www.google.com/NotAUsefulAnswer";
  }

  getCurrentUser(): User {
    return this.u;
  }

  login(newuser: User): Observable<any> {
    return of(this.test);
  }

  logout(): void {}

  register(newuser: User): Observable<User> {
    return this.user.asObservable();
  }

  getAllUsers(): Observable<User> {
    return this.user.asObservable();
  }

  updateProfile(user: User): Observable<User> {
    return this.user.asObservable();
  }

  updateUserToAdmin(user: User): Observable<User> {
    return this.user.asObservable();
  }

  updateUserRoles(user: User): Observable<User> {
    return this.user.asObservable();
  }

  checkIfEmailIsInUse(email): Observable<string> {
    return of(this.url);
  }

  checkIfUsernameIsAvailable(username): Observable<string> {
    return of(this.url);
  }
}
