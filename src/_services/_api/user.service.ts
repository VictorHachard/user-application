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

}
