import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Theme} from "../../_models/theme";

@Injectable({ providedIn: 'root' })
export class ThemeService {
  constructor(private http: HttpClient) { }

  count(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}theme/count`);
  }

  getAllDto(): Observable<Theme[]> {
    return this.http.get<Theme[]>(`${environment.apiUrl}theme/dto`);
  }

  getAllActiveDto(): Observable<Theme[]> {
    return this.http.get<Theme[]>(`${environment.apiUrl}theme/dto/active`);
  }

  addTheme(b: {name: string,
               primaryColor: string,
               secondaryColor: string,
               tertiaryColor: string,
               quaternaryColor: string,
               primaryTextColor: string,
               secondaryTextColor: string}) {
    return this.http.post(`${environment.apiUrl}theme/create`, b);
  }

  updateTheme(id: number, b: {name: string,
                              primaryColor: string,
                              secondaryColor: string,
                              tertiaryColor: string,
                              quaternaryColor: string,
                              primaryTextColor: string,
                              secondaryTextColor: string}) {
    return this.http.post(`${environment.apiUrl}theme/update`, b);
  }

  updateThemeActive(id: number, b: {active: boolean}): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}theme/update/active/${id}`, b);
  }
}
