import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ContactTypeModel } from '../models/contact-type.model';
import { BaseService } from './base.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class ContactTypeService extends BaseService {
  constructor(http: HttpClient, messageService: MessageService) {
    super('ContactType', http, messageService);
  }

  getContactTypes(): Observable<ContactTypeModel[]> {
    return this.http.get<ContactTypeModel[]>(this.baseUrl).pipe(
      tap(_ => this.log('fetched contact types')),
      catchError(this.handleError<ContactTypeModel[]>('getContactTypes', []))
    );
  }
}
