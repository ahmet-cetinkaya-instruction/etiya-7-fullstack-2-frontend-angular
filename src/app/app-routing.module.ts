import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ManagmentPageComponent as ManagementPageComponent } from './pages/management-page/management-page.component';
import { BrandManagementTableComponent as BrandManagementTableComponent } from './features/vehicles/components/brand-management-table/brand-management-table.component';
import { BrandManagementFormComponent } from './features/vehicles/components/brand-management-form/brand-management-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'management',
    component: ManagementPageComponent,
    children: [
      {
        path: 'brands',
        component: BrandManagementTableComponent,
      },
      {
        path: 'brands/add',
        component: BrandManagementFormComponent
      },
      {
        path: 'brands/edit/:brandId', // Route parametresini ":" ile belirtiyoruz.
        component: BrandManagementFormComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
