import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';

/**
 * TokenInterceptor
 * Http Interceptor that attaches jwt tokens to request to the microservice projected api
 * implements one functions intercept used in the app.module.ts as a provider.
 *
 * In addition this interceptor is responsible for checking and replacing rpmRefresh tokens
 * which have an expiration of 6 hours from the time of the last successful transaction.
 *
 * It only has one method which is provider by HttpInterceptor that reacts when an Http
 * requests are sent out. Attaching JWTs before they go out in an effort to provide
 * authentication and other details to the back end.
 * @author Andrew Mitchem
 * @author Ian Baker
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router, private url: LocationStrategy) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentTime = Math.round((new Date()).getTime() / 1000);

    if (localStorage.getItem('rpmRefresh') && currentTime < JSON.parse(localStorage.getItem('rpmRefresh')) && request.url.indexOf(environment.url) >= 0) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${window.localStorage.getItem('jwt')}`
        }
      });
      const newRefreshTime = currentTime + 21600000;
      localStorage.setItem('rpmRefresh', newRefreshTime + '');
      if (!localStorage.getItem('viewprojects')) localStorage.setItem('viewprojects', 'all');

    } else {
      localStorage.removeItem('jwt');
      localStorage.removeItem('rpmRefresh');
      localStorage.removeItem('user'); // Updated to 'user' from 'rpmUser' to match rest of project - MJ 1906
      this.userService.user.next(null);


    }

    return next.handle(request);
  }

}

