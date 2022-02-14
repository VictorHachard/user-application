import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AddressService {

  url: string = 'address/';

  constructor(private http: HttpClient) { }

  create(b: {alias: string, name: string, building: string, street: string, postcode: string, country: string}) {
    return this.http.post(`${environment.apiUrl}${this.url}create`, b);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}${this.url}${id}`,);
  }

}
