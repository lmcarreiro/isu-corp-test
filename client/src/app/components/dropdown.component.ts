import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { icons } from '../config';

@Component({
  selector: 'util-dropdown',
  template: `
    <ng-select
      [items]="options"
      [searchable]="false"
      [clearable]="false"
      bindLabel="name"
      bindValue="id"
      [ngModel]="selected"
      (ngModelChange)="selectedChange.emit($event)"
    >
      <ng-template ng-label-tmp let-item="item">
        <div style="display: flex; align-items: center;">
          <img [src]="icons[icon]" />
          <span>{{ item.name }}</span>
        </div>
      </ng-template>
    </ng-select>
  `,
  styles: [],
})
export class DropdownComponent implements OnInit {
  @Input() options!: { id: string; name: string }[];

  @Input() icon!: keyof typeof icons;

  @Input() selected!: string;
  @Output() selectedChange: EventEmitter<string> = new EventEmitter<string>();

  icons = icons;

  constructor() {}

  ngOnInit(): void {}
}
