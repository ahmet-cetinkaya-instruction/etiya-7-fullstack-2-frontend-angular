import { PageRequest } from 'src/app/core/models/page-request';

export interface GetBrandListRequest extends PageRequest {
  searchByName?: string;
}
