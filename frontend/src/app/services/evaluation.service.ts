import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { Evaluation } from '../models/Evaluation';

import { User } from '../models/User';

import { ErrorHandlerService } from './error-handler.service';
@Injectable({
  providedIn: 'root',
})
export class EvaluationService {
  private url = 'http://localhost:3000/evaluation';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<Evaluation[]> {
    return this.http
      .get<Evaluation[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(
          this.errorHandlerService.handleError<Evaluation[]>('fetchAll', [])
        )
      );
  }

  createEvaluation(formData: Partial<Evaluation>): Observable<Evaluation> {
    return this.http
      .post<Evaluation>(
        this.url,
        {
          objectif: formData.objectif,
          note: formData.note,
          enligne: formData.enligne,
          fonctionnalite: formData.fonctionnalite,
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<Evaluation>('createEvaluation')
        )
      );
  }

  deleteEvaluation(evaluationId: Pick<Evaluation, 'id'>): Observable<{}> {
    return this.http
      .delete<Evaluation>(`${this.url}/${evaluationId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<Evaluation>('deleteEvaluation')
        )
      );
  }
}
