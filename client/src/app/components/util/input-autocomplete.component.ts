import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { icons } from 'src/config';

@Component({
  selector: 'util-input-autocomplete',
  template: `
    <div class="container" (click)="input.focus()">
      <div class="img"><img [src]="icons[icon]" /></div>
      <div class="input">
        <ng-autocomplete
          #input
          [ngModel]="value"
          (ngModelChange)="valueChange.emit($event[field] || $event)"
          [data]="data"
          [searchKeyword]="field"
          (selected)="selectEvent($event)"
          (inputChanged)="getServerResponse($event)"
          (inputCleared)="searchCleared()"
          [itemTemplate]="itemTemplate"
          [debounceTime]="300"
          [isLoading]="isLoadingResult"
          [minQueryLength]="2"
          [placeholder]="placeholder || ''"
        >
        </ng-autocomplete>
      </div>
    </div>

    <ng-template #itemTemplate let-item>
      <a [innerHTML]="item[field]"></a>
    </ng-template>
  `,
  styles: [
    `
      .container {
        display: flex;
        align-items: center;
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .container div.img {
        flex-basis: auto;
      }
      .container div.input {
        flex-grow: 1;
      }
      .container input {
        width: calc(100% - 10px);
        border: none;
        outline: none;
        font-size: 1em;
        font-family: inherit;
      }
    `,
  ],
})
export class InputAutocompleteComponent<T> implements OnInit {
  @Input() icon!: keyof typeof icons;
  @Input() field!: string;
  @Input() placeholder?: string;

  @Input() getDataCallback!: (name: string) => Observable<T[]>;

  @Input() value!: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  @Output() selectItem: EventEmitter<T> = new EventEmitter<T>();

  data: T[] = [];
  isLoadingResult: boolean = false;

  icons = icons;

  constructor() {}

  ngOnInit(): void {}

  getServerResponse(name: string) {
    this.isLoadingResult = true;

    this.getDataCallback(name).subscribe(data => {
      this.data = data;
      this.isLoadingResult = false;
    });
  }

  searchCleared() {
    this.data = [];
  }

  selectEvent(item: T) {
    this.selectItem.emit(item);
  }
}
