import { BrandListItemDto } from './brand-list-item-dto';

export interface ModelListItemDto {
  id: number;
  name: string;
  brandId: number;
  brand: BrandListItemDto;
}
