import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {UserSecurity} from "../../_models/user.security";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  count(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}user/count`);
  }

  get(id: number): Observable<UserSecurity> {
    return this.http.get<UserSecurity>(`${environment.apiUrl}user/dto/${id}`);
  }

  getAll(pageIndex = 0, pageSize = 10, sortBy= 'id', orderBy = 'asc', searchBy = 'null', searchValue = 'null'): Observable<UserSecurity[]> {
    return this.http.get<UserSecurity[]>(`${environment.apiUrl}user/dto`, {
      params: new HttpParams()
        .set('pageIndex', pageIndex.toString())
        .set('pageSize', pageSize.toString())
        .set('sortBy', sortBy)
        .set('orderBy', orderBy)
        .set('searchBy', searchBy)
        .set('searchValue', searchValue)
    });
  }

  /**
   * This method is used to find user to ban for another user.
   * This is to avoid to return an dto object with to confidential data.
   */
  getAllBlockedUser(pageIndex = 0, pageSize = 10, sortBy= 'id', orderBy = 'asc', searchBy = 'null', searchValue = 'null'): Observable<UserSecurity[]> {
    return this.http.get<UserSecurity[]>(`${environment.apiUrl}user/dto/blocked-user`, {
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
    return this.http.get<any>(`${environment.apiUrl}user/dto/profile/${username}`);
  }

  addBlockedUser(id: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}user/add/blocked-user/${id}`, {});
  }

  removeBlockedUser(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}user/remove/blocked-user/${id}`);
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

  updateTwoFactorEmail(b: {active: boolean}): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}user/update/two-factor/email`, b);
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
