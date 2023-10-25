import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarListItemDto } from '../models/car-list-item-dto';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetCarsListRequest } from '../models/get-cars-list-request';
import { GetCarsListResponse } from '../models/get-cars-list-response';

@Injectable() // Singeton olarak kullanılacağı için root modülüne inject ediyoruz.
/*
{
  providedIn: 'root',
}
Parametersını kaldırdığımızda ilgili modülde providers'a eklememiz gerekiyor.
*/
export class CarsMockService {
  private readonly apiControllerUrl = `${environment.API_URL}/cars`;

  // private httpClient: HttpClient;
  constructor(private httpClient: HttpClient) {}

  getList(request: GetCarsListRequest): Observable<GetCarsListResponse> {
    const subject = new Subject<GetCarsListResponse>();

    const params = {
      _page: request.pageIndex + 1,
      _limit: request.pageSize,
    };

    this.httpClient
      .get<CarListItemDto[]>(this.apiControllerUrl, {
        params, // params: params ile aynı görevi görür, JS içerisindeki kısa yazım şeklidir.
      }) // Observable çalışması için bir subcriber'ı olması gerekiyor.
      .subscribe({
        next: (response) => {
          const responseModel: GetCarsListResponse = {
            pageIndex: request.pageIndex,
            pageSize: request.pageSize,
            totalCount: 16,
            items: response,
            hasNextPage: true,
            hasPreviousPage: request.pageIndex === 0 ? false : true,
          }; // Response'u oluşturmak için sahte bir response modeli oluşturuyoruz.

          subject.next(responseModel); // Response'u subject'e gönderiyoruz.
        },
        error: (error) => {
          subject.error(error);
        },
        complete: () => {
          subject.complete();
        },
      });

    return subject.asObservable();
  }
}
