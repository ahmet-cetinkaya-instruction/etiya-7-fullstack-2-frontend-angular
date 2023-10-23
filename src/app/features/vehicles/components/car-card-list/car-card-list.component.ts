import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CarsService } from '../../services/cars.service';
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
    private carsService: CarsService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.carsService.getList().subscribe({
      next: (cars) => {
        this.cars = cars;

        this.changeDetector.detectChanges(); // State'ler üzerindeki değişiklikleri Angular'ın algılaması için uyarmış oluyoruz.
      },
    });
  }
}
