import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarCardListComponent } from './components/car-card-list/car-card-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CarsMockService } from './services/cars-mock.service';
import { BrandListGroupComponent } from './components/brand-list-group/brand-list-group.component';
import { BrandsMockService } from './services/brands-mock.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandManagementTableComponent } from './components/brand-management-table/brand-management-table.component';
import { RouterModule } from '@angular/router';
import { BrandManagementFormComponent } from './components/brand-management-form/brand-management-form.component';

@NgModule({
  declarations: [CarCardListComponent, BrandListGroupComponent, BrandManagementTableComponent, BrandManagementFormComponent],
  exports: [CarCardListComponent, BrandListGroupComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule, ReactiveFormsModule],
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
