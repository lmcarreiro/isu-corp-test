import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ContactModel } from '../models/contact.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService extends BaseService {
  constructor(http: HttpClient) {
    super('Contact', http);
  }

  getContactsByName(name: string): Observable<ContactModel[]> {
    return this.http.get<ContactModel[]>(`${this.baseUrl}?name=${encodeURIComponent(name)}`).pipe(
      tap(_ => console.log('fetched contacts')),
      catchError(this.handleError<ContactModel[]>('getContactsByName', []))
    );
  }
}
