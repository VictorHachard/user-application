import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HtmlTextHistory} from "../../_models/html.text.history";

@Injectable({ providedIn: 'root' })
export class HtmlTextHistoryService {
  constructor(private http: HttpClient) { }

  count(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/html-text-history/count`);
  }

  getAllDto(searchBy = 'null', searchValue = 'null'): Observable<HtmlTextHistory[]> {
    return this.http.get<HtmlTextHistory[]>(`${environment.apiUrl}/html-text-history/dto`, {
      params: new HttpParams()
      .set('searchBy', searchBy)
      .set('searchValue', searchValue)
    });
  }

  add(b: {htmlContent: string}, id: number) {
    return this.http.post(`${environment.apiUrl}html-text-history/add/${id}`, b);
  }

}
