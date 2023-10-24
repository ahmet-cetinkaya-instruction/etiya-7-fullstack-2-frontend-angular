export interface PageResponse<TListItemDto> {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  items: TListItemDto[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
