import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from "../_services/authentication.service";
import {Router} from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        console.log('The API response with a 401 (UNAUTHORIZED) code. Logging out the user.');
        this.authenticationService.forceLogout();
        this.router.navigate(['/login']);
      } else if (err.status === 403) {
        console.log('The API response with a 403 (FORBIDDEN) code. Reloading the user.');
        this.authenticationService.reloadUser().subscribe(value => {});
        // this.router.navigate(['/home']);
      } else if (err.statusText == 'Unknown Error') {
        // auto logout if Unknown Error is returned from the api - It when the API is not responding
        console.log('The API response with a Unknown Error. Logging out the user.');
        this.authenticationService.forceLogout();
        this.router.navigate(['/login']);
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}
