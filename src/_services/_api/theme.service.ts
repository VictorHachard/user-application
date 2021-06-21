import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {UserSecurity} from "../../_models/user.security";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Theme} from "../../_models/theme";

@Injectable({ providedIn: 'root' })
export class ThemeService {
  constructor(private http: HttpClient) { }

  count(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/theme/count`);
  }

  getAllDto(): Observable<Theme[]> {
    return this.http.get<Theme[]>(`${environment.apiUrl}/theme/dto`, {
    });
  }

}
