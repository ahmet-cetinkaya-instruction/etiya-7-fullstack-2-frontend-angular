import { PageResponse } from 'src/app/core/models/page-response';
import { BrandListItemDto } from './brand-list-item-dto';

export interface GetBrandListResponse extends PageResponse<BrandListItemDto> {}
