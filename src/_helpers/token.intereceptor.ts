import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../_services/authentication.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentSession = this.authenticationService.currentSessionValue;
    if (currentSession && currentSession.authToken) {
      request = request.clone({setHeaders: {Authorization: currentSession.authToken}});
    }
    return next.handle(request);
  }
}
