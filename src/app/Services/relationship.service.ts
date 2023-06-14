import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Relationship } from '../Models/relationship';
import { Observable } from 'rxjs';
import { RelationshipRequest } from '../Models/RelationshipRequest';

const httpOptions = {
  headers: new HttpHeaders({
    ContenType: 'application/json',

  }),
};

@Injectable({
  providedIn: 'root',
})
export class RelationshipService {
  url = 'https://localhost:7108/api/Relationship';
  //url = 'https://easy-invoices.azurewebsites.net/api/Relationship';

  constructor(private http: HttpClient) {}

  GetAll(): Observable<Relationship[]> {
    return this.http.get<Relationship[]>(this.url);
  }

  GetById(id: number): Observable<Relationship> {
    const apiUrl = `${this.url}/${id}`;
    return this.http.get<Relationship>(apiUrl);
  }

  Post(relationship: RelationshipRequest): Observable<any> {
    return this.http.post<RelationshipRequest>(this.url, relationship, httpOptions);
  }

  Put(relationship: RelationshipRequest): Observable<any> {
    const apiUrl = `${this.url}/${relationship.id}`;
    return this.http.put<RelationshipRequest>(apiUrl, relationship, httpOptions);
  }

  Delete(id: number): Observable<any> {
    const apiUrl = `${this.url}/${id}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
