import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Group} from "../../_models/group";
import {Country} from "../../_models/country";

@Injectable({ providedIn: 'root' })
export class CountryService {

  url: string = 'country/';

  constructor(private http: HttpClient) { }

  create(b: {alias: string, name: string, building: string, street: string, postcode: string}) {
    return this.http.post(`${environment.apiUrl}${this.url}create`, b);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}${this.url}${id}`,);
  }

  getAllActiveDto(searchValue = 'null', sortBy= 'id', searchBy = 'null'): Observable<Country[]> {
    return this.http.get<Country[]>(`${environment.apiUrl}${this.url}dto/active`, {
      params: new HttpParams()
        .set('sortBy', sortBy)
        .set('searchBy', searchBy)
        .set('searchValue', searchValue)
    });
  }
}
