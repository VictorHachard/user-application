import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {SecurityLog} from "../../_models/security.log";

@Injectable({ providedIn: 'root' })
export class SecurityLogService {
  constructor(private http: HttpClient) { }

  count(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/security-log/count`);
  }

  getAllDto(pageIndex = 0, pageSize = 10): Observable<SecurityLog[]> {
    return this.http.get<SecurityLog[]>(`${environment.apiUrl}/user/dto/security-log`, {
      params: new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString())
    });
  }

}
