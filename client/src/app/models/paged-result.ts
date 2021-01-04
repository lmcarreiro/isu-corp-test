export interface PagedResult<T> {
  pageSize: number;
  pageNumber: number;
  totalCount: number;
  pagedRecords: T[];
}

export const emptyPagedResult: PagedResult<any> = {
  pageSize: 0,
  pageNumber: 1,
  totalCount: 0,
  pagedRecords: [],
};
