import { Component, Input, OnInit } from '@angular/core';

const icons = {
  sorting: '../../assets/icon-sorting.jpg',
};

@Component({
  selector: 'util-dropdown',
  template: `
    <ng-select
      [items]="options"
      [searchable]="false"
      [clearable]="false"
      bindLabel="name"
      bindValue="id"
      [(ngModel)]="default"
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
  @Input('default')
  default!: string;

  @Input('options')
  options!: { id: string; name: string }[];

  @Input('icon')
  icon!: keyof typeof icons;

  icons = icons;

  // TODO: add event for changing the sorting option

  constructor() {}

  ngOnInit(): void {}
}
