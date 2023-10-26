import { Component } from '@angular/core';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  selectedBrandId: number | null = null;

  onSelectedBrand(brandId: number | null): void {
    this.selectedBrandId = brandId;
  }
}
