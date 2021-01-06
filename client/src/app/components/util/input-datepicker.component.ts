import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { icons } from './icons';

@Component({
  selector: 'util-input-datepicker',
  template: `
    <div class="container">
      <div class="img"><img [src]="icon" /></div>
      <div class="input">
        <dp-date-picker
          #input
          [ngModel]="value"
          (ngModelChange)="valueChange.emit($event)"
          [config]="{
            format: 'YYYY-MM-DD'
          }"
          [placeholder]="placeholder"
        ></dp-date-picker>
      </div>
    </div>
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
export class InputDatepickerComponent implements OnInit {
  @Input() placeholder: string = '';

  @Input() value!: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  icon = icons.calendar;
  datePickerConfig = {};

  constructor() {}

  ngOnInit(): void {}
}
