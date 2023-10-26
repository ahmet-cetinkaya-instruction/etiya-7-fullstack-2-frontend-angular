import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  selectedBrandId: number | null = null;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getSelectedBrandIdFromRoute();
  }

  getSelectedBrandIdFromRoute() {
    this.activatedRoute.queryParams
      .pipe(take(1))
      // Observable'nın mevcut davranışını, her query parametresi değiştiğinde bize haber vermesini, çeşitli pipe'larla değiştirebiliriz.
      // Örneğin take pipe'ı ile, verdiğim değer kere haber vermesini sağlayabiliriz.
      .subscribe((params) => {
        if (params['brandId']) this.selectedBrandId = Number(params['brandId']);
      });
  }

  onSelectedBrand(brandId: number | null): void {
    this.selectedBrandId = brandId;

    this.router.navigate([], {
      queryParams: { brandId: this.selectedBrandId },
      queryParamsHandling: 'merge',
    });
  }
}
