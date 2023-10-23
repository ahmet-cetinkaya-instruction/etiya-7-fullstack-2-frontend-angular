import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarCardListComponent } from './components/car-card-list/car-card-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CarCardListComponent],
  exports: [CarCardListComponent],
  imports: [CommonModule, HttpClientModule],
})
export class VehiclesModule {}
