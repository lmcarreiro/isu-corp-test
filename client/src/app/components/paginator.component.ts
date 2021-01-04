import { Component, Input, OnInit } from '@angular/core';
import { PagedResult } from '../models/paged-result';

@Component({
  selector: 'util-paginator',
  template: `
    <div class="pager">
      <button class="btn-pager">&lt;</button>
      <button
        *ngFor="let page of pages"
        class="btn-pager"
        [class.selected]="page === results.pageNumber"
      >
        {{ page }}
      </button>
      <button class="btn-pager">&gt;</button>
    </div>
  `,
  styles: [
    `
      .btn-pager {
        margin: 0px 1px;
        border: 1px solid grey;
        border-radius: 3px;
        outline: none;
        cursor: pointer;
      }
      .btn-pager.selected {
        color: white;
        background-color: grey;
      }
    `,
  ],
})
export class PaginatorComponent implements OnInit {
  @Input() results!: PagedResult<any>;

  get pages(): number[] {
    const pageCount = Math.ceil(this.results.totalCount / this.results.pageSize);
    return [...Array(pageCount)].map((_, i) => i + 1);
  }

  constructor() {}

  ngOnInit(): void {}
}
