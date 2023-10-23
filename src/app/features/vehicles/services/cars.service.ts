import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarListItemDto } from '../models/car-list-item-dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private readonly apiControllerUrl = `${environment.API_URL}/cars`;

  // private httpClient: HttpClient;
  constructor(private httpClient: HttpClient) {}

  getList(
    //TODO: Gerçek projede yer alan bir GetCarListRequest model almalıdır.
  ): Observable<CarListItemDto[]> { //TODO: Gerçek projede yer alan bir GetCarListResponse model döndürmelidir.
    return this.httpClient.get<CarListItemDto[]>(this.apiControllerUrl);
  }
}
