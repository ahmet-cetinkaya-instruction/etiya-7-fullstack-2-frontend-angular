import { PageResponse } from 'src/app/core/models/page-response';
import { GetBrandListRequest } from '../../models/get-brand-list-request';
import { BrandsMockService } from './../../services/brands-mock.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter, Input, OnInit,
  Output
} from '@angular/core';
import { BrandListItemDto } from '../../models/brand-list-item-dto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-brand-list-group',
  templateUrl: './brand-list-group.component.html',
  styleUrls: ['./brand-list-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandListGroupComponent implements OnInit {
  brandsList!: PageResponse<BrandListItemDto>;
  @Input() selectedBrandId: number | null = null;
  @Output() selectBrandId = new EventEmitter<number | null>(); // EventEmitter, bir event yaratmamızı sağlayan Obserable bir sınıftır.

  constructor(
    private brandsMockService: BrandsMockService,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getList({ pageIndex: 0, pageSize: 3 });
  }

  getList(request: GetBrandListRequest): void {
    const brands = [...(this.brandsList?.items ?? [])]; // Buradaki item değerlerini yeni bir array referansıyla saklıyoruz.
    // [this.brandsList.items[0], this.brandsList.items[1], this.brandsList.items[2] ...];

    this.brandsMockService.getList(request).subscribe({
      next: (response) => {
        response.items = [...brands, ...response.items];
        this.brandsList = response;

        this.changeDetector.detectChanges(); // Geliştirici state değiştirdiğinde değişiklikleri algılaması için kullanıyoruz.
      },
    });
  }

  onBrandClick(brandId: number | null): void {
    // HTML tarafında bir event yaratılmasında, yani kullanıcı olay yarattığında, changeDetector state değişiklikleri algılıyor.
    this.selectedBrandId = brandId;
    // this.changeDetector.detectChanges(); // Bu satırı yazmamıza gerek yok.

    this.selectBrandId.emit(brandId); // Event'i tetikliyoruz.
  }

  onViewMoreButtonClicked(): void {
    if (!this.brandsList.hasNextPage) return;

    this.getList({
      pageIndex: this.brandsList.pageIndex + 1,
      pageSize: this.brandsList.pageSize,
    });
  }
}
