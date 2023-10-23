import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MainLayoutComponent, NavbarComponent, FooterComponent],
  exports: [MainLayoutComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
