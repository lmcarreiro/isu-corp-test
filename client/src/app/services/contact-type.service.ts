import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ContactTypeModel } from '../models/contact-type.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ContactTypeService extends BaseService {
  constructor(http: HttpClient) {
    super('ContactType', http);
  }

  getContactTypes(): Observable<ContactTypeModel[]> {
    return this.http.get<ContactTypeModel[]>(this.baseUrl).pipe(
      tap(_ => console.log('fetched contact types')),
      catchError(this.handleError<ContactTypeModel[]>('getContactTypes', []))
    );
  }
}
