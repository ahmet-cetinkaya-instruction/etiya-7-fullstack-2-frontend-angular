import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CarsMockService } from '../../services/cars-mock.service';
import { CarListItemDto } from '../../models/car-list-item-dto';

@Component({
  selector: 'app-car-card-list',
  templateUrl: './car-card-list.component.html',
  styleUrls: ['./car-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarCardListComponent implements OnInit {
  cars!: CarListItemDto[];

  constructor(
    private carsService: CarsMockService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.carsService.getList({pageIndex: 0, pageSize: 9}).subscribe({
      next: (response) => {
        this.cars = response.items;

        this.changeDetector.detectChanges(); // State'ler üzerindeki değişiklikleri Angular'ın algılaması için uyarmış oluyoruz.
      },
    });
  }
}
