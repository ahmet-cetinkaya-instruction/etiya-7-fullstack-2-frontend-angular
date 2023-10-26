import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CarsMockService } from '../../services/cars-mock.service';
import { CarListItemDto } from '../../models/car-list-item-dto';
import { GetCarsListRequest } from '../../models/get-cars-list-request';
import { PageResponse } from 'src/app/core/models/page-response';

@Component({
  selector: 'app-car-card-list',
  templateUrl: './car-card-list.component.html',
  styleUrls: ['./car-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarCardListComponent implements OnInit, OnChanges {
  carsList!: PageResponse<CarListItemDto>;
  @Input() selectedBrandId: number | null = null;

  get pageNumbers(): number[] {
    const pageCount = Math.ceil(
      this.carsList.totalCount / this.carsList.pageSize
    );
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  constructor(
    private carsService: CarsMockService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['selectedBrandId']?.previousValue !==
      changes['selectedBrandId']?.currentValue
    )
      this.getList({
        pageIndex: 0,
        pageSize: 8,
        filterByBrandId: this.selectedBrandId ?? undefined,
      });
  }

  ngOnInit(): void {
    if (!this.selectedBrandId) this.getList({ pageIndex: 0, pageSize: 8 });
  }

  getList(request: GetCarsListRequest): void {
    this.carsService.getList(request).subscribe({
      next: (response) => {
        this.carsList = response;

        this.changeDetector.detectChanges(); // State'ler üzerindeki değişiklikleri Angular'ın algılaması için uyarmış oluyoruz.
      },
    });
  }

  onPreviousPageButtonClicked(): void {
    if (!this.carsList.hasPreviousPage) return;

    this.getList({
      pageIndex: this.carsList.pageIndex - 1,
      pageSize: this.carsList.pageSize,
    });
  }

  onNextPageButtonClicked(): void {
    if (!this.carsList.hasNextPage) return;

    this.getList({
      pageIndex: this.carsList.pageIndex + 1,
      pageSize: this.carsList.pageSize,
    });
  }

  onPageButtonClicked(pageIndex: number): void {
    if (pageIndex === this.carsList.pageIndex) return;

    this.getList({
      pageIndex: pageIndex,
      pageSize: this.carsList.pageSize,
    });
  }
}
