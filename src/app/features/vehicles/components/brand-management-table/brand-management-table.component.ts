import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BrandsMockService } from '../../services/brands-mock.service';
import { GetBrandListRequest } from '../../models/get-brand-list-request';
import { PageResponse } from 'src/app/core/models/page-response';
import { BrandListItemDto } from '../../models/brand-list-item-dto';

@Component({
  selector: 'app-brand-management-table',
  templateUrl: './brand-management-table.component.html',
  styleUrls: ['./brand-management-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandManagementTableComponent implements OnInit {
  brandsList!: PageResponse<BrandListItemDto>;

  constructor(private brandsService: BrandsMockService) {}

  ngOnInit(): void {
    this.getList({ pageIndex: 0, pageSize: 10 });
  }

  getList(request: GetBrandListRequest): void {
    this.brandsService.getList(request).subscribe({
      next: (response) => {
        this.brandsList = response;
      },
    });
  }
}
