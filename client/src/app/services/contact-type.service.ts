import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ContactType } from '../models/contact-type';
import { BaseService } from './base.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class ContactTypeService extends BaseService {
  constructor(http: HttpClient, messageService: MessageService) {
    super('ContactType', http, messageService);
  }

  getContactTypes(): Observable<ContactType[]> {
    // TODO: send the message _after_ fetching the reservations
    return this.http.get<ContactType[]>(this.baseUrl).pipe(
      tap(_ => this.log('fetched reservations')),
      catchError(this.handleError<ContactType[]>('getContactTypes', []))
    );
  }
}
