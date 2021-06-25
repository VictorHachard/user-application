import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {UserSecurity} from "../../_models/user.security";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }



  count(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/user/count`);
  }

  get(id: number): Observable<UserSecurity> {
    return this.http.get<UserSecurity>(`${environment.apiUrl}/user/dto/${id}`);
  }

  getAll(pageIndex = 0, pageSize = 10, sortBy= 'id', orderBy = 'asc', searchBy = 'null', searchValue = 'null'): Observable<UserSecurity[]> {
    return this.http.get<UserSecurity[]>(`${environment.apiUrl}/user/dto`, {
      params: new HttpParams()
        .set('pageIndex', pageIndex.toString())
        .set('pageSize', pageSize.toString())
        .set('sortBy', sortBy)
        .set('orderBy', orderBy)
        .set('searchBy', searchBy)
        .set('searchValue', searchValue)
    });
  }

  getProfile(username: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}user/dto/profile/{username}`);
  }

  addEmail(b: {email: string}): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}user/add/email`, b);
  }

  deleteEmail(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}user/remove/email/${id}`);
  }

  updateEmailPreferences(b: {emailPreferences: string}): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}user/update/email-preferences`, b);
  }

  updateEmailBackup(id: number, b: {backup: boolean}): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}user/update/email/backup/${id}`, b);
  }

  updateEmailPriority(b: {email: string}): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}user/update/email/priority`, b);
  }

  updateProfilePrivacy(b: {profilePrivacy: string}): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}user/update/profile-privacy`, b);
  }

  updateUsername(b: {username: string}): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}user/update/username`, b);
  }

  updateProfile(b: {firstName: string, middleName: string, lastName: string, biography: string, url: string, profileImage: string}): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}user/update/profile`, b);
  }

  updateAppearance(id: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}user/update/appearance/${id}`, {});
  }

  actionConfirm(token: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}user/action/confirm/email`, token);
  }

  actionConfirmResendEmail(id: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}user/action/confirm/resend/email/${id}`, {});
  }

  actionSetPassword(b: {oldPassword: string, newPassword: string}): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}user/action/set/password`, b);
  }

  actionResetPassword(b: {token: string, password: string}): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}user/action/reset/password`, b);
  }

  actionForgetPassword(username: string) {
    return this.http.post(`${environment.apiUrl}user/action/forget/password`, username);
  }

}
