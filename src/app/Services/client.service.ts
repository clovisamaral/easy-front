import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../Models/client';

const httpOptions = {
  headers: new HttpHeaders({
    ContenType: 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  url = 'https://localhost:7108/api/Client';
  //url = 'https://easy-invoices.azurewebsites.net/api/Client';

  constructor(private http: HttpClient) {}

  GetAll(all:boolean): Observable<Client[]> {
    const apiUrl = `${this.url}?all=${all}`;
    return this.http.get<Client[]>(apiUrl);
  }

  GetById(id: number): Observable<Client> {
    const apiUrl = `${this.url}/${id}`;
    return this.http.get<Client>(apiUrl);
  }

  GetByName(name: string): Observable<Client> {
    const apiUrl = `${this.url}/name?name=${name}`;
    return this.http.get<Client>(apiUrl);
  }

  Post(client: Client): Observable<any> {
    return this.http.post<Client>(this.url, client, httpOptions);
  }

  Put(client: Client): Observable<any> {
    const apiUrl = `${this.url}/${client.id}`;
    return this.http.put<Client>(apiUrl, client, httpOptions);
  }

  Delete(id: number): Observable<any> {
    const apiUrl = `${this.url}/${id}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
