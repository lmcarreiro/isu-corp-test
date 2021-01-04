import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';

export abstract class BaseService {
  protected baseUrl: string;

  protected httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private controllerName: string,
    protected http: HttpClient,
    private messageService: MessageService
  ) {
    this.baseUrl = `${environment.baseUrl}/${this.controllerName}`;
  }

  /** Log a ReservationService message with the MessageService */
  protected log(message: string) {
    this.messageService.add(`${this.controllerName}: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
