import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {}

  private headerData = new Subject<HeaderData>();
  headerData$ = this.headerData.asObservable();
  setHeaderData(headerData: HeaderData) {
    this.headerData.next(headerData);
  }
}

export interface HeaderData {
  title: string;
  description: string;
  navigationLabel: string;
  navigationTarget: string;
  navigationArrow?: 'left' | 'right';
}
