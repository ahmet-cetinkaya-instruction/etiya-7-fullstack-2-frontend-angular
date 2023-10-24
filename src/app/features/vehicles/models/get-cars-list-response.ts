import { PageResponse } from 'src/app/core/models/page-response';
import { CarListItemDto } from './car-list-item-dto';

export interface GetCarsListResponse extends PageResponse<CarListItemDto> {}
