import { ModelListItemDto } from './model-list-item-dto';

export interface CarListItemDto {
  id: number;
  plate: string;
  dailyPrice: number;
  imageUrl: string;
  modelYear: number;
  state: number;
  modelId: number;
  model: ModelListItemDto;
}
