import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Provider } from '../Models/provider';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    ContenType: 'application/json',

  }),
};

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  url = 'https://localhost:7108/api/Provider';

  constructor(private http: HttpClient) {}

  GetAll(): Observable<Provider[]> {
    return this.http.get<Provider[]>(this.url);
  }

  GetById(id: number): Observable<Provider> {
    const apiUrl = `${this.url}/${id}`;
    return this.http.get<Provider>(apiUrl);
  }

  GetByName(name: string): Observable<Provider> {
    const apiUrl = `${this.url}/name?name=${name}`;
    return this.http.get<Provider>(apiUrl);
  }

  Post(provider: Provider): Observable<any> {
    return this.http.post<Provider>(this.url, provider, httpOptions);
  }

  Put(provider: Provider): Observable<any> {
    const apiUrl = `${this.url}/${provider.id}`;
    return this.http.put<Provider>(apiUrl, provider, httpOptions);
  }

  Delete(id: number): Observable<any> {
    const apiUrl = `${this.url}/${id}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
}

