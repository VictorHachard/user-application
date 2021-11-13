import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Theme} from "../../_models/theme";
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class SettingService {

  constructor(private http: HttpClient) { }

  getAllActiveDto(): Observable<Theme[]> {
    return this.http.get<Theme[]>(`${environment.apiUrl}setting/dto/active`);
  }

  updateThemeActive(id: number, b: {active: boolean}): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}setting/update/active/${id}`, b);
  }

}
