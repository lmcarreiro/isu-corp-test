import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { icons } from './icons';

@Component({
  selector: 'util-input',
  template: `
    <div class="container" (click)="input.focus()">
      <div class="img"><img [src]="icons[icon]" /></div>
      <div class="input">
        <input #input [ngModel]="value" (ngModelChange)="valueChange.emit($event)" />
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
export class InputComponent implements OnInit {
  @Input() icon!: keyof typeof icons;

  @Input() value!: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  icons = icons;

  constructor() {}

  ngOnInit(): void {}
}
