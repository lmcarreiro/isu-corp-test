import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { icons } from './icons';

@Component({
  selector: 'util-dropdown',
  template: `
    <ng-select
      [items]="getOptions()"
      [searchable]="false"
      [clearable]="false"
      bindLabel="name"
      bindValue="id"
      [ngModel]="selected"
      (ngModelChange)="selectedChange.emit($event)"
      class="custom"
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

  @Input() allowEmpty: boolean = false;

  icons = icons;

  constructor() {}

  ngOnInit(): void {}

  lastOptions: { id: string; name: string }[] = [];
  lastReturnedOptions: { id: string; name: string }[] = [];
  getOptions() {
    if (this.options !== this.lastOptions) {
      this.lastOptions = this.options;
      this.lastReturnedOptions = this.allowEmpty
        ? [{ id: '', name: '' }, ...this.options]
        : this.options;
    }

    return this.lastReturnedOptions;
  }
}
