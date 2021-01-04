import { Component, Input, OnInit } from '@angular/core';
import { PagedResultModel } from '../../models/paged-result.model';

export const PAGE_MARKER = ':page';

@Component({
  selector: 'util-paginator',
  template: `
    <div class="pager">
      <button
        class="btn-pager"
        [disabled]="results.pageNumber === 1"
        [routerLink]="getLink(results.pageNumber - 1)"
      >
        &lt;
      </button>
      <button
        class="btn-pager"
        *ngFor="let page of pages"
        [routerLink]="getLink(page)"
        [class.selected]="page === results.pageNumber"
      >
        {{ page }}
      </button>
      <button
        class="btn-pager"
        [disabled]="results.pageNumber === pages.length"
        [routerLink]="getLink(results.pageNumber + 1)"
      >
        &gt;
      </button>
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
  @Input() results!: PagedResultModel<any>;
  @Input() targetLink!: string;

  get pages(): number[] {
    if (this.results.pageSize === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.results.totalCount / this.results.pageSize);
    return [...Array(pageCount)].map((_, i) => i + 1);
  }

  constructor() {}

  ngOnInit(): void {
    if (!this.targetLink.includes(PAGE_MARKER)) {
      throw new Error(
        `PaginatorComponent.routerLink input property must have a '${PAGE_MARKER}' marker.`
      );
    }
  }

  getLink(page: number) {
    return this.targetLink.replace(PAGE_MARKER, page.toString());
  }
}
