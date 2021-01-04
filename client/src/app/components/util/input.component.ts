import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { icons } from './icons';

@Component({
  selector: 'util-input',
  template: `
    <div class="container" (click)="input.focus()">
      <img [src]="icons[icon]" />
      <input #input [ngModel]="value" (ngModelChange)="valueChange.emit($event)" />
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        align-items: center;
        background-color: white;
        border: 1px solid #ccc;
      }
      .container input {
        flex: 1;
        border: none;
        outline: none;
      }
    `,
  ],
})
export class InputComponent implements OnInit {
  @Input() icon!: keyof typeof icons;

  @Input() value!: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  icons = icons;

  constructor() {}

  ngOnInit(): void {}
}
