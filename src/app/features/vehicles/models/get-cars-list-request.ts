import { PageRequest } from '../../../core/models/page-request';

export interface GetCarsListRequest extends PageRequest {
  filterByBrandId?: number;
}
