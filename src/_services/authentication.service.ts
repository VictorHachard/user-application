import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {environment} from "../environments/environment";
import {UserSecurity} from "../_models/user.security";
import {Session} from "../_models/session";
import {ImageService} from "./_api/image.service";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  // User
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private imageUserSubject: BehaviorSubject<any>;
  public imageUser: Observable<any>;
  // Session
  private currentSessionSubject: BehaviorSubject<any>;
  private currentSession: Observable<any>;

  constructor(private http: HttpClient,
              private imageService: ImageService,
              private sanitizer: DomSanitizer) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(<any>localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentSessionSubject = new BehaviorSubject<any>(JSON.parse(<any>localStorage.getItem('currentSession')));
    this.currentSession = this.currentSessionSubject.asObservable();
    this.imageUserSubject = new BehaviorSubject<any>(JSON.parse(<any>localStorage.getItem('imageUser')));
    this.imageUser = this.imageUserSubject.asObservable();
  }

  public get currentUserValue(): UserSecurity {
    return this.currentUserSubject.value;
  }

  public get currentSessionValue(): Session {
    return this.currentSessionSubject.value;
  }

  updateUser() {
    return this.http.post<any>(`${environment.apiUrl}user/login/update`, {}).pipe(map(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      if (user.profileImage) {
        this.imageService.get(user.profileImage).subscribe(image => {
          image = this.sanitizer.bypassSecurityTrustUrl('data:image;base64,' + image.content);
          localStorage.setItem('imageUser', JSON.stringify(image));
          this.imageUserSubject.next(image);
        });
      }
      return user;
    }));
  }

  login(auth: string, rememberMe: boolean, code: string) {
    return this.http.post<any>(`${environment.apiUrl}user/login`, {auth: auth, rememberMe: rememberMe, code: code}).pipe(map(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      localStorage.setItem('currentSession', JSON.stringify(user.actualSessionDto))
      this.currentSessionSubject.next(user.actualSessionDto);
      return user;
    }));
  }

  register(username: string, email: string, password: string) {
    return this.http.post(`${environment.apiUrl}user/create`, {username: username, email: email, password: password});
  }

  logout() {
    return this.http.post(`${environment.apiUrl}user/logout`, {});
  }

  forceLogout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentSession');
    this.currentSessionSubject.next(null);
  }
}
