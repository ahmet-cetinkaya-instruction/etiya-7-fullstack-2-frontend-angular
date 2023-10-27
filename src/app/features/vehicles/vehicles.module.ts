import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarCardListComponent } from './components/car-card-list/car-card-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CarsMockService } from './services/cars-mock.service';
import { BrandListGroupComponent } from './components/brand-list-group/brand-list-group.component';
import { BrandsMockService } from './services/brands-mock.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CarCardListComponent, BrandListGroupComponent],
  exports: [CarCardListComponent, BrandListGroupComponent],
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [
    {
      provide: CarsMockService,
      useClass: CarsMockService,
    },
    {
      provide: BrandsMockService,
      useClass: BrandsMockService,
    },
  ],
})
export class VehiclesModule {}
