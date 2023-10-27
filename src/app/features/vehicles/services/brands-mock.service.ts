import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetBrandListRequest } from '../models/get-brand-list-request';
import { GetBrandListResponse } from '../models/get-brand-list-response';
import { BrandListItemDto } from '../models/brand-list-item-dto';
import { HttpClient } from '@angular/common/http';
import { AddBrandRequest } from '../models/add-brand-request';
import { AddBrandResponse } from '../models/add-brand-response';
import { UpdateBrandRequest } from '../models/update-brand-request';
import { UpdateBrandResponse } from '../models/update-brand-response';
import { DeleteBrandRequest } from '../models/delete-brand-request';
import { DeleteBrandResponse } from '../models/delete-brand-response';
import { GetBrandByIdRequest } from '../models/get-brand-by-id-request';
import { GetBrandByIdResponse } from '../models/get-brand-by-id-response';

@Injectable()
export class BrandsMockService {
  private readonly apiControllerUrl = `${environment.API_URL}/brands`;

  constructor(private httpClient: HttpClient) {}

  getById(request: GetBrandByIdRequest): Observable<GetBrandByIdResponse> {
    return this.httpClient.get<GetBrandByIdResponse>(
      `${this.apiControllerUrl}/${request.id}`
    );
  }

  getList(request: GetBrandListRequest): Observable<GetBrandListResponse> {
    const subject = new Subject<GetBrandListResponse>();

    const params: any = {
      _page: request.pageIndex + 1,
      _limit: request.pageSize,
    };
    if (request.searchByName) params['name_like'] = request.searchByName;

    this.httpClient
      .get<BrandListItemDto[]>(this.apiControllerUrl, {
        params, // params: params ile aynı görevi görür, JS içerisindeki kısa yazım şeklidir.
      }) // Observable çalışması için bir subcriber'ı olması gerekiyor.
      .subscribe({
        next: (response) => {
          const responseModel: GetBrandListResponse = {
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

  add(request: AddBrandRequest): Observable<AddBrandResponse> {
    return this.httpClient.post<AddBrandResponse>(
      this.apiControllerUrl,
      request
    );
  }

  update(request: UpdateBrandRequest): Observable<UpdateBrandResponse> {
    return this.httpClient.put<UpdateBrandResponse>(
      `${this.apiControllerUrl}/${request.id}`,
      request
    );
  }

  delete(request: DeleteBrandRequest): Observable<DeleteBrandResponse> {
    return this.httpClient.delete<DeleteBrandResponse>(
      `${this.apiControllerUrl}/${request.id}`
    );
  }
}
