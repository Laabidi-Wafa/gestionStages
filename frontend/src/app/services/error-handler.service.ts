import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
//catch errors
export class ErrorHandlerService {
  handleError<T>(operation = 'operation', result?: T) {
    //anyType , some certain operation , result ex array or observable
    return (error: any): Observable<T> => {
      //anyType of error we are expecting an observable of that type
      console.log(`${operation} failed: ${error.message}`); //the operation that failed
      return of(result as T); //return an observable of the result
    };
  }
}
