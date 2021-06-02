import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { Formation } from '../models/Formation';

import { User } from '../models/User';

import { ErrorHandlerService } from './error-handler.service';
@Injectable({
  providedIn: 'root',
})
export class FormationService {
  private url = 'http://localhost:3000/formations';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<Formation[]> {
    return this.http
      .get<Formation[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(
          this.errorHandlerService.handleError<Formation[]>('fetchAll', [])
        )
      );
  }

  createFormation(formData: Partial<Formation>): Observable<Formation> {
    return this.http
      .post<Formation>(
        this.url,
        {
          titre: formData.titre,
          lieu: formData.lieu,
          dateDeb: formData.dateDeb,
          dateFin: formData.dateFin,
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<Formation>('createFormation')
        )
      );
  }

  deleteFormation(formationId: Pick<Formation, 'id'>): Observable<{}> {
    return this.http
      .delete<Formation>(`${this.url}/${formationId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<Formation>('deleteFormation')
        )
      );
  }
}
